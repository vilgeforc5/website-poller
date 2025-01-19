import { Role } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AuthDto {
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
