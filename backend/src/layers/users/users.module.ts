import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UserRepository } from "src/layers/users/user.repository";
import { UsersController } from "src/layers/users/users.controller";

@Module({
    providers: [UsersService, PrismaService, UserRepository],
    exports: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
