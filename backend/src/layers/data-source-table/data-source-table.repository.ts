import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDataSourceTableDto } from "src/layers/data-source-table/dto/create-data-source-table.dto";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class DataSourceTableRepository {
    private readonly dataSourceTable: PrismaClient["dataSourceTable"];

    constructor(prismaService: PrismaService) {
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
            include: {
                users: {
                    select: {
                        email: true,
                        role: true,
                    },
                },
                parsingTasks: {
                    orderBy: { startTime: "desc" },
                    select: {
                        startTime: true,
                        addedSites: {
                            select: {
                                address: true,
                            },
                        },
                    },
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

    private getCommonUserIdFilter(id: number) {
        return { some: { id } };
    }
}
