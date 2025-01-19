import { IsDate, IsEnum, IsOptional, IsString } from "class-validator";
import { $Enums, EnumRequestMethod } from "@prisma/client";

export class CreatePollDto {
    @IsString()
    siteId: string;

    @IsString()
    statusCode: string;

    @IsString()
    @IsOptional()
    retryCount?: number;

    @IsEnum(EnumRequestMethod)
    requestMethod: $Enums.EnumRequestMethod;
}
