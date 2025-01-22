import { IsNumber, IsOptional, IsUrl } from "class-validator";

export class CreateSiteDto {
    @IsUrl()
    address: string;

    @IsOptional()
    @IsNumber()
    dataSourceTableId?: number;
}
