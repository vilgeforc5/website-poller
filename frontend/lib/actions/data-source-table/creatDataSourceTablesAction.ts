"use server";
import { serverFetch } from "@/lib/serverFetch";
import { revalidateTag } from "next/cache";
import { revalidationKeys } from "@/lib/revalidationKeys";

export const creatDataSourceTablesAction = async (urls: string[]) => {
    const { ok } = await serverFetch("/data-source-table/createMany", {
        method: "POST",
        body: JSON.stringify(urls.map((url) => ({ url }))),
    });

    if (ok) {
        revalidateTag(revalidationKeys["parsing-tables"]);
    }

    return ok;
};
