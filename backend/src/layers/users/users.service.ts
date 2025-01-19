import { Injectable } from "@nestjs/common";
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

    create(createUserDto: Omit<CreateUserDto, "password"> & { hash: string }): Promise<User> {
        this.logger.info("create: ", createUserDto);

        return this.userRepository.createOne(createUserDto);
    }

    findAll() {
        this.logger.trace("findAll");

        return this.userRepository.findAll();
    }

    findByEmail(email: string) {
        this.logger.trace("findByEmail");

        return this.userRepository.findByEmail(email);
    }

    findById(id: number) {
        this.logger.trace("findById");

        return this.userRepository.findById(id);
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.logger.info("update: ", { id, updateUserDto });

        return this.userRepository.updateById(id, updateUserDto);
    }

    remove(id: number) {
        this.logger.info("remove: ", id);

        return this.userRepository.deleteById(id);
    }
}
