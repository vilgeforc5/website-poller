import { BadRequestException, Injectable } from "@nestjs/common";
import { DataSourceTableService } from "src/layers/data-source-table/data-source-table.service";
import { PinoLogger } from "nestjs-pino";
import { ParserWorkerService } from "src/workers/data-source-table-parser/parser-worker/parser-worker.service";
import { DataSourceTableTaskService } from "src/layers/data-source-table-task/data-source-table-task.service";

@Injectable()
export class DataSourceTableParserService {
    constructor(
        private readonly dataSourceTableService: DataSourceTableService,
        private readonly dataSourceTableTaskService: DataSourceTableTaskService,
        private readonly logger: PinoLogger,
        private readonly parserWorkerService: ParserWorkerService,
    ) {
        this.logger.setContext(DataSourceTableParserService.name);
    }

    async triggerManualParse(userId: number, tableId: number) {
        const table = await this.dataSourceTableService.get(userId, tableId);

        if (!table || !table.id) {
            throw new BadRequestException();
        }

        const task = await this.dataSourceTableTaskService.create({
            dataSourceTableId: table.id,
            updateTrigger: "MANUAL",
        });

        this.startTask({
            taskId: task.id,
            userId,
            spreadsheetId: table.googleSpreadSheetId,
        });

        return { id: task.id };
    }

    async startTask({
        taskId,
        userId,
        spreadsheetId,
    }: {
        taskId: number;
        userId: number;
        spreadsheetId: string;
    }) {
        try {
            const result = await this.parserWorkerService.work({
                limit: 20,
                spreadsheetId,
                userId,
                taskId,
            });

            await this.dataSourceTableTaskService.update(taskId, {
                endTime: new Date().toISOString(),
            });

            if (!result.ok) {
                throw new Error(result.message);
            }
        } catch (e) {
            this.logger.error(e);
        }
    }
}
