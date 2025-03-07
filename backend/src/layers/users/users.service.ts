import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRepository } from "src/layers/users/user.repository";
import { PinoLogger } from "nestjs-pino";
import { User } from "@prisma/client";

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly logger: PinoLogger,
    ) {
        this.logger.setContext(UsersService.name);
    }

    create(
        createUserDto: Omit<CreateUserDto, "password"> & { hash: string },
    ): Promise<User> {
        this.logger.info("create: ", createUserDto);

        return this.userRepository.create(createUserDto);
    }

    findByEmail(email: string) {
        this.logger.trace("findByEmail");

        return this.userRepository.getByEmail(email);
    }

    findById(id: number) {
        this.logger.trace("findById");

        return this.userRepository.getById(id);
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.logger.info("update: ", { id, updateUserDto });

        return this.userRepository.update(id, updateUserDto);
    }

    async isAdmin(id: number) {
        const user = await this.userRepository.getUserRole(id);

        return user?.role === "ADMIN" || user?.role === "OWNER";
    }

    async getPrivilegedUserId() {
        try {
            return (await this.userRepository.getAdminOrOwnerId()).id;
        } catch (error) {
            this.logger.error(error);

            throw new InternalServerErrorException("no admin found");
        }
    }

    async getAll() {
        return this.userRepository.getAll();
    }

    async delete(id: number) {
        return this.userRepository.delete(id);
    }
}
