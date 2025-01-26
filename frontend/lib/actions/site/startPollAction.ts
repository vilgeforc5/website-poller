"use server";

import { serverFetch } from "@/lib/serverFetch";
import { revalidateTag } from "next/cache";
import { revalidationKeys } from "@/lib/revalidationKeys";

export const startPollAction = async () => {
    const { ok } = await serverFetch("/poller/trigger", { method: "POST" });

    if (ok) {
        revalidateTag(revalidationKeys["sites"]);
    }

    return ok;
};
