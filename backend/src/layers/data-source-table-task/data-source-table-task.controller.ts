import { Controller, Get, Post, Body, Patch, Param } from "@nestjs/common";
import { GetCurrentUserId } from "src/common/decorators/GetCurrentUserId";
import { DataSourceTableTaskService } from "src/layers/data-source-table-task/data-source-table-task.service";
import { CreateDataSourceTableTaskDto } from "src/layers/data-source-table-task/dto/create-data-source-table-task.dto";
import { UpdateDataSourceTableTaskDto } from "src/layers/data-source-table-task/dto/update-data-source-table-task.dto";

@Controller("data-source-table-task")
export class DataSourceTableTaskController {
    constructor(
        private readonly dataSourceTableTaskService: DataSourceTableTaskService,
    ) {}

    @Post()
    create(@Body() createDataSourceTableTaskDto: CreateDataSourceTableTaskDto) {
        return this.dataSourceTableTaskService.create(
            createDataSourceTableTaskDto,
        );
    }

    @Get()
    findAll(@GetCurrentUserId() id: number) {
        return this.dataSourceTableTaskService.getAll(id);
    }

    @Get(":id")
    findOne(@GetCurrentUserId() userId: number, @Param("id") id: string) {
        return this.dataSourceTableTaskService.get(userId, +id);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateDataSourceTableTaskDto: UpdateDataSourceTableTaskDto,
    ) {
        return this.dataSourceTableTaskService.update(
            +id,
            updateDataSourceTableTaskDto,
        );
    }
}
