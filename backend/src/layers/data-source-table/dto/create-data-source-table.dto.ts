import { IsString } from "class-validator";

export class CreateDataSourceTableDto {
    @IsString()
    url: string;
}
