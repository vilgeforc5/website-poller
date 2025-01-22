import {
    Controller,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    UseGuards,
} from "@nestjs/common";
import { Roles } from "src/common/decorators/Roles";
import { DataSourceTableParserService } from "src/workers/data-source-table-parser/data-source-table-parser.service";
import { RoleGuard } from "src/common/guards/role.guard";
import { GetCurrentUserId } from "src/common/decorators/GetCurrentUserId";

@Controller("data-source-table-parser")
export class DataSourceTableParserController {
    constructor(
        private readonly dataSourceTableParserService: DataSourceTableParserService,
    ) {}

    @Post("/trigger")
    @Roles(["ADMIN", "OWNER"])
    @UseGuards(RoleGuard)
    @HttpCode(HttpStatus.OK)
    remove(
        @GetCurrentUserId() userId: number,
        @Param("dataTable") tableId: string,
    ) {
        return this.dataSourceTableParserService.triggerManualParse(
            +userId,
            +tableId,
        );
    }
}
