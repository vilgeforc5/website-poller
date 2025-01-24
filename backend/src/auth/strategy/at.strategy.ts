import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "src/auth/types/jwtPayload.type";

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(config: ConfigService) {
        const secretOrKey = config.get<string>("AT_SECRET");

        if (!secretOrKey) {
            throw new InternalServerErrorException();
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey,
        });
    }

    validate(payload: JwtPayload) {
        return payload;
    }
}
