import { IDataSourceTableInfo } from "backend/dist/layers/data-source-table/data-source-table.types";
import { WithRowContext } from "@/components/ParseTable/Row/RowContext";
import {
    Anchor,
    Badge,
    Grid,
    GridCol,
    Group,
    List,
    ListItem,
    Text,
} from "@mantine/core";
import { RowControls } from "@/components/ParseTable/Row/RowControls";
import { RowDropDown } from "@/components/ParseTable/Row/RowDropDown";

export const Row = ({ row }: { row: IDataSourceTableInfo }) => {
    const lastPolled = row.lastPolled;

    return (
        <WithRowContext shouldBeDisabled={!row.parsingTasks.length}>
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
                        <RowControls />
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
                        <Text>{new Date(row.createdAt).toLocaleString()}</Text>
                    </GridCol>
                    <GridCol span={2}>
                        {lastPolled
                            ? new Date(lastPolled).toLocaleString()
                            : "-"}
                    </GridCol>
                    <GridCol span={2}>
                        <List type="unordered" icon={""}>
                            {row.users.map((user) => (
                                <ListItem key={user}>{user}</ListItem>
                            ))}
                        </List>
                    </GridCol>
                </Grid>
                <RowDropDown>
                    <GridCol
                        span={12}
                        style={{ maxHeight: "50vh", overflowY: "auto" }}
                    >
                        {row.parsingTasks.map((task) => (
                            <Grid
                                style={{
                                    borderTop:
                                        "1px solid var(--mantine-color-gray-4)",
                                    padding:
                                        "var(--mantine-spacing-sm) var(--mantine-spacing-lg) var(--mantine-spacing-sm) 0",
                                }}
                                key={task.id}
                            >
                                <GridCol span={2}>
                                    {new Date(task.startTime).toLocaleString()}
                                </GridCol>
                                <GridCol span={10}>
                                    <Group gap="sm">
                                        {task.addedSites.length === 0 && (
                                            <Badge
                                                size="lg"
                                                radius="sm"
                                                variant="outline"
                                                color="orange"
                                            >
                                                Сайтов не добавилось
                                            </Badge>
                                        )}
                                        {task.addedSites.map((site) => (
                                            <Badge
                                                size="lg"
                                                radius="sm"
                                                variant="outline"
                                                key={site}
                                            >
                                                {site}
                                            </Badge>
                                        ))}
                                    </Group>
                                </GridCol>
                            </Grid>
                        ))}
                    </GridCol>
                </RowDropDown>
            </Grid>
        </WithRowContext>
    );
};
