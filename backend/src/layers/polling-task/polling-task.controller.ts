import { Controller, Get, Param } from "@nestjs/common";
import { PollingTaskService } from "src/layers/polling-task/polling-task.service";

@Controller("polling-task")
export class PollingTaskController {
    constructor(private readonly pollingTaskService: PollingTaskService) {}
    @Get("/:id")
    getPollingTask(@Param("id") id: number) {
        return this.pollingTaskService.get(id);
    }
}
