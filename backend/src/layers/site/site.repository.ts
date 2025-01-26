import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSiteDto } from "src/layers/site/dto/create-site.dto";
import { Prisma, PrismaClient } from "@prisma/client";
import { UsersService } from "src/layers/users/users.service";

@Injectable()
export class SiteRepository {
    private readonly site: PrismaClient["site"];

    constructor(
        prismaService: PrismaService,
        private readonly userService: UsersService,
    ) {
        this.site = prismaService.site;
    }

    async getPaginated(
        userId: number,
        skip = 0,
        take = 10,
        include: Prisma.SiteInclude = {},
        where: Prisma.SiteWhereInput = {},
    ) {
        const filter = await this.idFilter(userId);

        return this.site.findMany({
            skip,
            take,
            where: { ...where, ...filter },
            include,
            orderBy: { createdAt: "desc" },
        });
    }

    upsert(userId: number, dto: CreateSiteDto) {
        const { dataSourceTableParsingTaskId, ...other } = dto;

        return this.site.upsert({
            where: { address: other.address },
            create: {
                ...other,
                users: { connect: { id: userId } },
                dataSourceTableParse:
                    dataSourceTableParsingTaskId !== undefined
                        ? {
                              connect: { id: dataSourceTableParsingTaskId },
                          }
                        : {},
            },
            update: {
                users: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }

    async count(userId: number) {
        const filter = await this.idFilter(userId);

        return this.site.count({
            where: {
                ...filter,
            },
        });
    }

    async getLatestRecord(userId: number) {
        const filter = await this.idFilter(userId);

        return this.site.findFirst({
            orderBy: { createdAt: "desc" },
            where: filter,
        });
    }

    async getCountDifference(userId: number, daysBefore = 1) {
        const filter = await this.idFilter(userId);
        const currentDate = new Date();
        const pastDate = new Date();
        pastDate.setDate(currentDate.getDate() - daysBefore);

        return this.site.count({
            where: {
                ...filter,
                createdAt: {
                    gte: pastDate,
                    lte: currentDate,
                },
            },
        });
    }

    private async idFilter(userId: number) {
        const isAdmin = await this.userService.isAdmin(userId);

        return !isAdmin ? { users: { some: { id: userId } } } : {};
    }
}
