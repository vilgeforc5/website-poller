import {
    Controller,
    HttpCode,
    HttpStatus,
    Injectable,
    Post,
} from "@nestjs/common";
import { PollerService } from "src/workers/poller/poller.service";
import { GetCurrentUserId } from "src/common/decorators/GetCurrentUserId";

@Injectable()
@Controller("poller")
export class PollerController {
    constructor(private readonly pollerService: PollerService) {}

    @Post("trigger")
    @HttpCode(HttpStatus.OK)
    trigger(@GetCurrentUserId() id: number) {
        return this.pollerService.trigger(id);
    }
}
