import { Injectable } from "@nestjs/common";
import { UpdateConfigDto } from "src/layers/config/dto/update-config.dto";
import { ConfigRepository } from "src/layers/config/entities/config.repository";

@Injectable()
export class ConfigService {
    constructor(private readonly configRepository: ConfigRepository) {}

    get() {
        return this.configRepository.get();
    }

    update(updateConfigDto: UpdateConfigDto) {
        return this.configRepository.updateConfig(updateConfigDto);
    }

    createIfNotExists() {
        return this.configRepository.createIfNotExists();
    }
}
