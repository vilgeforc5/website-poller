import { IsEnum, IsInt, IsJSON, IsOptional } from "class-validator";
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

    @IsJSON()
    @IsOptional()
    headers?: string;
}
