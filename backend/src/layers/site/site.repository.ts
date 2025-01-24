import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSiteDto } from "src/layers/site/dto/create-site.dto";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class SiteRepository {
    private readonly site: PrismaClient["site"];

    constructor(prismaService: PrismaService) {
        this.site = prismaService.site;
    }

    getPaginated(userId: number, skip = 0, take = 10) {
        return this.site.findMany({
            skip,
            take,
            where: this.idFilter(userId),
        });
    }

    create(
        userId: number,
        { dataSourceTableParsingTaskId, ...other }: CreateSiteDto,
    ) {
        return this.site.upsert({
            where: { address: other.address },
            create: {
                ...other,
                users: { connect: { id: userId } },
                dataSourceTableParse: {
                    connect: { id: dataSourceTableParsingTaskId },
                },
            },
            update: {},
        });
    }

    upsert(
        userId: number,
        { dataSourceTableParsingTaskId, ...other }: CreateSiteDto,
    ) {
        return this.site.upsert({
            where: { address: other.address },
            create: {
                ...other,
                users: { connect: { id: userId } },
                dataSourceTableParse: {
                    connect: { id: dataSourceTableParsingTaskId },
                },
            },
            update: {},
        });
    }

    count(userId: number) {
        return this.site.count({
            where: this.idFilter(userId),
        });
    }

    getLatestRecord(userId: number) {
        return this.site.findFirst({
            orderBy: { createdAt: "desc" },
            where: this.idFilter(userId),
        });
    }

    getCountDifference(userId: number, daysBefore = 1) {
        const currentDate = new Date();
        const pastDate = new Date();
        pastDate.setDate(currentDate.getDate() - daysBefore);

        return this.site.count({
            where: {
                ...this.idFilter(userId),
                createdAt: {
                    gte: pastDate,
                    lte: currentDate,
                },
            },
        });
    }

    private idFilter(userId: number) {
        return { users: { some: { id: userId } } };
    }
}
