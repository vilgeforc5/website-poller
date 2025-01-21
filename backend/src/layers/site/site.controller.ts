import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
} from "@nestjs/common";
import { SiteService } from "src/layers/site/site.service";
import { CreateSiteDto } from "src/layers/site/dto/create-site.dto";
import { GetCurrentUserId } from "src/common/decorators/GetCurrentUserId";

@Controller("site")
export class SiteController {
    constructor(private readonly siteService: SiteService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createMany(
        @Body() createSiteManyDto: CreateSiteDto[],
        @GetCurrentUserId() userId: number,
    ) {
        return this.siteService.createMany(userId, createSiteManyDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    findAll(@GetCurrentUserId() userId: number) {
        return this.siteService.getAll(userId);
    }
}
