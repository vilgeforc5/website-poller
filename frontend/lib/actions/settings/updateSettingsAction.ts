"use server";
import { serverFetch } from "@/lib/serverFetch";
import { revalidateTag } from "next/cache";
import { revalidationKeys } from "@/lib/revalidationKeys";
import { UpdateConfigDto } from "backend/dist/layers/config/dto/update-config.dto";

export const updateSettingsAction = async (newValues: UpdateConfigDto) => {
    const { ok } = await serverFetch("/config/update", {
        method: "POST",
        body: JSON.stringify(newValues),
    });

    if (ok) {
        revalidateTag(revalidationKeys.settings);
    }

    return ok;
};
