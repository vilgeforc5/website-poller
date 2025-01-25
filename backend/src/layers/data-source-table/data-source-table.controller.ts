import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { DataSourceTableService } from "src/layers/data-source-table/data-source-table.service";
import { CreateDataSourceTableDto } from "src/layers/data-source-table/dto/create-data-source-table.dto";
import { GetCurrentUserId } from "src/common/decorators/GetCurrentUserId";
import { DeleteDataSourceTableDto } from "src/layers/data-source-table/dto/delete-data-source-table.dto";

@Controller("data-source-table")
export class DataSourceTableController {
    constructor(
        private readonly dataSourceTableService: DataSourceTableService,
    ) {}

    @Post("createMany")
    createMany(
        @GetCurrentUserId() id: number,
        @Body() createDataSourceTableDto: CreateDataSourceTableDto[],
    ) {
        return this.dataSourceTableService.createMany(
            id,
            createDataSourceTableDto,
        );
    }

    @Get("info")
    getInfo(@GetCurrentUserId() userId: number) {
        return this.dataSourceTableService.getInfo(userId);
    }

    @Delete()
    delete(
        @Body() deleteDto: DeleteDataSourceTableDto,
        @GetCurrentUserId() userId: number,
    ) {
        return this.dataSourceTableService.delete(userId, deleteDto);
    }
}
