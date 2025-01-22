import { Injectable } from "@nestjs/common";
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

    create(dto: CreateDataSourceTableDto) {
        this.logger.info("create new data source table", dto);

        return this.dataSourceTableRepository.create(dto);
    }

    update(dto: UpdateDataSourceTableDto) {
        this.logger.info("update source table", dto);

        return this.dataSourceTableRepository.update(dto);
    }

    getAll(userId: number) {
        return this.dataSourceTableRepository.getAll(userId);
    }

    get(userId: number, tableId: number) {
        return this.dataSourceTableRepository.getById(userId, tableId);
    }
}
