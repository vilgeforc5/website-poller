import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    UseGuards,
} from "@nestjs/common";
import { SiteService } from "src/layers/site/site.service";
import { CreateSiteDto } from "src/layers/site/dto/create-site.dto";
import { Roles } from "src/common/decorators/Roles";
import { RoleGuard } from "src/common/guards/role.guard";

@Controller("site")
export class SiteController {
    constructor(private readonly siteService: SiteService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() createSiteDto: CreateSiteDto) {
        return this.siteService.create(createSiteDto);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post("many")
    createMany(@Body() createSiteManyDto: CreateSiteDto[]) {
        return this.siteService.createMany(createSiteManyDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    findAll() {
        return this.siteService.findAll();
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.siteService.findOne(id);
    }

    @Roles(["OWNER", "ADMIN"])
    @UseGuards(RoleGuard)
    @HttpCode(HttpStatus.OK)
    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.siteService.deleteOne(id);
    }
}
