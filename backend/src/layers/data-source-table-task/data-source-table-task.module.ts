import { Module } from "@nestjs/common";
import { DataSourceTableTaskService } from "src/layers/data-source-table-task/data-source-table-task.service";
import { DataSourceTableTaskController } from "src/layers/data-source-table-task/data-source-table-task.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { DataSourceTableTaskRepository } from "src/layers/data-source-table-task/data-source-table-task.repository";

@Module({
    controllers: [DataSourceTableTaskController],
    providers: [
        DataSourceTableTaskService,
        PrismaService,
        DataSourceTableTaskRepository,
    ],
    exports: [DataSourceTableTaskService],
})
export class DataSourceTableTaskModule {}
