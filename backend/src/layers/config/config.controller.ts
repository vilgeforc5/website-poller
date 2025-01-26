import { Body, Controller, Get, Post } from "@nestjs/common";
import { ConfigService } from "src/layers/config/config.service";
import { UpdateConfigDto } from "src/layers/config/dto/update-config.dto";

@Controller("config")
export class ConfigController {
    constructor(private readonly configService: ConfigService) {}

    @Get()
    findOne() {
        return this.configService.get();
    }

    @Post()
    update(@Body() updateConfigDto: UpdateConfigDto) {
        return this.configService.update(updateConfigDto);
    }
}
