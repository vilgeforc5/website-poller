import { Module } from "@nestjs/common";
import { StateService } from "src/layers/state/state.service";
import { PrismaService } from "src/prisma/prisma.service";
import { StateRepository } from "src/layers/state/state.repository";
import { StateController } from "src/layers/state/state.controller";

@Module({
    providers: [StateService, PrismaService, StateRepository],
    exports: [StateService],
    controllers: [StateController],
})
export class StateModule {}
