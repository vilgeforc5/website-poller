import { Module } from "@nestjs/common";
import { PollerService } from "./poller.service";
import { SiteModule } from "src/layers/site/site.module";
import { PollModule } from "src/layers/poll/poll.module";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { PollerController } from "src/poller/poller.controller";
import { PollingTaskModule } from "src/layers/polling-task/polling-task.module";

interface PollerModuleConfig {
    siteProcessCount: number;
    retryCount: number;
}

@Module({
    imports: [
        ConfigModule.forFeature(
            (): PollerModuleConfig => ({
                siteProcessCount: 10,
                retryCount: 5,
            }),
        ),
        SiteModule,
        PollModule,
        PollingTaskModule,
        HttpModule.register({}),
    ],
    providers: [PollerService],
    controllers: [PollerController],
})
export class PollerModule {}
