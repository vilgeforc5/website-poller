import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePollingTaskDto } from "src/layers/polling-task/dto/create-polling-task.dto";
import { UpdatePollingTaskDto } from "src/layers/polling-task/dto/update-polling-task.dto";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PollingTaskRepository {
    private readonly pollingTask: PrismaClient["pollingTask"];

    constructor(prismaService: PrismaService) {
        this.pollingTask = prismaService.pollingTask;
    }

    create(dto: CreatePollingTaskDto) {
        return this.pollingTask.create({ data: dto });
    }

    update(id: number, { polls, ...data }: UpdatePollingTaskDto) {
        return this.pollingTask.update({
            where: { id },
            data: {
                ...data,
                polls: {
                    createMany: {
                        data: polls || [],
                    },
                },
            },
        });
    }

    getAllRunningTasks() {
        return this.pollingTask.findMany({
            where: {
                pollingState: "RUNNING",
            },
        });
    }

    getNumberOfTasksToday() {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        return this.pollingTask.count({
            where: {
                pollingState: "IDLE",
                endTime: {
                    gte: todayStart,
                    lte: todayEnd,
                },
            },
        });
    }

    async getLastPollingTask() {
        return await this.pollingTask.findFirst({
            where: { pollingState: "IDLE" },
            orderBy: {
                startTime: "desc",
            },
            select: {
                endTime: true,
            },
        });
    }

    async deleteOlderThan(daysAgo = 7) {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - daysAgo);

        return this.pollingTask.deleteMany({
            where: {
                startTime: {
                    lt: pastDate,
                },
            },
        });
    }
}
