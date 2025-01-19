import { Module } from "@nestjs/common";
import { PollService } from "src/layers/poll/poll.service";
import { PollController } from "src/layers/poll/poll.controller";
import { PollRepository } from "src/layers/poll/poll.repository";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [PollController],
    providers: [PollService, PollService, PollRepository, PrismaService],
    exports: [PollService],
})
export class PollModule {}
