import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { $Enums, EnumRequestMethod } from "@prisma/client";

export class CreatePollDto {
    @IsInt()
    siteId: number;

    @IsString()
    statusCode: string;

    @IsString()
    @IsOptional()
    retryCount?: number;

    @IsEnum(EnumRequestMethod)
    requestMethod: $Enums.EnumRequestMethod;
}
