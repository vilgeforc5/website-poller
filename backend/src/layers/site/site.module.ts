import { Module } from "@nestjs/common";
import { SiteService } from "src/layers/site/site.service";
import { SiteController } from "src/layers/site/site.controller";
import { SiteRepository } from "src/layers/site/site.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigModule } from "@nestjs/config";

interface SiteModuleConfig {
    siteSort: "asc" | "desc";
}

@Module({
    imports: [
        ConfigModule.forFeature(
            (): SiteModuleConfig => ({
                siteSort: "desc",
            }),
        ),
    ],
    controllers: [SiteController],
    providers: [SiteService, SiteRepository, PrismaService],
    exports: [SiteService],
})
export class SiteModule {}
