import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { UpdateConfigDto } from "src/layers/config/dto/update-config.dto";

@Injectable()
export class ConfigRepository {
    private readonly config: PrismaService["config"];
    public static singletonKey = "config-repository-key";

    constructor(prismaService: PrismaService) {
        this.config = prismaService.config;
    }

    get() {
        return this.config.findUnique({
            where: { id: ConfigRepository.singletonKey },
        });
    }

    updateConfig(dto: UpdateConfigDto) {
        return this.config.update({
            where: { id: ConfigRepository.singletonKey },
            data: dto,
        });
    }

    createIfNotExists() {
        return this.config.upsert({
            where: {
                id: ConfigRepository.singletonKey,
            },
            create: {
                id: ConfigRepository.singletonKey,
            },
            update: {},
        });
    }
}
