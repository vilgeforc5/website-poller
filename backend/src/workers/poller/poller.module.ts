import { Module } from "@nestjs/common";
import { PollerService } from "src/workers/poller/poller.service";
import { PollerController } from "src/workers/poller/poller.controller";
import { PollingTaskModule } from "src/layers/polling-task/polling-task.module";
import { PollerWorkerModule } from "src/workers/poller/poller-worker/poller-worker.module";
import { ConfigModule } from "src/layers/config/config.module";
import { TelegramModule } from "src/layers/telegram/telegram.module";
import { SiteModule } from "src/layers/site/site.module";

@Module({
    imports: [
        PollerWorkerModule,
        PollingTaskModule,
        ConfigModule,
        TelegramModule,
        SiteModule,
    ],
    providers: [PollerService],
    controllers: [PollerController],
    exports: [PollerService],
})
export class PollerModule {}
