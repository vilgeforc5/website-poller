import { Module } from "@nestjs/common";
import { DataSourceTableParserService } from "src/workers/data-source-table-parser/data-source-table-parser.service";
import { DataSourceTableParserController } from "src/workers/data-source-table-parser/data-source-table-parser.controller";
import { DataSourceTableModule } from "src/layers/data-source-table/data-source-table.module";
import { ParserWorkerModule } from "src/workers/data-source-table-parser/parser-worker/parser-worker.module";
import { DataSourceTableTaskModule } from "src/layers/data-source-table-task/data-source-table-task.module";

@Module({
    imports: [
        DataSourceTableModule,
        ParserWorkerModule,
        DataSourceTableTaskModule,
    ],
    controllers: [DataSourceTableParserController],
    providers: [DataSourceTableParserService],
    exports: [DataSourceTableParserService],
})
export class DataSourceTableParserModule {}
