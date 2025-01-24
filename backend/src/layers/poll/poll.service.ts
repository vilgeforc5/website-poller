import { Injectable } from "@nestjs/common";
import { PollRepository } from "src/layers/poll/poll.repository";
import { PinoLogger } from "nestjs-pino";
import { IPollLatestInfo } from "src/layers/poll/poll.types";

@Injectable()
export class PollService {
    constructor(
        private readonly pollRepository: PollRepository,
        private readonly logger: PinoLogger,
    ) {
        this.logger.setContext(PollService.name);
    }

    async getLatestInfo(userId: number): Promise<IPollLatestInfo> {
        const totalCount = await this.pollRepository.getCount(userId);
        const todayPositive =
            await this.pollRepository.getPositiveCodePollCount(userId);

        return {
            positiveCodePercent:
                totalCount > 0 ? (todayPositive / totalCount) * 100 : 0,
            diffFromYesterday:
                await this.pollRepository.getDailyPositiveStatusPercent(userId),
        };
    }
}
