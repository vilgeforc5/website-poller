import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Injectable,
    Post,
} from "@nestjs/common";
import { StateService } from "src/layers/state/state.service";
import { UpdatePollMethodDto } from "src/layers/state/dto/update-poll-method.dto";

@Injectable()
@Controller("state")
export class StateController {
    constructor(private readonly stateService: StateService) {}

    // @Roles(["OWNER"])
    // @UseGuards(RoleGuard)
    @HttpCode(HttpStatus.OK)
    @Post("update-poll-method")
    updatePollMethod(dto: UpdatePollMethodDto) {
        return this.stateService.updateRequestMethod(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Get("get-state")
    getState() {
        return this.stateService.getState();
    }
}
