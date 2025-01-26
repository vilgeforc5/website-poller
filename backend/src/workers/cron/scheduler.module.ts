import { Module } from "@nestjs/common";
import { SchedulerService } from "src/workers/cron/scheduler.service";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
    imports: [ScheduleModule.forRoot()],
    providers: [SchedulerService],
})
export class SchedulerModule {}
