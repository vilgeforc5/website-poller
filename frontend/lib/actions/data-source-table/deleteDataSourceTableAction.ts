"use server";

import { serverFetch } from "@/lib/serverFetch";
import { revalidateTag } from "next/cache";
import { revalidationKeys } from "@/lib/revalidationKeys";

export const deleteDataSourceTableAction = async (tableId: number) => {
    const { ok } = await serverFetch("/data-source-table", {
        method: "DELETE",
        body: JSON.stringify({ tableId }),
    });

    if (ok) {
        revalidateTag(revalidationKeys["parsing-tables"]);
    }

    return ok;
};
