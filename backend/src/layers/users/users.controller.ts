import { Controller, Delete, Get, Param, UseGuards } from "@nestjs/common";
import { UsersService } from "src/layers/users/users.service";
import { Roles } from "src/common/decorators/Roles";
import { RoleGuard } from "src/common/guards/role.guard";

@Controller("users")
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Roles(["OWNER", "ADMIN"])
    @UseGuards(RoleGuard)
    @Get("all")
    async getAll() {
        return this.userService.getAll();
    }

    @Roles(["OWNER", "ADMIN"])
    @UseGuards(RoleGuard)
    @Delete("/:id")
    async delete(@Param("id") id: number) {
        return this.userService.delete(id);
    }
}
