import { Injectable } from "@nestjs/common";
import { DataSourceTableService } from "src/layers/data-source-table/data-source-table.service";
import { PinoLogger } from "nestjs-pino";
import { ParserWorkerService } from "src/workers/data-source-table-parser/parser-worker/parser-worker.service";
import { DataSourceTableTaskService } from "src/layers/data-source-table-task/data-source-table-task.service";
import { UpdateTrigger } from "@prisma/client";

@Injectable()
export class DataSourceTableParserService {
    constructor(
        private readonly dataSourceTableService: DataSourceTableService,
        private readonly dataSourceTableTaskService: DataSourceTableTaskService,
        private readonly logger: PinoLogger,
        private readonly parserWorkerService: ParserWorkerService,
    ) {
        this.logger.setContext(DataSourceTableParserService.name);
    }

    async parseAll(userId: number) {
        const tables = await this.dataSourceTableService.getAll(userId);

        if (!tables) {
            return;
        }

        for (const table of tables) {
            const task = await this.dataSourceTableTaskService.create({
                dataSourceTableId: table.id,
                updateTrigger: "SCHEDULE",
            });

            await this.startTask({
                taskId: task.id,
                userId,
                spreadsheetId: table.googleSpreadSheetId,
            });
        }
    }

    async trigger(
        userId: number,
        tableId: number,
        updateTrigger: UpdateTrigger = "MANUAL",
    ) {
        const table = await this.dataSourceTableService.get(userId, tableId);

        if (!table || !table.id) {
            this.logger.error("trigger userId not found");

            return;
        }

        const task = await this.dataSourceTableTaskService.create({
            dataSourceTableId: table.id,
            updateTrigger,
        });

        this.startTask({
            taskId: task.id,
            userId,
            spreadsheetId: table.googleSpreadSheetId,
        });

        return { id: task.id };
    }

    async startTask({
        taskId,
        userId,
        spreadsheetId,
    }: {
        taskId: number;
        userId: number;
        spreadsheetId: string;
    }) {
        try {
            const result = await this.parserWorkerService.work({
                limit: 20,
                spreadsheetId,
                userId,
                taskId,
            });

            await this.dataSourceTableTaskService.update(taskId, {
                endTime: new Date().toISOString(),
                workingState: "IDLE",
            });

            if (!result.ok) {
                await this.dataSourceTableTaskService.update(taskId, {
                    error: result.message || "Ошибка парсинга",
                });
            }
        } catch (e) {
            this.logger.error(e);
        }
    }
}
