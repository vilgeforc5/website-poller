import { Injectable } from "@nestjs/common";
import { PollRepository } from "src/layers/poll/poll.repository";
import { PinoLogger } from "nestjs-pino";
import { IPollLatestInfo, TPollCodeInfo } from "src/layers/poll/poll.types";
import { codesRange } from "src/common/utils/range";

const rangeCount = <T>(source: T[], target: T[]) =>
    source.filter((arr) => target.includes(arr)).length;

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

    async getTodayInfoCodes(userId: number): Promise<TPollCodeInfo> {
        const data = await this.pollRepository.getTodayInfo(userId);

        const groupedData: { [date: string]: number[] } = {};

        data.forEach((item) => {
            const dateKey = item.pollingTask.startTime.toLocaleTimeString();

            if (!groupedData[dateKey]) {
                groupedData[dateKey] = [];
            }
            groupedData[dateKey].push(item.statusCode);
        });

        return Object.entries(groupedData).reduce<TPollCodeInfo>(
            (acc, [date, codes]) => {
                return [
                    ...acc,
                    {
                        date,
                        200: rangeCount(codes, codesRange["200"]),
                        300: rangeCount(codes, codesRange["300"]),
                        400: rangeCount(codes, codesRange["400"]),
                        500: rangeCount(codes, codesRange["500"]),
                    },
                ];
            },
            [],
        );
    }
}
