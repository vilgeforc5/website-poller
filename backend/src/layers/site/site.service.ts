import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateSiteDto } from "src/layers/site/dto/create-site.dto";
import { SiteRepository } from "src/layers/site/site.repository";
import { PinoLogger } from "nestjs-pino";
import { UsersService } from "src/layers/users/users.service";
import { Role } from "@prisma/client";

@Injectable()
export class SiteService {
    constructor(
        private readonly siteRepository: SiteRepository,
        private readonly logger: PinoLogger,
        private readonly usersService: UsersService,
    ) {
        this.logger.setContext(SiteService.name);
    }

    async create(userId: number, createSiteDto: CreateSiteDto) {
        this.logger.info("create: ", createSiteDto);

        return this.siteRepository.create(userId, createSiteDto);
    }

    async createMany(userId: number, createManyDto: CreateSiteDto[]) {
        this.logger.trace("createMany", userId, createManyDto);

        return Promise.all(
            createManyDto.map((site) => this.create(userId, site)),
        );
    }

    getAll(userId: number) {
        this.logger.trace("findAll");

        return this.siteRepository.getAll(userId);
    }

    async getPaginated(userId: number, skip = 0, take = 5) {
        return this.siteRepository.getPaginated(userId, skip, take);
    }

    async getLatestInfo(userId: number) {
        const count = await this.siteRepository.count(userId);
        const latestRecord = await this.siteRepository.getLatestRecord(userId);
        const diff = await this.siteRepository.getCountDifference(userId);

        return { count, createdAt: latestRecord?.createdAt, diff };
    }

    private async getIdsWithAdmins(id: number) {
        const admins = await this.usersService.findByRole([
            Role.ADMIN,
            Role.OWNER,
        ]);

        if (!admins) {
            throw new InternalServerErrorException();
        }

        return Array.from(new Set(admins.map((user) => user.id).concat(id)));
    }
}
