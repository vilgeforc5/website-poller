import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UserRepository } from "src/layers/users/user.repository";

@Module({
    providers: [UsersService, PrismaService, UserRepository],
    exports: [UsersService],
})
export class UsersModule {}
