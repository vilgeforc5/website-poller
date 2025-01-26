import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDataSourceTableDto } from "src/layers/data-source-table/dto/create-data-source-table.dto";
import { PrismaClient } from "@prisma/client";
import { DeleteDataSourceTableDto } from "src/layers/data-source-table/dto/delete-data-source-table.dto";
import { UsersService } from "src/layers/users/users.service";

@Injectable()
export class DataSourceTableRepository {
    private readonly dataSourceTable: PrismaClient["dataSourceTable"];

    constructor(
        prismaService: PrismaService,
        private readonly usersService: UsersService,
    ) {
        this.dataSourceTable = prismaService.dataSourceTable;
    }

    create(
        userId: number,
        data: CreateDataSourceTableDto & { googleSpreadSheetId: string },
    ) {
        return this.dataSourceTable.upsert({
            where: {
                url: data.url,
            },
            create: { ...data, users: { connect: { id: userId } } },
            update: {
                users: {
                    connect: { id: userId },
                },
            },
        });
    }

    async getInfo(userId: number) {
        const filters = await this.getCommonUserIdFilter(userId);

        return this.dataSourceTable.findMany({
            where: {
                users: filters,
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
                        updateTrigger: true,
                    },
                    take: 10,
                },
            },
            orderBy: { createdAt: "desc" },
        });
    }

    async getById(userId: number, tableId: number) {
        const filters = await this.getCommonUserIdFilter(userId);

        return this.dataSourceTable.findFirst({
            where: { users: filters, id: tableId },
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

    private async getCommonUserIdFilter(id: number) {
        const isAdmin = await this.usersService.isAdmin(id);

        return !isAdmin ? { some: { id } } : {};
    }
}
