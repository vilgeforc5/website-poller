import { Module } from "@nestjs/common";
import { PollService } from "src/layers/poll/poll.service";
import { PollRepository } from "src/layers/poll/poll.repository";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    providers: [PollService, PollService, PollRepository, PrismaService],
    exports: [PollService],
})
export class PollModule {}
