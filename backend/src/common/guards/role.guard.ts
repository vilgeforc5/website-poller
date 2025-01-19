import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

export class RoleGuard implements CanActivate {
    private readonly reflector: Reflector;

    constructor() {
        this.reflector = new Reflector();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.getAllAndOverride("roles", [
            context.getHandler(),
            context.getClass(),
        ]);
        const user = context.switchToHttp().getRequest().user;

        if (!roles) {
            return true;
        }

        return roles.includes(user.role);
    }
}
