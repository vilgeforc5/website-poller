import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PinoLogger } from "nestjs-pino";

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    constructor(private readonly logger: PinoLogger) {
        super();
        this.logger.setContext(PrismaService.name);
    }

    async onModuleInit() {
        try {
            await this.$connect();
            this.logger.info("Successfully connected to db");
        } catch (error) {
            this.logger.error(error);
        }
    }

    async onModuleDestroy() {
        try {
            await this.$disconnect();
            this.logger.info("Successfully disconnected from db");
        } catch (error) {
            this.logger.error(error);
        }
    }
}
