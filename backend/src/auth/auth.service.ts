import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as argon from "argon2";
import { AuthDto } from "src/auth/dto/auth.dto";
import { Tokens } from "src/auth/types/tokens.type";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtPayload } from "src/auth/types/jwtPayload.type";
import { UsersService } from "src/layers/users/users.service";
import { SignUpDto } from "src/auth/dto/signUp.dto";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private config: ConfigService,
        private readonly usersService: UsersService,
    ) {}

    async signUp(dto: SignUpDto): Promise<Tokens> {
        // used to restrict outer users from registration
        const keyMatch = dto.signUpKey === this.config.get("SIGN_UP_KEY");
        if (!keyMatch) {
            throw new ForbiddenException();
        }

        const hash = await argon.hash(dto.password);

        const user = await this.usersService
            .create({
                email: dto.email,
                hash,
            })
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === "P2002") {
                        throw new ForbiddenException("Credentials incorrect");
                    }
                }
                throw error;
            });

        const tokens = await this.getTokens(user.id, user.email, user.role);
        await this.updateRtHash(user.id, tokens.refresh_token);

        return tokens;
    }

    async signIn(dto: AuthDto): Promise<Tokens> {
        const user = await this.usersService.findByEmail(dto.email);

        if (!user) throw new ForbiddenException("Access Denied");

        const passwordMatches = await argon.verify(user.hash, dto.password);
        if (!passwordMatches) throw new ForbiddenException("Access Denied");

        const tokens = await this.getTokens(user.id, user.email, user.role);
        await this.updateRtHash(user.id, tokens.refresh_token);

        return tokens;
    }

    async logout(userId: number): Promise<boolean> {
        await this.usersService.update(userId, {
            hashedRt: undefined,
        });

        return true;
    }

    async refreshTokens(userId: number, rt: string): Promise<Tokens> {
        const user = await this.usersService.findById(userId);

        if (!user || !user.hashedRt)
            throw new ForbiddenException("Access Denied");

        const rtMatches = await argon.verify(user.hashedRt, rt);
        if (!rtMatches) throw new ForbiddenException("Access Denied");

        const tokens = await this.getTokens(user.id, user.email, user.role);

        await this.updateRtHash(user.id, tokens.refresh_token);

        return tokens;
    }

    async updateRtHash(id: number, rt: string): Promise<void> {
        const hash = await argon.hash(rt);
        await this.usersService.update(id, {
            hashedRt: hash,
        });
    }

    async getTokens(
        userId: number,
        email: string,
        role: string,
    ): Promise<Tokens> {
        const jwtPayload: JwtPayload = {
            sub: userId,
            email,
            role,
        };

        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: this.config.get<string>("AT_SECRET"),
                expiresIn: "1h",
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: this.config.get<string>("RT_SECRET"),
                expiresIn: "30d",
            }),
        ]);

        return {
            access_token,
            refresh_token,
        };
    }
}
