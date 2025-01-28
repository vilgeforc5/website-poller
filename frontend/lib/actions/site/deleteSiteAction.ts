"use server";

import { serverFetch } from "@/lib/serverFetch";
import { revalidateTag } from "next/cache";
import { revalidationKeys } from "@/lib/revalidationKeys";

export const deleteSiteAction = async (siteId: number) => {
    const res = await serverFetch("/site/" + siteId, { method: "DELETE" });

    revalidateTag(revalidationKeys.sites);

    return res;
};
