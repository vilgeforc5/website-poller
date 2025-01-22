import { Injectable } from "@nestjs/common";
import { DataSourceTableService } from "src/layers/data-source-table/data-source-table.service";
import { PinoLogger } from "nestjs-pino";

@Injectable()
export class DataSourceTableParserService {
    constructor(
        private readonly dataSourceTableService: DataSourceTableService,
        private readonly logger: PinoLogger,
    ) {
        this.logger.setContext(DataSourceTableParserService.name);
    }

    async triggerManualParse(userId: number, tableId: number) {
        const table = await this.dataSourceTableService.get(userId, tableId);

        console.log(table);
    }
}
