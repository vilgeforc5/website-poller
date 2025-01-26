import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClient } from "@prisma/client";
import { UsersService } from "src/layers/users/users.service";

@Injectable()
export class PollRepository {
    private readonly poll: PrismaClient["poll"];

    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UsersService,
    ) {
        this.poll = prismaService.poll;
    }

    async getCount(userId: number) {
        const filters = await this.siteForUserFilter(userId);

        return this.poll.count({
            where: {
                ...filters,
            },
        });
    }

    async getPositiveCodePollCount(userId: number, from?: Date, to?: Date) {
        const filters = await this.siteForUserFilter(userId);

        return this.poll.count({
            where: {
                ...filters,
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

    async getTodayInfo(userId: number) {
        const filters = await this.siteForUserFilter(userId);

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        return this.poll.findMany({
            where: {
                ...filters,
                createdAt: {
                    gte: todayStart,
                },
                pollingTask: {
                    pollingState: "IDLE",
                },
            },
            select: {
                statusCode: true,
                pollingTask: {
                    select: {
                        startTime: true,
                    },
                },
            },
        });
    }

    async getTotalPollCount(userId: number, from?: Date, to?: Date) {
        const filters = await this.siteForUserFilter(userId);

        return this.poll.count({
            where: {
                ...filters,
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
        ] = await Promise.all([
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

    private async siteForUserFilter(userId: number) {
        const isAdmin = await this.userService.isAdmin(userId);

        return !isAdmin
            ? {
                  site: {
                      users: {
                          some: {
                              id: userId,
                          },
                      },
                  },
              }
            : {};
    }
}
