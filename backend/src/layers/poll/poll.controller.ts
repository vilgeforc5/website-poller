import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { PollService } from "src/layers/poll/poll.service";
import { CreatePollDto } from "src/layers/poll/dto/create-poll.dto";

@Controller("poll")
export class PollController {
    constructor(private readonly pollService: PollService) {}

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.pollService.findBySiteId(id);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() createPollDto: CreatePollDto) {
        return this.pollService.createBySiteId(createPollDto);
    }
}
