import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "nestjs-pino";
import { ValidationPipe } from "@nestjs/common";
import { StateService } from "src/layers/state/state.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });
    app.useLogger(app.get(Logger));
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );
    //await app.get(StateService).updatePollingState(false);
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
