import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "src/layers/users/dto/create-user.dto";
import { UpdateUserDto } from "src/layers/users/dto/update-user.dto";
import { Role } from "@prisma/client";

@Injectable()
export class UserRepository {
    constructor(private readonly prismaService: PrismaService) {}

    getById(id: number) {
        return this.prismaService.user.findUnique({ where: { id } });
    }

    getByEmail(email: string) {
        return this.prismaService.user.findUnique({ where: { email } });
    }

    getByRole(roles: Role[]) {
        return this.prismaService.user.findMany({
            where: { OR: roles.map((role) => ({ role })) },
        });
    }

    create(
        dto: Omit<CreateUserDto, "password"> & {
            hash: string;
            hashedRt?: string;
        },
    ) {
        return this.prismaService.user.create({
            data: {
                email: dto.email,
                hashedRt: dto.hashedRt,
                hash: dto.hash,
            },
        });
    }

    update(userId: number, dto: UpdateUserDto) {
        return this.prismaService.user.update({
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
