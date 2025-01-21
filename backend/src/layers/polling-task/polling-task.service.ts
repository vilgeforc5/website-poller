import { Injectable } from "@nestjs/common";
import { CreatePollingTaskDto } from "src/layers/polling-task/dto/create-polling-task.dto";
import { PollingTaskRepository } from "src/layers/polling-task/polling-task.repository";
import { UpdatePollingTaskDto } from "src/layers/polling-task/dto/update-polling-task.dto";
import { PinoLogger } from "nestjs-pino";

@Injectable()
export class PollingTaskService {
    constructor(
        private readonly pollingRepository: PollingTaskRepository,
        private readonly logger: PinoLogger,
    ) {
        logger.setContext(PollingTaskService.name);
    }

    create(createPollingTaskDto: CreatePollingTaskDto) {
        this.logger.info("create", createPollingTaskDto);

        return this.pollingRepository.create(createPollingTaskDto);
    }

    update(id: number, updatePollingTaskDto: UpdatePollingTaskDto) {
        this.logger.info("create", id, updatePollingTaskDto);

        return this.pollingRepository.update(id, updatePollingTaskDto);
    }

    get(id: number) {
        return this.pollingRepository.get(id);
    }

    async hasRunningTask() {
        const runningTasks = await this.pollingRepository.getAllRunningTasks();

        return runningTasks.length !== 0;
    }
}
