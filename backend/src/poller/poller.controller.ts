import {
    Controller,
    HttpCode,
    HttpStatus,
    Injectable,
    Post,
} from "@nestjs/common";
import { PollerService } from "src/poller/poller.service";

@Injectable()
@Controller("poller")
export class PollerController {
    constructor(private readonly pollerService: PollerService) {}

    // @Roles(["OWNER"])
    // @UseGuards(RoleGuard)
    @Post("/trigger-poll")
    @HttpCode(HttpStatus.OK)
    triggerPoll() {
        return this.pollerService.triggerPoll();
    }
}
