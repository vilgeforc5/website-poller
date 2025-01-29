import { Ctx, InjectBot, On, Update } from "nestjs-telegraf";
import { Public } from "src/common/decorators/Public";
import { Scenes, Telegraf } from "telegraf";
import { TelegramRepository } from "src/layers/telegram/telegram.repository";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "src/auth/auth.service";
import { Role } from "@prisma/client";

@Public()
@Update()
export class TelegramService {
    private readonly bot: Telegraf<Scenes.SceneContext>;

    constructor(
        @InjectBot() bot: Telegraf<Scenes.SceneContext>,
        private readonly configService: ConfigService,
        private readonly telegramRepository: TelegramRepository,
        private readonly authService: AuthService,
    ) {
        this.bot = bot;
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

            await this.telegramRepository.createUserChat(chatId, user.id);
            await ctx.reply("Вы авторизованы. Бот готов к работе.");

            return;
        }
    }

    private async isAuthorized(ctx: Scenes.SceneContext) {
        const chatId = ctx?.chat?.id;

        if (!chatId) {
            return false;
        }

        const user = await this.telegramRepository.findByChatId(chatId);
        if (!user) {
            return false;
        }
    }

    async getAllUsers() {
        return this.telegramRepository.getAllUsers();
    }

    async sendToUser(userId: number, message: string) {
        const user = await this.telegramRepository.findChatIdByUserId(userId);
        if (!user?.chatId) {
            return;
        }

        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    await this.bot.telegram.sendMessage(user?.chatId, message),
                );
            } catch (error) {
                reject(error);
            }
        });
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
