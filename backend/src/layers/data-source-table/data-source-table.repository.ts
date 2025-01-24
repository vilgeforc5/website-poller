import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDataSourceTableDto } from "src/layers/data-source-table/dto/create-data-source-table.dto";
import { UpdateDataSourceTableDto } from "src/layers/data-source-table/dto/update-data-source-table.dto";

@Injectable()
export class DataSourceTableRepository {
    constructor(private readonly prismaService: PrismaService) {}

    create(
        userId: number,
        data: CreateDataSourceTableDto & { googleSpreadSheetId: string },
    ) {
        return this.prismaService.dataSourceTable.create({
            data: { ...data, users: { connect: { id: userId } } },
        });
    }

    update({ id, ...data }: UpdateDataSourceTableDto) {
        return this.prismaService.dataSourceTable.update({
            where: { id },
            data,
        });
    }

    getAll(userId: number) {
        return this.prismaService.dataSourceTable.findMany({
            where: {
                users: this.getCommonUserIdFilter(userId),
            },
        });
    }

    getInfo(userId: number) {
        return this.prismaService.dataSourceTable.findMany({
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
        return this.prismaService.dataSourceTable.findFirst({
            where: { users: this.getCommonUserIdFilter(userId), id: tableId },
        });
    }

    private getCommonUserIdFilter(id: number) {
        return { some: { id } };
    }
}
