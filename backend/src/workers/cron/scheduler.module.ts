import { Module } from "@nestjs/common";
import { SchedulerService } from "src/workers/cron/scheduler.service";
import { ScheduleModule } from "@nestjs/schedule";
import { UsersModule } from "src/layers/users/users.module";
import { PollerModule } from "src/workers/poller/poller.module";
import { DataSourceTableParserModule } from "src/workers/data-source-table-parser/data-source-table-parser.module";
import { TelegramModule } from "src/layers/telegram/telegram.module";
import { PollingTaskModule } from "src/layers/polling-task/polling-task.module";
import { DataSourceTableTaskModule } from "src/layers/data-source-table-task/data-source-table-task.module";
import { SiteModule } from "src/layers/site/site.module";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        UsersModule,
        PollerModule,
        DataSourceTableParserModule,
        TelegramModule,
        PollingTaskModule,
        DataSourceTableTaskModule,
        SiteModule,
    ],
    providers: [SchedulerService],
})
export class SchedulerModule {}
