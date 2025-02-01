import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateScheduledJobDto } from "./dto/create-scheduled-job.dto";
import { UpdateScheduledJobDto } from "src/layers/scheduled-jobs/dto/update-scheduled-job.dto";
import { DeleteScheduledJobDto } from "src/layers/scheduled-jobs/dto/delete-scheduled-job.dto";

@Injectable()
export class ScheduledJobsRepository {
    private readonly scheduledJobs: PrismaClient["scheduleJob"];

    constructor(prismaService: PrismaService) {
        this.scheduledJobs = prismaService.scheduleJob;
    }

    getAll(userId: number) {
        return this.scheduledJobs.findMany({ where: { userId } });
    }

    create(userId: number, dto: CreateScheduledJobDto) {
        return this.scheduledJobs.create({
            data: { userId, ...dto },
        });
    }

    delete(userId: number, dto: DeleteScheduledJobDto) {
        return this.scheduledJobs.delete({ where: { userId, id: dto.jobId } });
    }

    update(userId: number, dto: UpdateScheduledJobDto) {
        return this.scheduledJobs.update({
            where: { userId, id: dto.jobId },
            data: {
                cronStr: dto.cronStr,
                status: dto.status,
            },
        });
    }
}
