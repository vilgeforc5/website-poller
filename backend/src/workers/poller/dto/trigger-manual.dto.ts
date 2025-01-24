import { IsEnum, IsInt, IsOptional } from "class-validator";
import { EnumRequestMethod } from "@prisma/client";

export class TriggerManualPollDto {
    @IsOptional()
    @IsEnum(EnumRequestMethod)
    method?: EnumRequestMethod;

    @IsOptional()
    @IsInt()
    parallelProcessCount?: number;
}
