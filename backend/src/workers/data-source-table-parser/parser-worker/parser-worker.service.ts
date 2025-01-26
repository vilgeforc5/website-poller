import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { ChunkWorker } from "src/workers/chunk-worker/chunk-worker";
import { ConfigService } from "@nestjs/config";
import {
    GoogleSpreadsheet,
    GoogleSpreadsheetRow,
    GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { SiteService } from "src/layers/site/site.service";
import zod from "zod";

interface ParserWorkerServiceScope {
    limit?: number;
    spreadsheetId: string;
    userId: number;
    taskId: number;
}

@Injectable()
export class ParserWorkerService extends ChunkWorker<
    GoogleSpreadsheetRow<Record<string, any>>,
    any,
    ParserWorkerServiceScope
> {
    private readonly googleSpreadsheetKey: string;
    private sheet: GoogleSpreadsheetWorksheet;

    constructor(
        private readonly logger: PinoLogger,
        private readonly siteService: SiteService,
        config: ConfigService,
    ) {
        super();

        const spreadsheetKey = config.get("GOOGLE_SPREADSHEET_API_KEY");

        if (!spreadsheetKey) {
            throw new InternalServerErrorException();
        }

        this.googleSpreadsheetKey = spreadsheetKey;
        logger.setContext(ParserWorkerService.name);
    }

    override async onBeforeStart(scope: ParserWorkerServiceScope) {
        try {
            const spreadSheet = new GoogleSpreadsheet(scope.spreadsheetId, {
                apiKey: this.googleSpreadsheetKey,
            });

            await spreadSheet.loadInfo();
            const sheet = spreadSheet.sheetsByIndex[0];

            // check for consistency as first row seems to be google-api required.
            await sheet.getRows({ limit: 2, offset: 0 });
            this.sheet = sheet;

            return { ok: true, message: "Invalid spreadsheet provided" };
        } catch (error) {
            this.logger.error(error);

            return { ok: false, message: "" };
        }
    }

    async getChunk(
        processedCount: number,
        scope: ParserWorkerServiceScope,
    ): Promise<any[]> {
        try {
            return this.sheet.getRows({
                limit: scope.limit || 20,
                offset: processedCount,
            });
        } catch (error) {
            this.logger.error(error);

            return [];
        }
    }

    async processChunk(
        data: GoogleSpreadsheetRow<Record<string, any>>[],
        scope: ParserWorkerServiceScope,
    ) {
        const scheme = zod.string().url();
        const addedUsers = await Promise.all(
            data.map((data) => {
                // warning - table specific format

                const url = data.get("1");
                const result = scheme.safeParse(url);

                if (result.success) {
                    return this.siteService.upsert(scope.userId, [
                        {
                            dataSourceTableParsingTaskId: scope.taskId,
                            address: url,
                        },
                    ]);
                }

                return Promise.resolve(undefined);
            }),
        );

        return addedUsers.filter((user) => !!user);
    }
}
