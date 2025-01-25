import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDataSourceTableDto } from "src/layers/data-source-table/dto/create-data-source-table.dto";
import { PrismaClient } from "@prisma/client";
import { DeleteDataSourceTableDto } from "src/layers/data-source-table/dto/delete-data-source-table.dto";

@Injectable()
export class DataSourceTableRepository {
    private readonly dataSourceTable: PrismaClient["dataSourceTable"];

    constructor(private readonly prismaService: PrismaService) {
        this.dataSourceTable = prismaService.dataSourceTable;
    }

    create(
        userId: number,
        data: CreateDataSourceTableDto & { googleSpreadSheetId: string },
    ) {
        return this.dataSourceTable.create({
            data: { ...data, users: { connect: { id: userId } } },
        });
    }

    getInfo(userId: number) {
        return this.dataSourceTable.findMany({
            where: {
                users: this.getCommonUserIdFilter(userId),
            },
            select: {
                id: true,
                url: true,
                createdAt: true,
                users: {
                    select: {
                        email: true,
                    },
                },
                parsingTasks: {
                    orderBy: { startTime: "desc" },
                    select: {
                        startTime: true,
                        workingState: true,
                        error: true,
                        addedSites: {
                            select: {
                                address: true,
                            },
                        },
                        id: true,
                    },
                    take: 10,
                },
            },
            orderBy: { createdAt: "desc" },
        });
    }

    getById(userId: number, tableId: number) {
        return this.dataSourceTable.findFirst({
            where: { users: this.getCommonUserIdFilter(userId), id: tableId },
        });
    }

    delete(userId: number, deleteDto: DeleteDataSourceTableDto) {
        return this.dataSourceTable.delete({
            where: {
                id: deleteDto.tableId,
                users: {
                    every: {
                        id: {
                            in: [userId],
                        },
                    },
                },
            },
        });
    }

    private getCommonUserIdFilter(id: number) {
        return { some: { id } };
    }
}
