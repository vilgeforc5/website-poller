import { IDataSourceTableInfo } from "backend/dist/layers/data-source-table/data-source-table.types";
import { Anchor, Grid, GridCol, List, ListItem, Text } from "@mantine/core";
import { RowControls } from "@/components/ParseTable/Row/RowControls";
import { ParseInfoDropdown } from "@/components/ParseTable/Row/ParseInfoDropdown/ParseInfoDropDown";
import { isUserAdmin } from "@/lib/serverJwtValues";
import { LocalTime } from "@/components/LocalTime/LocalTime";

export const Row = async ({ row }: { row: IDataSourceTableInfo }) => {
    const lastPolled = row.lastPolled;
    const isAdmin = await isUserAdmin();

    return (
        <Grid
            style={{
                borderBottom: "1px solid var(--mantine-color-gray-4)",
            }}
            component={GridCol}
            key={row.url}
            // @ts-expect-error
            span={12}
        >
            {/* @ts-expect-error */}
            <Grid component={GridCol} align="center" span={12}>
                <GridCol span={1}>
                    <RowControls
                        disableDropDown={row.parsingTasks.length === 0}
                        id={row.id}
                    />
                </GridCol>
                <GridCol span={5}>
                    <Text
                        style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        <Anchor href={row.url} target="_blank">
                            {row.url}
                        </Anchor>
                    </Text>
                </GridCol>
                <GridCol span={2}>
                    <Text>
                        <LocalTime date={row.createdAt} />
                    </Text>
                </GridCol>
                <GridCol span={2}>
                    {lastPolled ? <LocalTime date={lastPolled} /> : "-"}
                </GridCol>
                {isAdmin && (
                    <GridCol span={2}>
                        <List type="unordered" icon={""}>
                            {row.users.map((user) => (
                                <ListItem key={user}>{user}</ListItem>
                            ))}
                        </List>
                    </GridCol>
                )}
            </Grid>
            <ParseInfoDropdown row={row} />
        </Grid>
    );
};
