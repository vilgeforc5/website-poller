import { Injectable } from "@nestjs/common";
import { UpdateConfigDto } from "src/layers/config/dto/update-config.dto";
import { ConfigRepository } from "src/layers/config/entities/config.repository";
import { IConfig } from "src/layers/config/config.types";

@Injectable()
export class ConfigService {
    constructor(private readonly configRepository: ConfigRepository) {}

    async get(): Promise<IConfig> {
        return this.configRepository.get();
    }

    update(updateConfigDto: UpdateConfigDto) {
        return this.configRepository.updateConfig({
            ...updateConfigDto,
            headers: JSON.parse(updateConfigDto.headers || ""),
        });
    }

    createIfNotExists() {
        return this.configRepository.createIfNotExists();
    }
}
