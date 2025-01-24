import { IsDate, IsEnum, IsOptional, IsString } from "class-validator";
import { EnumRequestMethod, PollingState, UpdateTrigger } from "@prisma/client";
import { CreatePollDto } from "src/layers/poll/dto/create-poll.dto";

export class UpdatePollingTaskDto {
    @IsOptional()
    @IsEnum(EnumRequestMethod)
    requestMethod?: EnumRequestMethod;

    @IsOptional()
    @IsEnum(PollingState)
    pollingState?: PollingState;

    @IsOptional()
    @IsDate()
    startTime?: string;

    @IsOptional()
    @IsDate()
    endTime?: string;

    @IsOptional()
    @IsEnum(UpdateTrigger)
    updateTrigger?: UpdateTrigger;

    @IsOptional()
    @IsString()
    error?: string;

    polls?: CreatePollDto[];
}
