import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePollingTaskDto } from "src/layers/polling-task/dto/create-polling-task.dto";
import { UpdatePollingTaskDto } from "src/layers/polling-task/dto/update-polling-task.dto";

@Injectable()
export class PollingTaskRepository {
    constructor(private readonly prismaService: PrismaService) {}

    create(dto: CreatePollingTaskDto) {
        return this.prismaService.pollingTask.create({ data: dto });
    }

    update(id: number, dto: UpdatePollingTaskDto) {
        return this.prismaService.pollingTask.update({
            where: { id },
            data: dto,
        });
    }

    get(id: number) {
        return this.prismaService.pollingTask.findUnique({ where: { id } });
    }

    getAllRunningTasks() {
        return this.prismaService.pollingTask.findMany({
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

        return this.prismaService.pollingTask.count({
            where: {
                pollingState: "IDLE",
                endTime: {
                    gte: todayStart,
                    lte: todayEnd,
                },
            },
        });
    }

    async getLastPollingTaskTime(): Promise<Date | undefined> {
        const lastTask = await this.prismaService.pollingTask.findFirst({
            where: { pollingState: "IDLE" },
            orderBy: {
                startTime: "desc",
            },
            select: {
                endTime: true,
            },
        });

        return lastTask?.endTime;
    }
}
