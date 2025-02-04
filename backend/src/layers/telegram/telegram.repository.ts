import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Role } from "@prisma/client";

@Injectable()
export class TelegramRepository {
    constructor(private prismaService: PrismaService) {}

    findChatIdsByUserId(userId: number) {
        return this.prismaService.telegramUser.findMany({
            where: { userId },
            select: {
                chatId: true,
            },
        });
    }

    createUserChat(chatId: string, userId: number) {
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
