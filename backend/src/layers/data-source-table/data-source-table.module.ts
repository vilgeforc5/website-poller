import { Module } from "@nestjs/common";
import { DataSourceTableService } from "src/layers/data-source-table/data-source-table.service";
import { DataSourceTableController } from "src/layers/data-source-table/data-source-table.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { DataSourceTableRepository } from "src/layers/data-source-table/data-source-table.repository";
import { UsersModule } from "src/layers/users/users.module";

@Module({
    controllers: [DataSourceTableController],
    providers: [
        DataSourceTableService,
        PrismaService,
        DataSourceTableRepository,
    ],
    exports: [DataSourceTableService],
    imports: [UsersModule],
})
export class DataSourceTableModule {}
