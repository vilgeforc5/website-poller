import { Module } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { AuthController } from "src/auth/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { AtStrategy } from "src/auth/strategy/at.strategy";
import { RtStrategy } from "src/auth/strategy/rt.strategy";
import { UsersModule } from "src/layers/users/users.module";

@Module({
    imports: [JwtModule.register({}), UsersModule],
    controllers: [AuthController],
    providers: [AuthService, AtStrategy, RtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
