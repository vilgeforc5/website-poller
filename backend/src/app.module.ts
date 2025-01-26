import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { SiteModule } from "./layers/site/site.module";
import { PollModule } from "./layers/poll/poll.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/auth/auth.module";
import { AtGuard } from "src/common/guards/at.guard";
import { APP_GUARD } from "@nestjs/core";
import { PollerModule } from "./workers/poller/poller.module";
import { PollingTaskModule } from "./layers/polling-task/polling-task.module";
import { DataSourceTableModule } from "./layers/data-source-table/data-source-table.module";
import { DataSourceTableParserModule } from "./workers/data-source-table-parser/data-source-table-parser.module";
import { DataSourceTableTaskModule } from "./layers/data-source-table-task/data-source-table-task.module";
import { ConfigModule as AppConfigModule } from "./layers/config/config.module";
import { SchedulerModule } from "src/workers/cron/scheduler.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        LoggerModule.forRoot(),
        SiteModule,
        PollModule,
        AuthModule,
        PollerModule,
        PollingTaskModule,
        DataSourceTableModule,
        DataSourceTableParserModule,
        DataSourceTableTaskModule,
        AppConfigModule,
        SchedulerModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AtGuard,
        },
    ],
})
export class AppModule {}
