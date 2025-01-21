import {
    Controller,
    HttpCode,
    HttpStatus,
    Injectable,
    Post,
    UseGuards,
} from "@nestjs/common";
import { PollerService } from "src/poller/poller.service";
import { RoleGuard } from "src/common/guards/role.guard";
import { Roles } from "src/common/decorators/Roles";
import { GetCurrentUserId } from "src/common/decorators/GetCurrentUserId";

@Injectable()
@Controller("poller")
export class PollerController {
    constructor(private readonly pollerService: PollerService) {}

    @Post("/trigger")
    @Roles(["ADMIN", "OWNER"])
    @UseGuards(RoleGuard)
    @HttpCode(HttpStatus.OK)
    trigger(@GetCurrentUserId() id: number) {
        return this.pollerService.triggerPoll(id);
    }
}
