"use server";
import { serverFetch } from "@/lib/serverFetch";
import { revalidateTag } from "next/cache";
import { revalidationKeys } from "@/lib/revalidationKeys";

export const createSitesAction = async (urls: string[]) => {
    const { ok } = await serverFetch("/site/create-many", {
        method: "POST",
        body: JSON.stringify(urls.map((address) => ({ address }))),
    });

    if (ok) {
        revalidateTag(revalidationKeys["sites"]);
    }

    return ok;
};
