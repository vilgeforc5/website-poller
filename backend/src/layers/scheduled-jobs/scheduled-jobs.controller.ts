import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { ScheduledJobsService } from "src/layers/scheduled-jobs/scheduled-jobs.service";
import { GetCurrentUserId } from "src/common/decorators/GetCurrentUserId";
import { CreateScheduledJobDto } from "src/layers/scheduled-jobs/dto/create-scheduled-job.dto";
import { DeleteScheduledJobDto } from "src/layers/scheduled-jobs/dto/delete-scheduled-job.dto";
import { UpdateScheduledJobDto } from "src/layers/scheduled-jobs/dto/update-scheduled-job.dto";

export const scheduledJobsPath = {
    base: "scheduled-jobs",
    getAll: {
        method: "GET",
        path: "",
    },
    create: {
        method: "POST",
        path: "",
    },
    delete: {
        method: "DELETE",
        path: "",
    },
    update: {
        method: "PUT",
        path: "",
    },
};

@Controller(scheduledJobsPath.base)
export class ScheduledJobsController {
    constructor(private readonly scheduledJobsService: ScheduledJobsService) {}

    @Get(scheduledJobsPath.getAll.path)
    findAll(@GetCurrentUserId() userId: number) {
        return this.scheduledJobsService.findAll(userId);
    }

    @Post(scheduledJobsPath.create.path)
    create(@GetCurrentUserId() userId: number, body: CreateScheduledJobDto) {
        return this.scheduledJobsService.create(userId, body);
    }

    @Delete(scheduledJobsPath.delete.path)
    delete(@GetCurrentUserId() userId: number, body: DeleteScheduledJobDto) {
        return this.scheduledJobsService.delete(userId, body);
    }

    @Put(scheduledJobsPath.update.path)
    update(@GetCurrentUserId() userId: number, body: UpdateScheduledJobDto) {
        return this.scheduledJobsService.update(userId, body);
    }
}
