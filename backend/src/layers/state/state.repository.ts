import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { EnumRequestMethod } from "@prisma/client";

@Injectable()
export class StateRepository {
    private singletonStateId = "SINGLETON_STATE_KEY";

    constructor(private readonly prismaService: PrismaService) {}

    async getState() {
        return this.prismaService.operationState.findUnique({
            where: { id: this.singletonStateId },
        });
    }

    async updatePollingState(isPolling: boolean) {
        return this.prismaService.operationState.update({
            where: { id: this.singletonStateId },
            data: { pollingState: isPolling ? "POLLING" : "IDLE" },
        });
    }

    async updateLastPollTime() {
        return this.prismaService.operationState.update({
            where: { id: this.singletonStateId },
            data: { lastPollTime: new Date() },
        });
    }

    async updateRequestMethod(requestMethod: EnumRequestMethod) {
        return this.prismaService.operationState.update({
            where: { id: this.singletonStateId },
            data: { requestMethod },
        });
    }
}
