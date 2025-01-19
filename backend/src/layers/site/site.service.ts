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

    create(createSiteDto: CreateSiteDto) {
        this.logger.info("create: ", createSiteDto);

        return this.siteRepository.create(createSiteDto);
    }

    createMany(createManyDto: CreateSiteDto[]) {
        return Promise.all(createManyDto.map((site) => this.siteRepository.create(site)));
    }

    findAll() {
        this.logger.trace("findAll");

        return this.siteRepository.getAll();
    }

    findOne(token: string) {
        this.logger.trace("findOne");

        return this.siteRepository.findOne(token);
    }

    deleteOne(id: string) {
        this.logger.info("deleteOne: ", id);

        return this.siteRepository.deleteOne(id);
    }

    getPaginated(skip = 0, take = 5) {
        this.logger.info("getPaginated");

        return this.siteRepository.getPaginated(skip, take);
    }
}
