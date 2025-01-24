import {
    createParamDecorator,
    ExecutionContext,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtPayload } from "src/auth/types/jwtPayload.type";

export const GetCurrentUserId = createParamDecorator(
    (_: undefined, context: ExecutionContext): number => {
        const request = context.switchToHttp().getRequest();
        const user = request.user as JwtPayload;

        if (!user) {
            throw new UnauthorizedException();
        }

        return user.sub;
    },
);
