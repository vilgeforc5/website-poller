import { Module } from "@nestjs/common";
import { ScheduledJobsService } from "src/layers/scheduled-jobs/scheduled-jobs.service";
import { ScheduledJobsController } from "src/layers/scheduled-jobs/scheduled-jobs.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { ScheduledJobsRepository } from "src/layers/scheduled-jobs/scheduled-jobs.repository";

@Module({
    controllers: [ScheduledJobsController],
    providers: [ScheduledJobsService, PrismaService, ScheduledJobsRepository],
    exports: [ScheduledJobsService],
})
export class ScheduledJobsModule {}
