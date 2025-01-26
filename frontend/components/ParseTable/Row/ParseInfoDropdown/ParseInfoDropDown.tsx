import { IDataSourceTableInfo } from "backend/dist/layers/data-source-table/data-source-table.types";
import { ParseInfoDropdownWrapper } from "@/components/ParseTable/Row/ParseInfoDropdown/ParseInfoDropdownWrapper";
import { Badge, Grid, GridCol, Group, ScrollAreaAutosize } from "@mantine/core";

export const ParseInfoDropdown = ({ row }: { row: IDataSourceTableInfo }) => {
    return (
        <ParseInfoDropdownWrapper id={row.id}>
            <GridCol
                span={12}
                style={{
                    background: "var(--mantine-gray-0)",
                }}
            >
                <ScrollAreaAutosize mah="40vh" type="auto" scrollbarSize={8}>
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
                            <GridCol
                                span={2}
                                style={{
                                    borderRight:
                                        "1px solid var(--mantine-color-gray-4)",
                                }}
                            >
                                {new Date(task.startTime).toLocaleString()}
                            </GridCol>
                            <GridCol
                                span={2}
                                style={{
                                    borderRight:
                                        "1px solid var(--mantine-color-gray-4)",
                                }}
                            >
                                {task.updateTrigger === "MANUAL"
                                    ? "Запуск вручную"
                                    : "Запуск по-расписанию"}
                            </GridCol>
                            <GridCol span={8}>
                                <Group gap="sm">
                                    {task.state === "RUNNING" && (
                                        <Badge
                                            size="lg"
                                            radius="sm"
                                            variant="filled"
                                            color="blue"
                                        >
                                            Парсинг в процессе
                                        </Badge>
                                    )}
                                    {task.error && (
                                        <Badge
                                            size="lg"
                                            radius="sm"
                                            variant="filled"
                                            color="red"
                                        >
                                            {task.error}
                                        </Badge>
                                    )}
                                    {task.addedSites.length === 0 && (
                                        <Badge
                                            size="lg"
                                            radius="sm"
                                            variant="filled"
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
                </ScrollAreaAutosize>
            </GridCol>
        </ParseInfoDropdownWrapper>
    );
};
