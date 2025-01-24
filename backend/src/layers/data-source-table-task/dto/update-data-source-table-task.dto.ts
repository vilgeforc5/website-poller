import { IsDate, IsOptional, IsString } from "class-validator";

export class UpdateDataSourceTableTaskDto {
    @IsDate()
    @IsOptional()
    endTime?: string;

    @IsOptional()
    @IsString()
    error?: string;
}
