import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";
import { UsersService } from "src/layers/users/users.service";
import { PollerService } from "src/workers/poller/poller.service";
import { PinoLogger } from "nestjs-pino";
import { DataSourceTableParserService } from "src/workers/data-source-table-parser/data-source-table-parser.service";
import { PollingTaskService } from "src/layers/polling-task/polling-task.service";
import { TelegramService } from "src/layers/telegram/telegram.service";
import { DataSourceTableTaskService } from "src/layers/data-source-table-task/data-source-table-task.service";
import { SiteService } from "src/layers/site/site.service";
import { entries, groupBy } from "lodash";

@Injectable()
export class SchedulerService implements OnApplicationBootstrap {
    constructor(
        private readonly scheduleRegistry: SchedulerRegistry,
        private readonly userService: UsersService,
        private readonly pollerService: PollerService,
        private readonly parserService: DataSourceTableParserService,
        private readonly logger: PinoLogger,
        private readonly pollingTaskService: PollingTaskService,
        private readonly telegramService: TelegramService,
        private readonly sourceTableParse: DataSourceTableTaskService,
        private readonly siteService: SiteService,
    ) {
        this.logger.setContext(SchedulerService.name);
    }

    async onApplicationBootstrap() {
        this.registerJobs();
    }

    registerJobs() {
        const pollingJob = new CronJob(
            "0 */4 * * *",
            this.pollingJob.bind(this),
        );

        const parsingJob = new CronJob(
            "0 */4 * * *",
            this.parsingJob.bind(this),
        );

        const todayInfoJob = new CronJob(
            "0 18 * * *",
            this.todayInfoJob.bind(this),
        );

        const clearJob = new CronJob("0 0 * * 0", this.clearOldJob.bind(this));

        this.scheduleRegistry.addCronJob("polling", pollingJob);
        this.scheduleRegistry.addCronJob("parsing", parsingJob);
        this.scheduleRegistry.addCronJob("deletingOld", clearJob);
        this.scheduleRegistry.addCronJob("todayInfoJob", todayInfoJob);

        pollingJob.start();
        parsingJob.start();
        todayInfoJob.start();
        clearJob.start();
    }

    private async pollingJob() {
        this.logger.info("start pollingJob");

        const privilegedUserId = await this.userService.getPrivilegedUserId();
        this.pollerService.trigger(privilegedUserId, "SCHEDULE");
    }

    private async parsingJob() {
        this.logger.info("start parsingJob");

        const privilegedUserId = await this.userService.getPrivilegedUserId();
        this.parserService.parseAll(privilegedUserId);
    }

    private async todayInfoJob() {
        const users = await this.telegramService.getAllUsers();
        for (const user of users) {
            const fails = await this.siteService.getAllFailedToday(user.userId);

            if (fails.length === 0) {
                await this.telegramService.sendToUser(
                    user.userId,
                    "Не было ошибок сайтов.",
                );

                return;
            }

            const groupedFails = groupBy(
                fails,
                (fail) => fail.polls.at(0)?.statusCode,
            );

            let message = "Ошибки за сегодня: \n";

            for (const [code, sites] of entries(groupedFails)) {
                message += `\nОшибки ${code}:\n`;

                for (const site of sites) {
                    message += `${site.address}\n`;
                }
            }
            // for (const entry of fails) {
            //     message += entry.address + "\n";
            //
            //     for (const poll of entry.polls) {
            //         message += `${poll.createdAt.toLocaleTimeString()} | ${poll.statusCode}\n`;
            //     }
            //
            //     message += "\n";
            // }

            const chunkSize = 4000;
            for (let i = 0; i < message.length; i += chunkSize) {
                const chunk = message.slice(i, i + chunkSize);

                await this.telegramService.sendToUser(user.userId, chunk);
            }
        }
    }

    private async clearOldJob() {
        const oldPolls = await this.pollingTaskService.deleteOld();
        const oldTableParse = await this.sourceTableParse.deleteOld();

        await this.telegramService.broadcast(
            `Удалил старые записи для опросов сайтов (${oldPolls.count} штук)\nУдалил старые записи для парсинга таблиц (${oldTableParse.count} штук)`,
            ["OWNER", "ADMIN"],
        );
    }
}
