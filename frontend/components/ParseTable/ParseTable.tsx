import { IDataSourceTableInfo } from "backend/src/layers/data-source-table/data-source-table.types";
import { Grid, Paper } from "@mantine/core";
import { ParseTableHeader } from "@/components/ParseTable/ParseTableHeader";
import { Row } from "@/components/ParseTable/Row/Row";
import { serverFetch } from "@/lib/serverFetch";
import { revalidationKeys } from "@/lib/revalidationKeys";

export const ParseTable = async () => {
    const { data } = await serverFetch<IDataSourceTableInfo[]>(
        "/data-source-table/info",
        {
            next: { tags: [revalidationKeys["parsing-tables"]] },
        },
    );

    return (
        <Paper shadow="sm" p="sm" component={Grid}>
            <ParseTableHeader />
            {data.map((table) => (
                <Row key={table.url} row={table} />
            ))}
        </Paper>
    );
};
