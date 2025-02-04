import { Ctx, InjectBot, On, Update } from "nestjs-telegraf";
import { Public } from "src/common/decorators/Public";
import { Scenes, Telegraf } from "telegraf";
import { TelegramRepository } from "src/layers/telegram/telegram.repository";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "src/auth/auth.service";
import { Role } from "@prisma/client";
import { PinoLogger } from "nestjs-pino";

@Public()
@Update()
export class TelegramService {
    private readonly bot: Telegraf<Scenes.SceneContext>;

    constructor(
        @InjectBot() bot: Telegraf<Scenes.SceneContext>,
        private readonly configService: ConfigService,
        private readonly telegramRepository: TelegramRepository,
        private readonly authService: AuthService,
        private readonly logger: PinoLogger,
    ) {
        this.bot = bot;
        this.logger.setContext(TelegramService.name);
    }

    @On("message")
    async onMessage(@Ctx() ctx: Scenes.SceneContext) {
        const text = ctx.text;
        const chatId = ctx?.chat?.id;

        if (!chatId) {
            return;
        }

        if (
            text &&
            text?.startsWith("/login") &&
            text.split("/login")[1]?.trim()
        ) {
            const secondPart = text.split("/login")[1]?.trim();
            const [email, password] = secondPart.split("|");
            const user = await this.authService.verifyCredentials(
                email,
                password,
            );

            if (!user) {
                await ctx.reply("Вход запрещен.");

                return;
            }

            await this.telegramRepository.createUserChat(
                chatId.toString(),
                user.id,
            );
            await ctx.reply("Вы авторизованы. Бот готов к работе.");

            return;
        }
    }

    async getAllUsers() {
        return this.telegramRepository.getAllUsers();
    }

    async sendToUser(userId: number, message: string): Promise<boolean> {
        try {
            const chats =
                await this.telegramRepository.findChatIdsByUserId(userId);

            if (!chats.length) {
                return false;
            }

            const chatIds = chats.map((chat) => chat.chatId);

            await Promise.all(
                chatIds.map(
                    (chatId) =>
                        new Promise(async (resolve, reject) => {
                            try {
                                resolve(
                                    await this.bot.telegram.sendMessage(
                                        chatId,
                                        message,
                                    ),
                                );
                            } catch (error) {
                                this.logger.error(error);

                                reject(error);
                            }
                        }),
                ),
            );

            return true;
        } catch (error) {
            this.logger.error(error);

            return false;
        }
    }

    async broadcast(message: string, roles?: Role[]) {
        const allUsers = await this.telegramRepository.getAllChatIds(roles);

        await Promise.all(
            allUsers.map(
                ({ chatId }) =>
                    new Promise(async (resolve) => {
                        await this.bot.telegram.sendMessage(chatId, message);

                        resolve(undefined);
                    }),
            ),
        );
    }
}
