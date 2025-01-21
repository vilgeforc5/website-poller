import { Module } from "@nestjs/common";
import { PollingTaskService } from "src/layers/polling-task/polling-task.service";
import { PrismaService } from "src/prisma/prisma.service";
import { PollingTaskRepository } from "src/layers/polling-task/polling-task.repository";

@Module({
    providers: [PollingTaskService, PollingTaskRepository, PrismaService],
    exports: [PollingTaskService],
})
export class PollingTaskModule {}
