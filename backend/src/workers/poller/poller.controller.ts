import {
    Controller,
    HttpCode,
    HttpStatus,
    Injectable,
    Post,
    Query,
} from "@nestjs/common";
import { PollerService } from "src/workers/poller/poller.service";
import { GetCurrentUserId } from "src/common/decorators/GetCurrentUserId";
import { TriggerManualPollDto } from "src/workers/poller/dto/trigger-manual.dto";

@Injectable()
@Controller("poller")
export class PollerController {
    constructor(private readonly pollerService: PollerService) {}

    @Post("trigger")
    @HttpCode(HttpStatus.OK)
    trigger(
        @GetCurrentUserId() id: number,
        @Query() query?: TriggerManualPollDto,
    ) {
        return this.pollerService.triggerManual(id, query);
    }
}
