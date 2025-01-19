import { SiteWithPolls } from "backend/src/prisma/prisma.types";
import { DataTable } from "mantine-datatable";
import { Group, Stack } from "@mantine/core";

export const SiteTable = ({ sites }: TSiteTableProps) => {
    return (
        <DataTable
            columns={[
                { accessor: "address", title: "Адрес" },
                { accessor: "id", title: "Id" },
            ]}
            records={sites}
            emptyState={<></>}
            rowExpansion={{
                content: ({ record }) => (
                    <Stack p="xs" gap={6}>
                        <Group gap={6}>
                            <div>Postal address:</div>
                            <div>{record.address}</div>
                        </Group>
                    </Stack>
                ),
            }}
        />
    );
};

type TSiteTableProps = {
    sites: SiteWithPolls[];
};
