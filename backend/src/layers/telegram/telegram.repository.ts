import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Role } from "@prisma/client";

@Injectable()
export class TelegramRepository {
    constructor(private prismaService: PrismaService) {}

    findByChatId(chatId: number) {
        return this.prismaService.telegramUser.findUnique({
            where: { chatId },
        });
    }

    findChatIdByUserId(userId: number) {
        return this.prismaService.telegramUser.findUnique({
            where: { userId },
            select: {
                chatId: true,
            },
        });
    }

    createUserChat(chatId: number, userId: number) {
        return this.prismaService.telegramUser.create({
            data: {
                chatId,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }

    getAllUsers() {
        return this.prismaService.telegramUser.findMany();
    }

    getAllChatIds(role: Role[] = ["OWNER", "ADMIN", "USER"]) {
        return this.prismaService.telegramUser.findMany({
            select: { chatId: true },
            where: {
                user: {
                    role: {
                        in: role,
                    },
                },
            },
        });
    }
}
