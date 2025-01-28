import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDataSourceTableTaskDto } from "src/layers/data-source-table-task/dto/create-data-source-table-task.dto";
import { UpdateDataSourceTableTaskDto } from "src/layers/data-source-table-task/dto/update-data-source-table-task.dto";
import { PrismaClient } from "@prisma/client";
import { UsersService } from "src/layers/users/users.service";

@Injectable()
export class DataSourceTableTaskRepository {
    dataSourceTableTask: PrismaClient["dataSourceTableParsingTask"];

    constructor(
        prismaService: PrismaService,
        private readonly userService: UsersService,
    ) {
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

    async get(userId: number, id: number) {
        const filters = await this.getUserIdFilter(userId);

        return this.dataSourceTableTask.findUnique({
            where: {
                id,
                addedSites: { some: { ...filters } },
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

    async getAll(userId: number) {
        const filters = await this.getUserIdFilter(userId);

        return this.dataSourceTableTask.findMany({
            where: {
                addedSites: { some: { ...filters } },
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

    async getNumberOfTasksToday(userId: number) {
        const filters = await this.getUserIdFilter(userId);

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
                    ...filters,
                },
            },
        });
    }

    async getLastTask(userId: number) {
        const filters = await this.getUserIdFilter(userId);

        return await this.dataSourceTableTask.findFirst({
            orderBy: {
                startTime: "desc",
            },
            where: {
                dataSourceTable: {
                    ...filters,
                },
            },
        });
    }

    async getUserIdFilter(userId: number) {
        const isAdmin = await this.userService.isAdmin(userId);

        return !isAdmin
            ? {
                  users: {
                      some: {
                          id: userId,
                      },
                  },
              }
            : {};
    }

    async deleteOlderThan(daysAgo = 7) {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - daysAgo);

        return this.dataSourceTableTask.deleteMany({
            where: {
                startTime: {
                    lt: pastDate,
                },
            },
        });
    }
}
