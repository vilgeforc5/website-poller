import { $Enums } from "@prisma/client";

export type User = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    hash: string;
    hashedRt: string | null;
    role: $Enums.Role;
};
