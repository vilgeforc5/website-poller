import { Controller, Get } from "@nestjs/common";
import { PollService } from "src/layers/poll/poll.service";

@Controller("poll")
export class PollController {
    constructor(private readonly pollService: PollService) {}

    @Get("latest-info")
    getLatestInfo() {
        return this.pollService.getLatestInfo();
    }
}
