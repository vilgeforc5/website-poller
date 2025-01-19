import {
    Controller,
    HttpCode,
    HttpStatus,
    Injectable,
    Post,
    UseGuards,
} from "@nestjs/common";
import { PollerService } from "src/poller/poller.service";
import { Roles } from "src/common/decorators/Roles";
import { RoleGuard } from "src/common/guards/role.guard";

@Injectable()
@Controller("poller")
export class PollerController {
    constructor(private readonly pollerService: PollerService) {}

    @Roles(["OWNER"])
    @UseGuards(RoleGuard)
    @Post("/trigger-poll")
    @HttpCode(HttpStatus.OK)
    triggerPoll() {
        return this.pollerService.startPoll();
    }
}
