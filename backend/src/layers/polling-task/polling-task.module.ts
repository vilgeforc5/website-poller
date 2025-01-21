import { Module } from "@nestjs/common";
import { PollingTaskService } from "src/layers/polling-task/polling-task.service";
import { PrismaService } from "src/prisma/prisma.service";
import { PollingTaskRepository } from "src/layers/polling-task/polling-task.repository";
import { PollingTaskController } from "src/layers/polling-task/polling-task.controller";

@Module({
    controllers: [PollingTaskController],
    providers: [PollingTaskService, PollingTaskRepository, PrismaService],
    exports: [PollingTaskService],
})
export class PollingTaskModule {}
