import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "src/layers/users/dto/create-user.dto";
import { UpdateUserDto } from "src/layers/users/dto/update-user.dto";

@Injectable()
export class UserRepository {
    constructor(private readonly prismaService: PrismaService) {}

    findById(id: number) {
        return this.prismaService.user.findUnique({ where: { id } });
    }

    findByEmail(email: string) {
        return this.prismaService.user.findUnique({ where: { email } });
    }

    createOne(dto: Pick<CreateUserDto, "email" | "role"> & { hashedRt?: string; hash: string }) {
        return this.prismaService.user.create({
            data: {
                email: dto.email,
                role: dto.role,
                hashedRt: dto.hashedRt,
                hash: dto.hash,
            },
        });
    }

    updateById(id: number, dto: UpdateUserDto) {
        return this.prismaService.user.update({
            where: { id },
            data: {
                email: dto.email,
                role: dto.role,
                hashedRt: dto.hashedRt,
                hash: dto.hash,
            },
        });
    }

    deleteById(id: number) {
        return this.prismaService.user.delete({ where: { id } });
    }

    findAll() {
        return this.prismaService.user.findMany();
    }
}
