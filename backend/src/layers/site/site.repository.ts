import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSiteDto } from "src/layers/site/dto/create-site.dto";

@Injectable()
export class SiteRepository {
    constructor(private readonly prismaService: PrismaService) {}

    getAll(userId: number) {
        return this.prismaService.site.findMany({
            where: this.idFilter(userId),
        });
    }

    getPaginated(userId: number, skip = 0, take = 10) {
        return this.prismaService.site.findMany({
            skip,
            take,
            where: this.idFilter(userId),
        });
    }

    create(
        userId: number,
        { dataSourceTableParsingTaskId, ...other }: CreateSiteDto,
    ) {
        return this.prismaService.site.upsert({
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
        return this.prismaService.site.upsert({
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
        return this.prismaService.site.count({
            where: { users: { some: { id: userId } } },
        });
    }

    getLatestRecord(userId: number) {
        return this.prismaService.site.findFirst({
            orderBy: { createdAt: "desc" },
            where: this.idFilter(userId),
        });
    }

    getCountDifference(daysBefore = 1) {
        const currentDate = new Date();
        const pastDate = new Date();
        pastDate.setDate(currentDate.getDate() - daysBefore);

        console.log(currentDate.toISOString());

        return this.prismaService.site.count({
            where: {
                createdAt: {
                    gte: pastDate,
                    lte: currentDate,
                },
            },
        });
    }

    getByAddress(address: string) {
        return this.prismaService.site.findUnique({ where: { address } });
    }

    private idFilter(userId: number) {
        return { users: { some: { id: userId } } };
    }
}
