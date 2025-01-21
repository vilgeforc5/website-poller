import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSiteDto } from "src/layers/site/dto/create-site.dto";

@Injectable()
export class SiteRepository {
    constructor(private readonly prismaService: PrismaService) {}

    getAll(userId: number) {
        return this.prismaService.site.findMany({
            where: { users: { some: { id: userId } } },
        });
    }

    getPaginated(userId: number, skip = 0, take = 10) {
        return this.prismaService.site.findMany({
            skip,
            take,
            where: { users: { some: { id: userId } } },
        });
    }

    create(userIds: number[], { address }: CreateSiteDto) {
        return this.prismaService.site.create({
            data: {
                address,
                users: { connect: userIds.map((id) => ({ id })) },
            },
        });
    }
}
