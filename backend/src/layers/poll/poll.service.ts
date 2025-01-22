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

    createMany(dto: CreatePollDto[]) {
        this.logger.info("createBySiteId: ", dto);

        return this.pollRepository.createMany(dto);
    }

    async getLatestInfo() {
        const totalCount = await this.pollRepository.getTotalPollCount();
        const todayPositive =
            await this.pollRepository.getPositiveCodePollCount();

        return {
            todayPositivePercent:
                totalCount > 0 ? (todayPositive / totalCount) * 100 : 0,
            difference:
                await this.pollRepository.getDailyPositiveStatusPercent(),
        };
    }
}
