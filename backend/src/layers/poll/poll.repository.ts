import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePollDto } from "src/layers/poll/dto/create-poll.dto";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PollRepository {
    private readonly poll: PrismaClient["poll"];

    constructor(private readonly prismaService: PrismaService) {
        this.poll = prismaService.poll;
    }

    createMany(data: CreatePollDto[]) {
        return this.poll.createMany({
            data,
        });
    }

    getCount() {
        return this.poll.count();
    }

    getPositiveCodePollCount() {
        return this.poll.count({
            where: {
                statusCode: {
                    gte: 200,
                    lte: 299,
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
            this.poll.count({
                where: {
                    createdAt: {
                        gte: todayStart,
                        lt: todayEnd,
                    },
                },
            }),
            this.poll.count({
                where: {
                    createdAt: {
                        gte: todayStart,
                        lt: todayEnd,
                    },
                    statusCode: {
                        gte: 200,
                        lte: 299,
                    },
                },
            }),
            this.poll.count({
                where: {
                    createdAt: {
                        gte: yesterdayStart,
                        lt: yesterdayEnd,
                    },
                },
            }),
            this.poll.count({
                where: {
                    createdAt: {
                        gte: yesterdayStart,
                        lt: yesterdayEnd,
                    },
                    statusCode: {
                        gte: 200,
                        lt: 299,
                    },
                },
            }),
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
