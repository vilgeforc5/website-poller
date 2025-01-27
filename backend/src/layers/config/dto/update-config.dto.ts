import { IsEnum, IsInt, IsOptional } from "class-validator";
import { EnumRequestMethod } from "@prisma/client";

export class UpdateConfigDto {
    @IsInt()
    @IsOptional()
    retryCount?: number;

    @IsInt()
    @IsOptional()
    pollPerDay?: number;

    @IsInt()
    @IsOptional()
    parsePerDay?: number;

    @IsInt()
    @IsOptional()
    parallelSitesCount?: number;

    @IsEnum(EnumRequestMethod)
    @IsOptional()
    requestMethod?: EnumRequestMethod;

    @IsOptional()
    headers?: string;
}
