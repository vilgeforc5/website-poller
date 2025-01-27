import { Controller, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { DataSourceTableParserService } from "src/workers/data-source-table-parser/data-source-table-parser.service";
import { GetCurrentUserId } from "src/common/decorators/GetCurrentUserId";

@Controller("data-source-table-parser")
export class DataSourceTableParserController {
    constructor(
        private readonly dataSourceTableParserService: DataSourceTableParserService,
    ) {}

    @Post("trigger/:dataTableId")
    @HttpCode(HttpStatus.OK)
    remove(
        @GetCurrentUserId() userId: number,
        @Param("dataTableId") tableId: string,
    ) {
        return this.dataSourceTableParserService.trigger(+userId, +tableId);
    }
}
