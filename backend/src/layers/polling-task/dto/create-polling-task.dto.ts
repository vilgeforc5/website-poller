import { IsDate, IsEnum, IsOptional } from "class-validator";
import { EnumRequestMethod, UpdateTrigger, WorkingState } from "@prisma/client";

export class CreatePollingTaskDto {
    @IsOptional()
    @IsEnum(EnumRequestMethod)
    requestMethod?: EnumRequestMethod;

    @IsOptional()
    @IsEnum(WorkingState)
    pollingState?: WorkingState;

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
