"use server";
import { ChangePasswordDto } from "backend/dist/auth/dto/change-password.dto";
import { serverFetch } from "@/lib/serverFetch";

export const changePasswordAction = async (dto: ChangePasswordDto) => {
    const { ok } = await serverFetch("/auth/change-password", {
        method: "POST",
        body: JSON.stringify(dto),
    });

    return ok;
};
