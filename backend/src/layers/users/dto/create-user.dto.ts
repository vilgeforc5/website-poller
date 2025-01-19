import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Role } from "@prisma/client";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    role: Role;
}
