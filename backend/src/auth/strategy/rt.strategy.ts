import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import {
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtPayloadWithRt } from "src/auth/types/jwtPayloadWithRt.type";
import { JwtPayload } from "src/auth/types/jwtPayload.type";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
    constructor(config: ConfigService) {
        const secretOrKey = config.get<string>("RT_SECRET");

        if (!secretOrKey) {
            throw new InternalServerErrorException();
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey,
            passReqToCallback: true,
        });
    }

    validate(req: Request, payload: JwtPayload): JwtPayloadWithRt {
        const refreshToken = req
            ?.get("authorization")
            ?.replace("Bearer", "")
            .trim();

        if (!refreshToken)
            throw new ForbiddenException("Refresh token malformed");

        return {
            ...payload,
            refreshToken,
        };
    }
}
