import { Module } from "@nestjs/common";
import { TelegrafModule } from "nestjs-telegraf";
import { ConfigService } from "@nestjs/config";
import { TelegramService } from "src/layers/telegram/telegram.service";
import { PrismaService } from "src/prisma/prisma.service";
import { TelegramRepository } from "src/layers/telegram/telegram.repository";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        TelegrafModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                token: configService.get("TG_BOT_KEY") as string,
            }),
            inject: [ConfigService],
        }),
        AuthModule,
    ],
    providers: [TelegramService, PrismaService, TelegramRepository],
    exports: [TelegramService],
})
export class TelegramModule {}
