import { Injectable } from "@nestjs/common";
import { CreateScheduledJobDto } from "src/layers/scheduled-jobs/dto/create-scheduled-job.dto";
import { ScheduledJobsRepository } from "src/layers/scheduled-jobs/scheduled-jobs.repository";
import { DeleteScheduledJobDto } from "src/layers/scheduled-jobs/dto/delete-scheduled-job.dto";
import { UpdateScheduledJobDto } from "src/layers/scheduled-jobs/dto/update-scheduled-job.dto";

@Injectable()
export class ScheduledJobsService {
    constructor(
        private readonly scheduledJobRepository: ScheduledJobsRepository,
    ) {}

    findAll(userId: number) {
        return this.scheduledJobRepository.getAll(userId);
    }

    create(userId: number, createScheduledJobDto: CreateScheduledJobDto) {
        return this.scheduledJobRepository.create(
            userId,
            createScheduledJobDto,
        );
    }

    delete(userId: number, deleteScheduledJobDto: DeleteScheduledJobDto) {
        return this.scheduledJobRepository.delete(
            userId,
            deleteScheduledJobDto,
        );
    }

    update(userId: number, updateScheduledJobDto: UpdateScheduledJobDto) {
        return this.scheduledJobRepository.update(
            userId,
            updateScheduledJobDto,
        );
    }
}
