import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PollRepository {
    private readonly poll: PrismaClient["poll"];

    constructor(private readonly prismaService: PrismaService) {
        this.poll = prismaService.poll;
    }

    getCount() {
        return this.poll.count();
    }

    getPositiveCodePollCount(from?: Date, to?: Date) {
        return this.poll.count({
            where: {
                statusCode: {
                    gte: 200,
                    lte: 299,
                },
                createdAt: {
                    gte: from,
                    lte: to,
                },
            },
        });
    }

    getTotalPollCount(from?: Date, to?: Date) {
        return this.poll.count({
            where: {
                createdAt: {
                    gte: from,
                    lte: to,
                },
            },
        });
    }

    async getDailyPositiveStatusPercent() {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const yesterdayStart = new Date(todayStart);
        yesterdayStart.setDate(todayStart.getDate() - 1);

        const todayEnd = new Date(todayStart);
        todayEnd.setDate(todayStart.getDate() + 1);

        const yesterdayEnd = new Date(todayEnd);
        yesterdayEnd.setDate(todayEnd.getDate() - 1);

        const [
            totalPollsToday,
            positivePollsToday,
            totalPollsYesterday,
            positivePollsYesterday,
        ] = await this.prismaService.$transaction([
            this.getTotalPollCount(todayStart, todayEnd),
            this.getPositiveCodePollCount(todayStart, todayEnd),
            this.getTotalPollCount(yesterdayStart, yesterdayEnd),
            this.getPositiveCodePollCount(yesterdayStart, yesterdayEnd),
        ]);

        const percentPositiveToday =
            totalPollsToday > 0
                ? (positivePollsToday / totalPollsToday) * 100
                : 0;

        const percentPositiveYesterday =
            totalPollsYesterday > 0
                ? (positivePollsYesterday / totalPollsYesterday) * 100
                : 0;

        return percentPositiveToday - percentPositiveYesterday;
    }
}
