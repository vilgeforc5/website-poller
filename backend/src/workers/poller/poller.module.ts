import { Module } from "@nestjs/common";
import { PollerService } from "src/workers/poller/poller.service";
import { PollerController } from "src/workers/poller/poller.controller";
import { PollingTaskModule } from "src/layers/polling-task/polling-task.module";
import { PollerWorkerModule } from "src/workers/poller/poller-worker/poller-worker.module";

@Module({
    imports: [PollerWorkerModule, PollingTaskModule],
    providers: [PollerService],
    controllers: [PollerController],
})
export class PollerModule {}
