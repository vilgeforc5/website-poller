import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
} from "@nestjs/common";
import { SiteService } from "src/layers/site/site.service";
import { GetCurrentUserId } from "src/common/decorators/GetCurrentUserId";
import { ISiteInfo } from "src/layers/site/site.types";
import { CreateSiteDto } from "src/layers/site/dto/create-site.dto";

@Controller("site")
export class SiteController {
    constructor(private readonly siteService: SiteService) {}

    @HttpCode(HttpStatus.OK)
    @Get("latest-info")
    countInfo(@GetCurrentUserId() userId: number) {
        return this.siteService.getLatestInfo(userId);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post("create-many")
    createMany(
        @GetCurrentUserId() userId: number,
        @Body() dto: CreateSiteDto[],
    ) {
        return this.siteService.upsert(userId, dto);
    }

    @HttpCode(HttpStatus.OK)
    @Get("total-count")
    getTotalCount(@GetCurrentUserId() userId: number) {
        return this.siteService.getTotalCount(userId);
    }

    @HttpCode(HttpStatus.OK)
    @Get("get-paginated")
    async get(
        @GetCurrentUserId() userId: number,
        @Query()
        params: {
            skip: string;
            limit: string;
            take: string;
            codes: string;
        },
    ): Promise<ISiteInfo[]> {
        const skip = parseInt(params.skip);
        const limit = parseInt(params.limit);
        const take = parseInt(params.take) || 20;

        if (isNaN(skip) || isNaN(limit)) {
            throw new BadRequestException();
        }

        const sites = await this.siteService.getPaginated(userId, skip, limit, {
            polls: {
                select: {
                    statusCode: true,
                    retryCount: true,
                    requestMethod: true,
                    createdAt: true,
                    id: true,
                },
                take,
                orderBy: {
                    createdAt: "desc",
                },
            },
            users: { select: { email: true } },
        });

        const withStatusCode = sites.map((site) => ({
            ...site,
            lastStatusCode: site.polls.at(0)?.statusCode,
        }));

        const codes = params.codes ? params.codes.split(".") : [];

        return codes.length === 0
            ? withStatusCode
            : withStatusCode.filter(
                  (site) =>
                      site.lastStatusCode &&
                      codes.includes(
                          site.lastStatusCode.toString().at(0) || "",
                      ),
              );
    }
}
