import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { SiteService } from "src/layers/site/site.service";
import { GetCurrentUserId } from "src/common/decorators/GetCurrentUserId";

@Controller("site")
export class SiteController {
    constructor(private readonly siteService: SiteService) {}
    @HttpCode(HttpStatus.OK)
    @Get("latest-info")
    countInfo(@GetCurrentUserId() userId: number) {
        return this.siteService.getLatestInfo(userId);
    }
}
