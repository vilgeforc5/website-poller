import { Injectable } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { PollerWorker } from "src/workers/poller/poller-worker/poller.worker";
import { PollingTaskService } from "src/layers/polling-task/polling-task.service";
import { EnumRequestMethod, UpdateTrigger } from "@prisma/client";
import { ConfigService } from "src/layers/config/config.service";
import { TelegramService } from "src/layers/telegram/telegram.service";

@Injectable()
export class PollerService {
    constructor(
        private readonly logger: PinoLogger,
        private readonly pollingTaskService: PollingTaskService,
        private readonly worker: PollerWorker,
        private readonly config: ConfigService,
        private readonly telegramService: TelegramService,
    ) {
        logger.setContext(PollerService.name);
    }

    async trigger(userId: number, updateTrigger: UpdateTrigger = "MANUAL") {
        this.logger.info("triggerPoll");

        const hasRunningTasks = await this.pollingTaskService.hasRunningTask();

        if (hasRunningTasks) {
            this.logger.error(
                "startPoll: Attempt to poll when already started",
            );

            return;
        }

        const config = await this.config.get();

        const task = await this.pollingTaskService.create({
            updateTrigger,
            requestMethod: config?.requestMethod,
        });

        this.startTask(
            userId,
            task.id,
            config?.requestMethod,
            config?.parallelSitesCount,
            config?.retryCount,
            config?.headers || {},
        );

        return { id: task.id };
    }

    async startTask(
        userId: number,
        pollingTaskId: number,
        requestMethod: EnumRequestMethod = "HEAD",
        parallelProcessCount = 10,
        retryCount = 5,
        headers = {},
    ) {
        try {
            const result = await this.worker.work({
                userId,
                pollingTaskId,
                requestMethod,
                parallelProcessCount,
                retryCount,
                headers,
            });

            if (!result.ok) {
                await this.pollingTaskService.update(pollingTaskId, {
                    error: result.message || "Ошибка при парсинге",
                });
            }

            this.logger.info("startPoll: ended");
        } catch (error) {
            this.logger.error(error);
            await this.telegramService.broadcast(
                `Случилась ошибка при polling'е сайтов:\n${error}`,
            );
        } finally {
            const endTime = new Date().toISOString();

            await this.pollingTaskService.update(pollingTaskId, {
                pollingState: "IDLE",
                endTime,
            });

            // const sites =
            //     await this.siteService.getAllForPollingTask(pollingTaskId);
            //
            // const resultInfoMessage = sites.reduce<string>((acc, site) => {
            //     const latestPoll = site.polls.at(0);
            //
            //     if (
            //         !latestPoll ||
            //         (latestPoll.statusCode >= 200 &&
            //             latestPoll.statusCode < 300)
            //     ) {
            //         return acc;
            //     }
            //
            //     const message = `${site.address}: \nКод ${latestPoll.statusCode} | Попыток ${latestPoll.retryCount}`;
            //
            //     return acc + "\n" + message;
            // }, "");
            //
            // await this.telegramService.broadcast(
            //     `Опрос в ${new Date().toISOString()}\nВсего: ${sites.length} cайтов\nОшибки:\n${resultInfoMessage || "Нет ошибок."}`,
            // );
        }
    }
}
