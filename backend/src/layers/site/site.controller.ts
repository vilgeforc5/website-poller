import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { SiteService } from "src/layers/site/site.service";
import { GetCurrentUserId } from "src/common/decorators/GetCurrentUserId";
import { ISiteInfo } from "src/layers/site/site.types";
import { CreateSiteDto } from "src/layers/site/dto/create-site.dto";
import { Roles } from "src/common/decorators/Roles";
import { RoleGuard } from "src/common/guards/role.guard";

@Controller("site")
export class SiteController {
    constructor(private readonly siteService: SiteService) {}

    @HttpCode(HttpStatus.OK)
    @Get("latest-info")
    countInfo(@GetCurrentUserId() userId: number) {
        return this.siteService.getLatestInfo(userId);
    }

    @Roles(["ADMIN", "OWNER"])
    @UseGuards(RoleGuard)
    @HttpCode(HttpStatus.OK)
    @Delete("/:id")
    async delete(@Param("id") siteId: number) {
        return this.siteService.delete(siteId);
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
    async getPaginated(
        @GetCurrentUserId() userId: number,
        @Query()
        params: {
            skip: string;
            limit: string;
            take: string;
        },
    ): Promise<ISiteInfo[]> {
        const skip = parseInt(params.skip);
        const limit = parseInt(params.limit);
        const take = parseInt(params.take) || 20;

        if (isNaN(skip) || isNaN(limit)) {
            throw new BadRequestException();
        }

        const sites = await this.siteService.getPaginated(
            userId,
            skip,
            limit,
            true,
            {
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
            },
            {},
        );

        return sites.map((site) => ({
            ...site,
            lastStatusCode: site.polls.at(0)?.statusCode,
        }));
    }
}
