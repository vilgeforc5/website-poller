import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TelegramRepository {
    constructor(private prismaService: PrismaService) {}

    findByChatId(chatId: number) {
        return this.prismaService.telegramUser.findUnique({
            where: { chatId },
        });
    }

    createUserChat(chatId: number) {
        return this.prismaService.telegramUser.create({ data: { chatId } });
    }

    getAllChatIds() {
        return this.prismaService.telegramUser.findMany({
            select: { chatId: true },
        });
    }
}
