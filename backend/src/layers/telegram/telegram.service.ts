import { Ctx, InjectBot, On, Update } from "nestjs-telegraf";
import { Public } from "src/common/decorators/Public";
import { Scenes, Telegraf } from "telegraf";
import { TelegramRepository } from "src/layers/telegram/telegram.repository";
import { ConfigService } from "@nestjs/config";

@Public()
@Update()
export class TelegramService {
    private readonly bot: Telegraf<Scenes.SceneContext>;

    constructor(
        @InjectBot() bot: Telegraf<Scenes.SceneContext>,
        private readonly configService: ConfigService,
        private readonly telegramRepository: TelegramRepository,
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
            text.split("/login")[1]?.trim() ===
                this.configService.get("SIGN_UP_KEY")
        ) {
            await this.telegramRepository.createUserChat(chatId);
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

    async broadcast(message: string) {
        const allUsers = await this.telegramRepository.getAllChatIds();

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
