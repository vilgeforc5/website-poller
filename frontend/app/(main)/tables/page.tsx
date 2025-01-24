import { Stack, Title } from "@mantine/core";
import { serverFetch } from "@/lib/serverFetch";
import { AddParsingTableForm } from "@/components/Forms/AddParsingTableForm";
import { revalidationKeys } from "@/lib/revalidationKeys";
import { revalidateTag } from "next/cache";
import { IDataSourceTableInfo } from "backend/src/layers/data-source-table/data-source-table.types";
import { ParseTable } from "@/components/ParseTable/ParseTable";

export default async function TablesPage() {
    const tables = await serverFetch<IDataSourceTableInfo[]>(
        "/data-source-table/info",
        {
            next: { tags: [revalidationKeys["parsing-tables"]] },
        },
    );

    const onAddUrlsSubmit = async (urls: string[]) => {
        "use server";
        const { ok } = await serverFetch("/data-source-table/createMany", {
            method: "POST",
            body: JSON.stringify(urls.map((url) => ({ url }))),
        });

        if (ok) {
            revalidateTag(revalidationKeys["parsing-tables"]);
        }

        return ok;
    };

    return (
        <Stack gap="xl">
            <Title order={2}>Таблицы для парсинга</Title>
            <ParseTable tables={tables.data} />
            <AddParsingTableForm onSubmitAction={onAddUrlsSubmit} />
        </Stack>
    );
}
