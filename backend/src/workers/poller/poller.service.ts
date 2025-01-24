import { BadRequestException, Injectable } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { PollerWorker } from "src/workers/poller/poller-worker/poller.worker";
import { PollingTaskService } from "src/layers/polling-task/polling-task.service";
import { TriggerManualPollDto } from "src/workers/poller/dto/trigger-manual.dto";
import { EnumRequestMethod } from "@prisma/client";

@Injectable()
export class PollerService {
    constructor(
        private readonly logger: PinoLogger,
        private readonly pollingTaskService: PollingTaskService,
        private readonly worker: PollerWorker,
    ) {
        logger.setContext(PollerService.name);
    }

    async triggerManual(userId: number, dto?: TriggerManualPollDto) {
        this.logger.info("triggerPoll");

        const hasRunningTasks = await this.pollingTaskService.hasRunningTask();

        if (hasRunningTasks) {
            this.logger.error(
                "startPoll: Attempt to poll when already started",
            );

            throw new BadRequestException();
        }

        const task = await this.pollingTaskService.create({
            updateTrigger: "MANUAL",
        });

        this.startTask(userId, task.id, dto?.method, dto?.parallelProcessCount);

        return { id: task.id };
    }

    async startTask(
        userId: number,
        pollingTaskId: number,
        requestMethod: EnumRequestMethod = "HEAD",
        parallelProcessCount = 10,
    ) {
        try {
            const result = await this.worker.work({
                userId,
                pollingTaskId,
                requestMethod,
                parallelProcessCount,
            });

            await this.pollingTaskService.update(pollingTaskId, {
                pollingState: "IDLE",
                endTime: new Date().toISOString(),
            });

            if (!result.ok) {
                throw new Error(result.message);
            }

            this.logger.info("startPoll: ended");
        } catch (error) {
            this.logger.error(error);
        }
    }
}
