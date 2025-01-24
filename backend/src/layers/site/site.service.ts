import { Injectable } from "@nestjs/common";
import { CreateSiteDto } from "src/layers/site/dto/create-site.dto";
import { SiteRepository } from "src/layers/site/site.repository";
import { PinoLogger } from "nestjs-pino";
import { ISiteLatestInfo } from "src/layers/site/site.types";

@Injectable()
export class SiteService {
    constructor(
        private readonly siteRepository: SiteRepository,
        private readonly logger: PinoLogger,
    ) {
        this.logger.setContext(SiteService.name);
    }

    upsert(userId: number, createSiteDto: CreateSiteDto) {
        this.logger.info("upsert: ", createSiteDto);

        return this.siteRepository.upsert(userId, createSiteDto);
    }

    async getPaginated(userId: number, skip = 0, take = 5) {
        return this.siteRepository.getPaginated(userId, skip, take);
    }

    async getLatestInfo(userId: number): Promise<ISiteLatestInfo> {
        const count = await this.siteRepository.count(userId);
        const latestRecord = await this.siteRepository.getLatestRecord(userId);
        const diffFromYesterday =
            await this.siteRepository.getCountDifference(userId);
        const lastCreatedTime = latestRecord?.createdAt;

        return {
            count,
            lastCreatedTime: lastCreatedTime
                ? lastCreatedTime.toString()
                : null,
            diffFromYesterday,
        };
    }
}
