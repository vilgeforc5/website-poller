import { IsNumber } from "class-validator";

export class DeleteDataSourceTableDto {
    @IsNumber()
    tableId: number;
}
