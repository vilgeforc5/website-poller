import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { AtStrategy } from "src/layers/auth/strategy/at.strategy";
import { RtStrategy } from "src/layers/auth/strategy/rt.strategy";
import { UsersModule } from "src/layers/users/users.module";

@Module({
    imports: [JwtModule.register({}), UsersModule],
    controllers: [AuthController],
    providers: [AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {}
