import { Module } from "@nestjs/common";
import { ConfigService } from "src/layers/config/config.service";
import { ConfigController } from "src/layers/config/config.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigRepository } from "src/layers/config/entities/config.repository";

@Module({
    controllers: [ConfigController],
    providers: [ConfigService, PrismaService, ConfigRepository],
    exports: [ConfigService],
})
export class ConfigModule {}
