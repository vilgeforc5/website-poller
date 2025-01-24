import { Injectable } from "@nestjs/common";
import { CreateDataSourceTableTaskDto } from "src/layers/data-source-table-task/dto/create-data-source-table-task.dto";
import { UpdateDataSourceTableTaskDto } from "src/layers/data-source-table-task/dto/update-data-source-table-task.dto";
import { DataSourceTableTaskRepository } from "src/layers/data-source-table-task/data-source-table-task.repository";
import { PinoLogger } from "nestjs-pino";
import { IDataSourceTableTaskLatestInfo } from "src/layers/data-source-table-task/data-source-table-task.types";

@Injectable()
export class DataSourceTableTaskService {
    constructor(
        private readonly dataSourceTableTaskRepository: DataSourceTableTaskRepository,
        private readonly logger: PinoLogger,
    ) {
        this.logger.setContext(DataSourceTableTaskService.name);
    }

    create(createDataSourceTableTaskDto: CreateDataSourceTableTaskDto) {
        return this.dataSourceTableTaskRepository.create(
            createDataSourceTableTaskDto,
        );
    }

    update(
        id: number,
        updateDataSourceTableTaskDto: UpdateDataSourceTableTaskDto,
    ) {
        return this.dataSourceTableTaskRepository.update(
            id,
            updateDataSourceTableTaskDto,
        );
    }

    get(userId: number, id: number) {
        return this.dataSourceTableTaskRepository.get(userId, id);
    }

    getAll(userId: number) {
        return this.dataSourceTableTaskRepository.getAll(userId);
    }

    async getLatestInfo(
        userId: number,
    ): Promise<IDataSourceTableTaskLatestInfo> {
        const lastTaskTime =
            await this.dataSourceTableTaskRepository.getLastTask(userId);
        const endTime = lastTaskTime?.endTime;

        return {
            lastTaskTime: endTime ? endTime.toString() : null,
            count: await this.dataSourceTableTaskRepository.getNumberOfTasksToday(
                userId,
            ),
        };
    }
}
