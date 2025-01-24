import { IsEnum, IsInt } from "class-validator";
import { UpdateTrigger } from "@prisma/client";

export class CreateDataSourceTableTaskDto {
    @IsInt()
    dataSourceTableId: number;

    @IsEnum(UpdateTrigger)
    updateTrigger: UpdateTrigger;
}
