import { IsDate, IsEnum, IsOptional } from "class-validator";
import { EnumRequestMethod, PollingState, UpdateTrigger } from "@prisma/client";

export class CreatePollingTaskDto {
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
    updateTrigger: UpdateTrigger;
}
