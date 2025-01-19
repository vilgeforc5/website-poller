import { IsEnum } from "class-validator";
import { EnumRequestMethod } from "@prisma/client";

export class UpdatePollMethodDto {
    @IsEnum(EnumRequestMethod)
    newMethod: EnumRequestMethod;
}
