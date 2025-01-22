import { Body, Controller, Get, Post } from "@nestjs/common";
import { DataSourceTableService } from "src/layers/data-source-table/data-source-table.service";
import { CreateDataSourceTableDto } from "src/layers/data-source-table/dto/create-data-source-table.dto";
import { GetCurrentUserId } from "src/common/decorators/GetCurrentUserId";

@Controller("data-source-table")
export class DataSourceTableController {
    constructor(
        private readonly dataSourceTableService: DataSourceTableService,
    ) {}

    @Post()
    create(@Body() createDataSourceTableDto: CreateDataSourceTableDto) {
        return this.dataSourceTableService.create(createDataSourceTableDto);
    }

    @Get()
    getAll(@GetCurrentUserId() userId: number) {
        return this.dataSourceTableService.getAll(userId);
    }
}
