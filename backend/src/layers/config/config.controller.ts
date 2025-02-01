import { Body, Controller, Get, Post } from "@nestjs/common";
import { ConfigService } from "src/layers/config/config.service";
import { UpdateConfigDto } from "src/layers/config/dto/update-config.dto";

export const configPaths = {
    base: "config",
    get: "",
    update: "update",
};

@Controller(configPaths.base)
export class ConfigController {
    constructor(private readonly configService: ConfigService) {}

    @Get(configPaths.get)
    findOne() {
        return this.configService.get();
    }

    @Post(configPaths.update)
    update(@Body() updateConfigDto: UpdateConfigDto) {
        return this.configService.update(updateConfigDto);
    }
}
