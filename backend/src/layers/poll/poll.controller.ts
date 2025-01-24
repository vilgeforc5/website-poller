import { Controller, Get } from "@nestjs/common";
import { PollService } from "src/layers/poll/poll.service";
import { GetCurrentUserId } from "src/common/decorators/GetCurrentUserId";

@Controller("poll")
export class PollController {
    constructor(private readonly pollService: PollService) {}

    @Get("latest-info")
    getLatestInfo(@GetCurrentUserId() userId: number) {
        return this.pollService.getLatestInfo(userId);
    }
}
