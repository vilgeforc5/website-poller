import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { SiteModule } from "./layers/site/site.module";
import { PollModule } from "./layers/poll/poll.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/auth/auth.module";
import { AtGuard } from "src/common/guards/at.guard";
import { APP_GUARD } from "@nestjs/core";
import { PollerModule } from "./poller/poller.module";
import { ScheduleModule } from "@nestjs/schedule";
import { PollingTaskModule } from "./layers/polling-task/polling-task.module";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({ isGlobal: true }),
        LoggerModule.forRoot(),
        SiteModule,
        PollModule,
        AuthModule,
        PollerModule,
        PollingTaskModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AtGuard,
        },
    ],
})
export class AppModule {}
