import { $Enums, User } from "@prisma/client";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto implements Partial<User> {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    role?: $Enums.Role;

    @IsOptional()
    @IsString()
    hashedRt?: string;

    @IsOptional()
    @IsString()
    hash?: string;
}
