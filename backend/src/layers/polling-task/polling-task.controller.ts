import { Controller, Get } from "@nestjs/common";
import { PollingTaskService } from "src/layers/polling-task/polling-task.service";

@Controller("polling-task")
export class PollingTaskController {
    constructor(private readonly pollingTaskService: PollingTaskService) {}

    @Get("latest-info")
    getLatestInfo() {
        return this.pollingTaskService.getLatestInfo();
    }
}
