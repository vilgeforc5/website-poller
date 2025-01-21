import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRepository } from "src/layers/users/user.repository";
import { PinoLogger } from "nestjs-pino";
import { Role, User } from "@prisma/client";

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

    findByRole(role: Role) {
        return this.userRepository.getByRole(role);
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.logger.info("update: ", { id, updateUserDto });

        return this.userRepository.update(id, updateUserDto);
    }
}
