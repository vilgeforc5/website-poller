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
    get(
        @GetCurrentUserId() userId: number,
        @Query() params: { skip: string; limit: string },
    ): Promise<ISiteInfo[]> {
        const skip = parseInt(params.skip);
        const limit = parseInt(params.limit);

        if (isNaN(skip) || isNaN(limit)) {
            throw new BadRequestException();
        }

        return this.siteService.getPaginated(userId, skip, limit, {
            polls: {
                select: {
                    statusCode: true,
                    retryCount: true,
                    requestMethod: true,
                },
                take: 20,
            },
            users: { select: { email: true } },
        });
    }
}
