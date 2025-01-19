import { Injectable } from "@nestjs/common";
import { PollRepository } from "src/layers/poll/poll.repository";
import { CreatePollDto } from "src/layers/poll/dto/create-poll.dto";
import { PinoLogger } from "nestjs-pino";

@Injectable()
export class PollService {
    constructor(
        private readonly pollRepository: PollRepository,
        private readonly logger: PinoLogger,
    ) {
        this.logger.setContext(PollService.name);
    }

    findBySiteId(siteId: string) {
        return this.pollRepository.findBySiteId(siteId);
    }

    createBySiteId(dto: CreatePollDto) {
        this.logger.info("createBySiteId: ", dto);

        return this.pollRepository.createBySiteId(dto);
    }

    createManyBySiteId(dto: CreatePollDto[]) {
        this.logger.info("createBySiteId: ", dto);

        return this.pollRepository.createManyBySiteId(dto);
    }
}
