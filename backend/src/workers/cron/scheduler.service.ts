import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";

@Injectable()
export class SchedulerService implements OnApplicationBootstrap {
    constructor(private readonly scheduleRegistry: SchedulerRegistry) {}

    onApplicationBootstrap() {
        this.registerJobs();
    }

    registerJobs() {
        const pollingJob = new CronJob("2 * * * * *", () => {
            console.log("pollingjob");
        });

        const parsingJob = new CronJob("2 * * * * *", () => {
            console.log("parsing");
        });

        this.scheduleRegistry.addCronJob("polling", pollingJob);
        this.scheduleRegistry.addCronJob("parsing", parsingJob);

        pollingJob.start();
        parsingJob.start();
    }
}
