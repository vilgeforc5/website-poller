import { IsDate, IsEnum, IsOptional } from "class-validator";
import { EnumRequestMethod, PollingState, PollTrigger } from "@prisma/client";

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
    @IsEnum(PollTrigger)
    triggeredBy?: PollTrigger;
}
