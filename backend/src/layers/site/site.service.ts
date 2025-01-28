import { Injectable } from "@nestjs/common";
import { CreateSiteDto } from "src/layers/site/dto/create-site.dto";
import { SiteRepository } from "src/layers/site/site.repository";
import { PinoLogger } from "nestjs-pino";
import { ISiteLatestInfo } from "src/layers/site/site.types";
import { Prisma } from "@prisma/client";

@Injectable()
export class SiteService {
    constructor(
        private readonly siteRepository: SiteRepository,
        private readonly logger: PinoLogger,
    ) {
        this.logger.setContext(SiteService.name);
    }

    upsert(userId: number, createSiteDto: CreateSiteDto[]) {
        this.logger.info("upsert: ", createSiteDto);

        return Promise.all(
            createSiteDto.map(
                (site) =>
                    new Promise(async (res) => {
                        await this.siteRepository.upsert(userId, site);
                        await new Promise(async (res) => setTimeout(res, 50));

                        res(undefined);
                    }),
            ),
        );
    }

    async getPaginated(
        userId: number,
        skip = 0,
        take = 5,
        orderByDesc = false,
        include: Prisma.SiteInclude = {},
        where: Prisma.SiteWhereInput = {},
    ) {
        return this.siteRepository.getPaginated(
            userId,
            skip,
            take,
            orderByDesc,
            include,
            where,
        );
    }

    async getLatestInfo(userId: number): Promise<ISiteLatestInfo> {
        const count = await this.getTotalCount(userId);
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

    getTotalCount(userId: number) {
        return this.siteRepository.count(userId);
    }

    getAllForPollingTask(pollingTaskId: number) {
        return this.siteRepository.getAllForPollingTask(pollingTaskId);
    }

    async delete(siteId: number) {
        return this.siteRepository.delete(siteId);
    }
}
