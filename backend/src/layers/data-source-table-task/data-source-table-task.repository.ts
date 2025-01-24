import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDataSourceTableTaskDto } from "src/layers/data-source-table-task/dto/create-data-source-table-task.dto";
import { UpdateDataSourceTableTaskDto } from "src/layers/data-source-table-task/dto/update-data-source-table-task.dto";

@Injectable()
export class DataSourceTableTaskRepository {
    constructor(private readonly prismaService: PrismaService) {}

    create({ dataSourceTableId, ...other }: CreateDataSourceTableTaskDto) {
        return this.prismaService.dataSourceTableParsingTask.create({
            data: {
                ...other,
                dataSourceTable: {
                    connect: {
                        id: dataSourceTableId,
                    },
                },
            },
        });
    }

    update(id: number, data: UpdateDataSourceTableTaskDto) {
        return this.prismaService.dataSourceTableParsingTask.update({
            where: { id },
            data: data,
        });
    }

    get(userId: number, id: number) {
        return this.prismaService.dataSourceTableParsingTask.findUnique({
            where: {
                id,
                addedSites: { some: { users: { some: { id: userId } } } },
            },
            include: {
                addedSites: {
                    select: {
                        address: true,
                    },
                },
            },
        });
    }

    getAll(userId: number) {
        return this.prismaService.dataSourceTableParsingTask.findMany({
            where: {
                addedSites: { some: { users: { some: { id: userId } } } },
            },
            include: {
                addedSites: {
                    select: {
                        address: true,
                    },
                },
            },
        });
    }
}
