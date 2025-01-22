import { Module } from "@nestjs/common";
import { DataSourceTableParserService } from "src/workers/data-source-table-parser/data-source-table-parser.service";
import { DataSourceTableParserController } from "src/workers/data-source-table-parser/data-source-table-parser.controller";
import { DataSourceTableModule } from "src/layers/data-source-table/data-source-table.module";

@Module({
    imports: [DataSourceTableModule],
    controllers: [DataSourceTableParserController],
    providers: [DataSourceTableParserService],
})
export class DataSourceTableParserModule {}
