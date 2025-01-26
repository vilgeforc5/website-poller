import { BadRequestException, Injectable } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { PollerWorker } from "src/workers/poller/poller-worker/poller.worker";
import { PollingTaskService } from "src/layers/polling-task/polling-task.service";
import { TriggerManualPollDto } from "src/workers/poller/dto/trigger-manual.dto";
import { EnumRequestMethod } from "@prisma/client";
import { ConfigService } from "src/layers/config/config.service";

@Injectable()
export class PollerService {
    constructor(
        private readonly logger: PinoLogger,
        private readonly pollingTaskService: PollingTaskService,
        private readonly worker: PollerWorker,
        private readonly config: ConfigService,
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
            requestMethod: dto?.method,
        });

        const config = await this.config.get();

        this.startTask(
            userId,
            task.id,
            config?.requestMethod,
            config?.parallelSitesCount,
            config?.retryCount,
        );

        return { id: task.id };
    }

    async startTask(
        userId: number,
        pollingTaskId: number,
        requestMethod: EnumRequestMethod = "HEAD",
        parallelProcessCount = 10,
        retryCount = 5,
    ) {
        try {
            const result = await this.worker.work({
                userId,
                pollingTaskId,
                requestMethod,
                parallelProcessCount,
                retryCount,
            });

            if (!result.ok) {
                await this.pollingTaskService.update(pollingTaskId, {
                    error: result.message || "Ошибка при парсинге",
                });
            }

            this.logger.info("startPoll: ended");
        } catch (error) {
            this.logger.error(error);
        } finally {
            await this.pollingTaskService.update(pollingTaskId, {
                pollingState: "IDLE",
                endTime: new Date().toISOString(),
            });
        }
    }
}
