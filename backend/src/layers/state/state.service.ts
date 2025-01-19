import { Injectable } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { StateRepository } from "src/layers/state/state.repository";
import { UpdatePollMethodDto } from "src/layers/state/dto/update-poll-method.dto";

@Injectable()
export class StateService {
    constructor(
        private readonly logger: PinoLogger,
        private readonly stateRepository: StateRepository,
    ) {
        logger.setContext(StateService.name);
    }

    getState() {
        this.logger.trace("getPollingState");

        return this.stateRepository.getState();
    }

    updatePollingState(isPolling: boolean) {
        this.logger.info("updatePollingState", { isPolling });

        return this.stateRepository.updatePollingState(isPolling);
    }

    updateLastPollTime() {
        this.logger.info("updateLastPollTime");

        return this.stateRepository.updateLastPollTime();
    }

    updateRequestMethod(dto: UpdatePollMethodDto) {
        this.logger.info("updateRequestMethod");

        return this.stateRepository.updateRequestMethod(dto.newMethod);
    }
}
