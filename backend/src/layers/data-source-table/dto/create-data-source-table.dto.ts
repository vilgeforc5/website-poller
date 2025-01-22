import { IsNumber, IsString } from "class-validator";

export class CreateDataSourceTableDto {
    @IsString()
    url: string;

    @IsNumber()
    userId: number;
}
