import { Module } from "@nestjs/common";
import { SchedulerService } from "src/workers/cron/scheduler.service";
import { ScheduleModule } from "@nestjs/schedule";
import { UsersModule } from "src/layers/users/users.module";
import { PollerModule } from "src/workers/poller/poller.module";
import { DataSourceTableParserModule } from "src/workers/data-source-table-parser/data-source-table-parser.module";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        UsersModule,
        PollerModule,
        DataSourceTableParserModule,
    ],
    providers: [SchedulerService],
})
export class SchedulerModule {}
