import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePollDto } from "src/layers/poll/dto/create-poll.dto";

@Injectable()
export class PollRepository {
    constructor(private readonly prismaService: PrismaService) {}

    /**
     *
     * @param siteId - id or url of site
     */
    findBySiteId(siteId: string) {
        return this.prismaService.poll.findMany({ where: { siteId } });
    }

    createBySiteId(data: CreatePollDto) {
        return this.prismaService.poll.create({
            data,
        });
    }

    createManyBySiteId(data: CreatePollDto[]) {
        return this.prismaService.poll.createMany({ data });
    }
}
