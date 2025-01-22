import { IsDate, IsEnum, IsInt, IsOptional } from "class-validator";
import { UpdateTrigger } from "@prisma/client";

export class UpdateDataSourceTableDto {
    @IsInt()
    id: number;

    @IsOptional()
    @IsDate()
    lastFetched?: string;

    @IsOptional()
    @IsEnum(UpdateTrigger)
    updateTrigger?: UpdateTrigger;
}
