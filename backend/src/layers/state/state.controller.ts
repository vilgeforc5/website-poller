import {
    Controller,
    HttpCode,
    HttpStatus,
    Injectable,
    Post,
    UseGuards,
} from "@nestjs/common";
import { StateService } from "src/layers/state/state.service";
import { UpdatePollMethodDto } from "src/layers/state/dto/update-poll-method.dto";
import { Roles } from "src/common/decorators/Roles";
import { RoleGuard } from "src/common/guards/role.guard";

@Injectable()
@Controller("state")
export class StateController {
    constructor(private readonly stateService: StateService) {}

    @Roles(["OWNER"])
    @UseGuards(RoleGuard)
    @HttpCode(HttpStatus.OK)
    @Post("/update-poll-method")
    updatePollMethod(dto: UpdatePollMethodDto) {
        return this.stateService.updateRequestMethod(dto);
    }
}
