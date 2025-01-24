import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PollRepository {
    private readonly poll: PrismaClient["poll"];

    constructor(private readonly prismaService: PrismaService) {
        this.poll = prismaService.poll;
    }

    getCount(userId: number) {
        return this.poll.count({
            where: {
                ...this.siteForUserFiler(userId),
            },
        });
    }

    getPositiveCodePollCount(userId: number, from?: Date, to?: Date) {
        return this.poll.count({
            where: {
                ...this.siteForUserFiler(userId),
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

    getTotalPollCount(userId: number, from?: Date, to?: Date) {
        return this.poll.count({
            where: {
                ...this.siteForUserFiler(userId),
                createdAt: {
                    gte: from,
                    lte: to,
                },
            },
        });
    }

    async getDailyPositiveStatusPercent(userId: number) {
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
            this.getTotalPollCount(userId, todayStart, todayEnd),
            this.getPositiveCodePollCount(userId, todayStart, todayEnd),
            this.getTotalPollCount(userId, yesterdayStart, yesterdayEnd),
            this.getPositiveCodePollCount(userId, yesterdayStart, yesterdayEnd),
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

    private siteForUserFiler(userId: number) {
        return {
            site: {
                users: {
                    some: {
                        id: userId,
                    },
                },
            },
        };
    }
}
