import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDataSourceTableTaskDto } from "src/layers/data-source-table-task/dto/create-data-source-table-task.dto";
import { UpdateDataSourceTableTaskDto } from "src/layers/data-source-table-task/dto/update-data-source-table-task.dto";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class DataSourceTableTaskRepository {
    dataSourceTableTask: PrismaClient["dataSourceTableParsingTask"];

    constructor(prismaService: PrismaService) {
        this.dataSourceTableTask = prismaService.dataSourceTableParsingTask;
    }

    create({ dataSourceTableId, ...other }: CreateDataSourceTableTaskDto) {
        return this.dataSourceTableTask.create({
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
        return this.dataSourceTableTask.update({
            where: { id },
            data: data,
        });
    }

    get(userId: number, id: number) {
        return this.dataSourceTableTask.findUnique({
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
        return this.dataSourceTableTask.findMany({
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

    getNumberOfTasksToday(userId: number) {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        return this.dataSourceTableTask.count({
            where: {
                endTime: {
                    gte: todayStart,
                    lte: todayEnd,
                },
                dataSourceTable: {
                    users: {
                        some: {
                            id: userId,
                        },
                    },
                },
            },
        });
    }

    async getLastTaskTime(userId: number): Promise<Date | undefined> {
        const lastTask = await this.dataSourceTableTask.findFirst({
            orderBy: {
                startTime: "desc",
            },
            select: {
                endTime: true,
            },
            where: {
                dataSourceTable: {
                    users: {
                        some: {
                            id: userId,
                        },
                    },
                },
            },
        });

        return lastTask.endTime;
    }
}
