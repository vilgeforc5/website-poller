"use server";
import { serverFetch } from "@/lib/serverFetch";
import { revalidateTag } from "next/cache";
import { revalidationKeys } from "@/lib/revalidationKeys";

export const reparseDataSourceTableAction = async (tableId: number) => {
    const { ok } = await serverFetch(
        "/data-source-table-parser/trigger/" + tableId,
        {
            method: "POST",
        },
    );

    if (ok) {
        revalidateTag(revalidationKeys["parsing-tables"]);
    }

    return ok;
};
