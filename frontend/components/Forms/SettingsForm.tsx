"use client";

import { IConfig } from "backend/dist/layers/config/config.types";
import {
    ActionIcon,
    Box,
    Button,
    Chip,
    ChipGroup,
    Flex,
    Group,
    NumberInput,
    Paper,
    Stack,
    Table,
    TableTd,
    TableThead,
    TableTr,
    Text,
    TextInput,
} from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { creatDataSourceTablesAction } from "@/lib/actions/settings/updateSettingsAction";
import { notifications } from "@mantine/notifications";

const removeKey = (thisIsObject: Record<string, any>, targetKey: string) => {
    return Object.keys(thisIsObject)
        .filter((key) => key !== targetKey)
        .reduce((obj, key) => {
            // @ts-ignore
            obj[key] = thisIsObject[key];
            return obj;
        }, {});
};

export const SettingsForm = ({ data }: { data: IConfig }) => {
    const [newHeader, setNewHeader] = useState<{ key: string; value: string }>({
        value: "",
        key: "",
    });

    const form = useForm({
        mode: "controlled",
        initialValues: {
            parallelSitesCount: data.parallelSitesCount,
            retryCount: data.retryCount,
            requestMethod: data.requestMethod,
            headers: (data.headers as Record<string, string>) || {},
        },
        validate: {},
    });

    return (
        <Paper p="md">
            <Form
                form={form}
                onSubmit={async (values) => {
                    form.setSubmitting(true);
                    const result = await creatDataSourceTablesAction({
                        ...values,
                        headers: JSON.stringify(form.values.headers),
                    });

                    if (result) {
                        notifications.show({
                            title: "Настройки обновлены",
                            message: "",
                            color: "green",
                        });
                    } else {
                        notifications.show({
                            title: "Ошибка при обновлении настроек",
                            message: "",
                            color: "red",
                        });
                    }

                    form.setSubmitting(false);
                }}
            >
                <Stack>
                    <NumberInput
                        label="Кол-во параллельно опрашиваемых сайтов"
                        description="используется во время опроса"
                        allowNegative={false}
                        allowDecimal={false}
                        key={form.key("parallelSitesCount")}
                        {...form.getInputProps("parallelSitesCount")}
                    />
                    <NumberInput
                        label="Кол-во повторных попыток"
                        description="используется если сайт вернул не 200"
                        allowNegative={false}
                        allowDecimal={false}
                        key={form.key("retryCount")}
                        {...form.getInputProps("retryCount")}
                    />
                    <ChipGroup
                        onChange={(value) =>
                            form.setFieldValue("requestMethod", value as any)
                        }
                        value={form.values.requestMethod}
                        multiple={false}
                    >
                        <Text size="sm" fw="500">
                            Метод запроса
                        </Text>
                        <Group>
                            <Chip value="GET">GET</Chip>
                            <Chip value="HEAD">HEAD</Chip>
                        </Group>
                    </ChipGroup>
                    <Table>
                        <TableThead>
                            <TableTr>
                                <TableTd>
                                    <Box w="md"></Box>
                                </TableTd>

                                <TableTd>Заголовок</TableTd>
                                <TableTd>Значение</TableTd>
                            </TableTr>
                            {Object.entries(form.values.headers).map(
                                ([key, value]) => (
                                    <TableTr key={key}>
                                        <TableTd>
                                            <Flex
                                                justify="center"
                                                align="center"
                                                w="md"
                                            >
                                                <ActionIcon
                                                    variant="outline"
                                                    color="red"
                                                    size="sm"
                                                    onClick={() => {
                                                        form.setFieldValue(
                                                            "headers",
                                                            removeKey(
                                                                form.values
                                                                    .headers,
                                                                key,
                                                            ),
                                                        );
                                                    }}
                                                >
                                                    <IconTrash />
                                                </ActionIcon>
                                            </Flex>
                                        </TableTd>
                                        <TableTd>{key}</TableTd>
                                        <TableTd>{value}</TableTd>
                                    </TableTr>
                                ),
                            )}
                            <TableTr>
                                <TableTd>
                                    <Flex
                                        justify="center"
                                        align="center"
                                        w="md"
                                    >
                                        <ActionIcon
                                            variant="outline"
                                            color="blue"
                                            size="sm"
                                            onClick={() => {
                                                if (
                                                    !newHeader.key ||
                                                    !newHeader.value
                                                ) {
                                                    return;
                                                }

                                                form.setFieldValue("headers", {
                                                    ...form.values.headers,
                                                    [newHeader.key]:
                                                        newHeader.value,
                                                });

                                                setNewHeader({
                                                    key: "",
                                                    value: "",
                                                });
                                            }}
                                        >
                                            <IconPlus />
                                        </ActionIcon>
                                    </Flex>
                                </TableTd>
                                <TableTd>
                                    <TextInput
                                        value={newHeader.key}
                                        onChange={(e) =>
                                            setNewHeader((p) => ({
                                                ...p,
                                                key: e.target.value,
                                            }))
                                        }
                                    />
                                </TableTd>
                                <TableTd>
                                    <TextInput
                                        value={newHeader.value}
                                        onChange={(e) =>
                                            setNewHeader((p) => ({
                                                ...p,
                                                value: e.target.value,
                                            }))
                                        }
                                    />
                                </TableTd>
                            </TableTr>
                        </TableThead>
                    </Table>
                    <Button
                        disabled={form.submitting}
                        w="fit-content"
                        type="submit"
                        color="green"
                    >
                        Обновить
                    </Button>
                </Stack>
            </Form>
        </Paper>
    );
};
