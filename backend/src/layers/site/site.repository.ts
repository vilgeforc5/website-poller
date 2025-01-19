import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSiteDto } from "src/layers/site/dto/create-site.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SiteRepository {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly configService: ConfigService,
    ) {}

    getAll(includePollData = true) {
        return this.prismaService.site.findMany({
            include: { pollData: includePollData },
            orderBy: {
                createdAt: this.configService.get("siteSort"),
            },
        });
    }

    getPaginated(skip = 0, take = 5, includePollData = true) {
        return this.prismaService.site.findMany({
            skip,
            take,
            include: { pollData: includePollData },
            orderBy: {
                createdAt: this.configService.get("siteSort"),
            },
        });
    }

    create({ address }: CreateSiteDto) {
        return this.prismaService.site.create({ data: { address } });
    }

    findOne(token: string, includePollData = true) {
        return this.prismaService.site.findFirst({
            where: { OR: [{ id: token }, { address: token }] },
            include: { pollData: includePollData },
        });
    }

    deleteOne(id: string) {
        return this.prismaService.site.delete({ where: { id } });
    }
}
