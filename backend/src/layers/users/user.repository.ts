import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "src/layers/users/dto/create-user.dto";
import { UpdateUserDto } from "src/layers/users/dto/update-user.dto";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class UserRepository {
    private readonly user: PrismaClient["user"];

    constructor(prismaService: PrismaService) {
        this.user = prismaService.user;
    }

    getById(id: number) {
        return this.user.findUnique({ where: { id } });
    }

    getByEmail(email: string) {
        return this.user.findUnique({ where: { email } });
    }

    create(
        dto: Omit<CreateUserDto, "password"> & {
            hash: string;
            hashedRt?: string;
        },
    ) {
        return this.user.create({
            data: {
                email: dto.email,
                hashedRt: dto.hashedRt,
                hash: dto.hash,
            },
        });
    }

    update(userId: number, dto: UpdateUserDto) {
        return this.user.update({
            where: { id: userId },
            data: {
                email: dto.email,
                role: dto.role,
                hashedRt: dto.hashedRt,
                hash: dto.hash,
            },
        });
    }
}
