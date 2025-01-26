"use client";
import {
    Badge,
    Button,
    Group,
    Paper,
    Stack,
    TextInput,
    TextInputProps,
} from "@mantine/core";
import { FormEvent, useRef, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import zod from "zod";
import { getHotkeyHandler } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

interface IAddUrlListFormProps extends TextInputProps {
    onSubmitAction: (data: string[]) => Promise<boolean>;
}

export const AddUrlListForm = ({
    onSubmitAction,
    ...inputProps
}: IAddUrlListFormProps) => {
    const [newUrls, setNewUrls] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const baseInputRef = useRef<HTMLInputElement>(null);

    const onManualAddUrl = () => {
        const input = baseInputRef.current;
        if (!input) return;

        const value = input.value;
        const { success } = zod.string().url().safeParse(value);

        if (!success) {
            setError("Невалидный адрес");
            return;
        } else {
            setError("");
            setNewUrls((urls) => [...new Set([...urls, value])]);
            input.value = "";
        }
    };

    const onSubmitHandler = async (e: FormEvent) => {
        e.preventDefault();
        setIsDisabled(true);

        const ok = await onSubmitAction(newUrls);

        const notificationInfo = ok
            ? {
                  title: "Адреса успешно добавлены",
                  color: "green",
              }
            : {
                  title: "Ошибка при добавлении адресов",
                  color: "red",
              };

        notifications.show({ ...notificationInfo, message: "" });
        setIsDisabled(false);
        setNewUrls([]);
    };

    return (
        <Paper
            shadow="sm"
            p="sm"
            radius="sm"
            component={Stack}
            justify="start"
            style={{ maxWidth: "400px", marginTop: "1rem" }}
        >
            <form onSubmit={onSubmitHandler}>
                <TextInput
                    mb="md"
                    ref={baseInputRef}
                    error={error}
                    size="md"
                    rightSection={
                        <IconPlus
                            size={24}
                            color={
                                error
                                    ? "var(--mantine-color-red-5)"
                                    : "var(--mantine-color-blue-5)"
                            }
                            onClick={onManualAddUrl}
                        />
                    }
                    onKeyDown={getHotkeyHandler([["Enter", onManualAddUrl]])}
                    {...inputProps}
                />
                <Stack>
                    {newUrls.map((url) => (
                        <TextInput
                            key={url}
                            disabled={true}
                            value={url}
                            rightSectionWidth={100}
                            rightSection={<Badge color="blue.4">Новый</Badge>}
                        />
                    ))}
                </Stack>
                <Group justify="flex-start" mt="md">
                    <Button
                        type="submit"
                        size="md"
                        disabled={newUrls.length === 0 || isDisabled}
                    >
                        Добавить
                    </Button>
                </Group>
            </form>
        </Paper>
    );
};
