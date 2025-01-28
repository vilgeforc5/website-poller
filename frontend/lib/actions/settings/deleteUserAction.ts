"use server";
import { serverFetch } from "@/lib/serverFetch";
import { revalidatePath } from "next/cache";
import { revalidationKeys } from "@/lib/revalidationKeys";

export const deleteUserAction = async (userId: number) => {
    const { ok } = await serverFetch("/users/" + userId, {
        method: "DELETE",
    });

    revalidatePath(revalidationKeys.settings);

    return ok;
};
