import { Skeleton, Stack } from "@mantine/core";
import { AddParsingTableForm } from "@/components/Forms/AddParsingTableForm";
import { ParseTable } from "@/components/ParseTable/ParseTable";
import { creatDataSourceTablesAction } from "@/lib/actions/data-source-table/creatDataSourceTablesAction";
import { Suspense } from "react";

export default async function TablesPage() {
    return (
        <Stack gap="xl">
            <Suspense fallback={<Skeleton h={200} />}>
                <ParseTable />
            </Suspense>
            <AddParsingTableForm onSubmitAction={creatDataSourceTablesAction} />
        </Stack>
    );
}
