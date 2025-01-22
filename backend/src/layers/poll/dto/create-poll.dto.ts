import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { $Enums, EnumRequestMethod } from "@prisma/client";

export class CreatePollDto {
    @IsInt()
    siteId: number;

    @IsInt()
    pollingTaskId: number;

    @IsString()
    statusCode: number;

    @IsString()
    @IsOptional()
    retryCount?: number;

    @IsEnum(EnumRequestMethod)
    requestMethod: $Enums.EnumRequestMethod;
}
