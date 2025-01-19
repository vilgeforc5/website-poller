import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { SiteModule } from "./layers/site/site.module";
import { PollModule } from "./layers/poll/poll.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/layers/auth/auth.module";
import { AtGuard } from "src/common/guards/at.guard";
import { APP_GUARD } from "@nestjs/core";
import { PollerModule } from "./poller/poller.module";
import { ScheduleModule } from "@nestjs/schedule";
import { StateModule } from "src/layers/state/state.module";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({ isGlobal: true }),
        LoggerModule.forRoot(),
        SiteModule,
        PollModule,
        AuthModule,
        PollerModule,
        StateModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AtGuard,
        },
    ],
})
export class AppModule {}
