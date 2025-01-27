import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateDataSourceTableDto } from "src/layers/data-source-table/dto/create-data-source-table.dto";
import { PinoLogger } from "nestjs-pino";
import { DataSourceTableRepository } from "src/layers/data-source-table/data-source-table.repository";
import { IDataSourceTableInfo } from "src/layers/data-source-table/data-source-table.types";
import { DeleteDataSourceTableDto } from "src/layers/data-source-table/dto/delete-data-source-table.dto";

@Injectable()
export class DataSourceTableService {
    constructor(
        private readonly logger: PinoLogger,
        private readonly dataSourceTableRepository: DataSourceTableRepository,
    ) {
        this.logger.setContext(DataSourceTableService.name);
    }

    private extractSpreadsheetId(url: string) {
        try {
            const urlObj = new URL(url);

            const match = urlObj.pathname.match(/\/d\/([a-zA-Z0-9_-]+)/);

            if (match && match[1]) {
                return match[1];
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }

    create(id: number, dto: CreateDataSourceTableDto) {
        this.logger.info("create new data source table", dto);
        const googleSpreadSheetId = this.extractSpreadsheetId(dto.url);
        if (!googleSpreadSheetId) {
            throw new BadRequestException();
        }

        return this.dataSourceTableRepository.create(id, {
            ...dto,
            googleSpreadSheetId,
        });
    }

    createMany(id: number, dto: CreateDataSourceTableDto[]) {
        this.logger.info("createMany new data source table", dto);

        return Promise.all(
            dto.map(({ url }) => {
                const googleSpreadSheetId = this.extractSpreadsheetId(url);

                if (!googleSpreadSheetId) {
                    throw new BadRequestException();
                }

                return this.dataSourceTableRepository.create(id, {
                    url,
                    googleSpreadSheetId,
                });
            }),
        );
    }

    async getInfo(userId: number): Promise<IDataSourceTableInfo[]> {
        const info = await this.dataSourceTableRepository.getInfo(userId);

        return info.map((table) => {
            const lastPoll = table.parsingTasks[0];
            const lastPollStartTime = lastPoll?.startTime;

            return {
                id: table.id,
                url: table.url,
                createdAt: table.createdAt.toString(),
                lastPolled: lastPollStartTime
                    ? lastPollStartTime.toString()
                    : null,
                users: table.users.map((user) => user.email),
                parsingTasks: table.parsingTasks.map((task) => {
                    const taskStartTime = task.startTime;

                    return {
                        startTime: taskStartTime.toString(),
                        addedSites: task.addedSites.map((site) => site.address),
                        id: task.id,
                        state: task.workingState,
                        error: task.error,
                        updateTrigger: task.updateTrigger,
                    };
                }),
            };
        });
    }

    get(userId: number, tableId: number) {
        return this.dataSourceTableRepository.getById(userId, tableId);
    }

    getAll(userId: number) {
        return this.dataSourceTableRepository.getAll(userId);
    }

    delete(userId: number, deleteDto: DeleteDataSourceTableDto) {
        return this.dataSourceTableRepository.delete(userId, deleteDto);
    }
}
