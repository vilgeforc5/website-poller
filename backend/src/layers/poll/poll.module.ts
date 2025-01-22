import { Module } from "@nestjs/common";
import { PollService } from "src/layers/poll/poll.service";
import { PollRepository } from "src/layers/poll/poll.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { PollController } from "src/layers/poll/poll.controller";

@Module({
    providers: [PollService, PollService, PollRepository, PrismaService],
    exports: [PollService],
    controllers: [PollController],
})
export class PollModule {}
