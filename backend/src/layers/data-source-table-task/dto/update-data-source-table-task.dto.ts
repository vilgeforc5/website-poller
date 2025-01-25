import { IsDate, IsEnum, IsOptional, IsString } from "class-validator";
import { WorkingState } from "@prisma/client";

export class UpdateDataSourceTableTaskDto {
    @IsDate()
    @IsOptional()
    endTime?: string;

    @IsOptional()
    @IsString()
    error?: string;

    @IsOptional()
    @IsEnum(WorkingState)
    workingState?: WorkingState;
}
