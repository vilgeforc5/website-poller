import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateDataSourceTableDto } from "src/layers/data-source-table/dto/create-data-source-table.dto";
import { PinoLogger } from "nestjs-pino";
import { DataSourceTableRepository } from "src/layers/data-source-table/data-source-table.repository";
import { UpdateDataSourceTableDto } from "src/layers/data-source-table/dto/update-data-source-table.dto";

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

    update(dto: UpdateDataSourceTableDto) {
        this.logger.info("update source table", dto);

        return this.dataSourceTableRepository.update(dto);
    }

    getAll(userId: number) {
        return this.dataSourceTableRepository.getAll(userId);
    }

    async getInfo(userId: number) {
        const info = await this.dataSourceTableRepository.getInfo(userId);

        return info.map((table) => {
            const lastPoll = table.parsingTasks[0];

            return {
                url: table.url,
                createdAt: table.createdAt,
                lastPolled: lastPoll?.startTime,
                users: table.users.map((user) => user.email),
                parsingTasks: table.parsingTasks.map((task) => ({
                    time: task?.startTime,
                    addedSites: task.addedSites.map((site) => site.address),
                })),
            };
        });
    }

    get(userId: number, tableId: number) {
        return this.dataSourceTableRepository.getById(userId, tableId);
    }
}
