import { Injectable } from "@nestjs/common";
import { CreateSiteDto } from "src/layers/site/dto/create-site.dto";
import { SiteRepository } from "src/layers/site/site.repository";
import { PinoLogger } from "nestjs-pino";

@Injectable()
export class SiteService {
    constructor(
        private readonly siteRepository: SiteRepository,
        private readonly logger: PinoLogger,
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

    async upsert(userId: number, createSiteDto: CreateSiteDto) {
        this.logger.info("upsert: ", createSiteDto);
        const existed = await this.siteRepository.getByAddress(
            createSiteDto.address,
        );

        if (existed) {
            return {
                existed: true,
                data: existed,
            };
        } else {
            const res = await this.siteRepository.create(userId, createSiteDto);

            return {
                existed: false,
                data: res,
            };
        }
    }

    async upsertMany(userId: number, createManyDto: CreateSiteDto[]) {
        this.logger.trace("upsertMany", userId, createManyDto);

        return Promise.all(
            createManyDto.map((site) => this.upsert(userId, site)),
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
}
