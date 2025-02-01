import { cookies } from "next/headers";
import { parseJwt } from "@/lib/auth";

export const getTokenValues = async () => {
    const headersList = await cookies();
    const token = headersList.get("token");

    return parseJwt(token?.value || "");
};

export const isUserAdmin = async () => {
    const encrypted = await getTokenValues();
    const role = encrypted?.role;

    return role === "ADMIN" || role === "OWNER";
};
