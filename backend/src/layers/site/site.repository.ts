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

    create(userId: number, { dataSourceTableId, ...other }: CreateSiteDto) {
        return this.prismaService.site.create({
            data: {
                ...other,
                users: { connect: { id: userId } },
                dataSourceTable: { connect: { id: dataSourceTableId } },
            },
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

    private idFilter(userId: number) {
        return { users: { some: { id: userId } } };
    }
}
