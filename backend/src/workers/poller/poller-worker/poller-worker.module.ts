import { Module } from "@nestjs/common";
import { PollerWorker } from "src/workers/poller/poller-worker/poller.worker";
import { SiteModule } from "src/layers/site/site.module";
import { PollingTaskModule } from "src/layers/polling-task/polling-task.module";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [SiteModule, PollingTaskModule, HttpModule.register({})],
    providers: [PollerWorker],
    exports: [PollerWorker],
})
export class PollerWorkerModule {}
