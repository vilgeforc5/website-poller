import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";
import { UsersService } from "src/layers/users/users.service";
import { PollerService } from "src/workers/poller/poller.service";
import { PinoLogger } from "nestjs-pino";
import { DataSourceTableParserService } from "src/workers/data-source-table-parser/data-source-table-parser.service";

@Injectable()
export class SchedulerService implements OnApplicationBootstrap {
    constructor(
        private readonly scheduleRegistry: SchedulerRegistry,
        private readonly userService: UsersService,
        private readonly pollerService: PollerService,
        private readonly parserService: DataSourceTableParserService,
        private readonly logger: PinoLogger,
    ) {
        this.logger.setContext(SchedulerService.name);
    }

    onApplicationBootstrap() {
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

        this.scheduleRegistry.addCronJob("polling", pollingJob);
        this.scheduleRegistry.addCronJob("parsing", parsingJob);

        pollingJob.start();
        parsingJob.start();
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
}
