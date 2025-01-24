import {
    Stack,
    Table,
    TableTbody,
    TableTd,
    TableTh,
    TableThead,
    TableTr,
    Text,
    Title,
    Tooltip,
} from "@mantine/core";
import { serverFetch } from "@/lib/serverFetch";
import { SiteSourceTableForm } from "@/components/Forms/SiteSourceTableForm/SiteSourceTableForm";
import { revalidationKeys } from "@/lib/revalidationKeys";
import { revalidateTag } from "next/cache";
import { IDataSourceTableInfo } from "backend/src/layers/data-source-table/data-source-table.types";

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
        <Stack>
            <Title>Таблицы для парсинга</Title>
            <Table
                style={{
                    display: "block",
                    overflow: "auto auto",
                    maxHeight: "50vh",
                }}
                withColumnBorders
            >
                <TableThead>
                    <TableTr>
                        <TableTh>Адрес</TableTh>
                        <TableTh>Создана</TableTh>
                        <TableTh>Последний парсинг</TableTh>
                        <TableTh>Кому видна</TableTh>
                    </TableTr>
                </TableThead>
                <TableTbody>
                    {tables.data.map((item) => (
                        <>
                            <TableTr key={item.url}>
                                <TableTd>
                                    <Tooltip
                                        inline
                                        color="gray"
                                        label={item.url}
                                    >
                                        <Text size="sm">{item.url}</Text>
                                    </Tooltip>
                                </TableTd>
                                <TableTd>
                                    {new Date(item.createdAt).toLocaleString()}
                                </TableTd>
                                <TableTd>
                                    {item.lastPolled
                                        ? new Date(
                                              item.lastPolled,
                                          ).toLocaleString()
                                        : "-"}
                                </TableTd>
                                <TableTd>{item.users.join(", ")}</TableTd>
                            </TableTr>
                        </>
                    ))}
                </TableTbody>
            </Table>

            <SiteSourceTableForm onSubmit={onAddUrlsSubmit} />
        </Stack>
    );
}
