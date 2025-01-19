import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { AuthDto } from "src/layers/auth/dto/auth.dto";
import { Tokens } from "src/layers/auth/types/tokens.type";
import { Public } from "src/common/decorators/Public";
import { GetCurrentUserId } from "src/common/decorators/GetCurrentUserId";
import { GetCurrentUser } from "src/common/decorators/GetCurrentUser";
import { RtGuard } from "src/common/guards/rt.guard";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post("signup")
    @HttpCode(HttpStatus.CREATED)
    signUpLocal(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signUpLocal(dto);
    }

    @Public()
    @Post("signin")
    @HttpCode(HttpStatus.OK)
    signInLocal(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signInLocal(dto);
    }

    @Post("logout")
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId: number): Promise<boolean> {
        return this.authService.logout(userId);
    }

    @Public()
    @UseGuards(RtGuard)
    @Post("refresh")
    @HttpCode(HttpStatus.OK)
    refreshTokens(
        @GetCurrentUserId() userId: number,
        @GetCurrentUser("refreshToken") refreshToken: string,
    ): Promise<Tokens> {
        return this.authService.refreshTokens(userId, refreshToken);
    }
}
