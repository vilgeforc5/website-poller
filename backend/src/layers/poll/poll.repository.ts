import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePollDto } from "src/layers/poll/dto/create-poll.dto";

@Injectable()
export class PollRepository {
    constructor(private readonly prismaService: PrismaService) {}

    createMany(data: CreatePollDto[]) {
        return this.prismaService.poll.createMany({
            data,
        });
    }
}
