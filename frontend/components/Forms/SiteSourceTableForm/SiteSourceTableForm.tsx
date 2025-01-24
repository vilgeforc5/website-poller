"use client";
import { Badge, Button, Group, Stack, TextInput } from "@mantine/core";
import { FormEvent, useRef, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import zod from "zod";
import { getHotkeyHandler } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

interface IAddDataSourceTableFormProps {
    onSubmit: (data: string[]) => Promise<boolean>;
}

export const SiteSourceTableForm = ({
    onSubmit,
}: IAddDataSourceTableFormProps) => {
    const [newUrls, setNewUrls] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const baseInputRef = useRef<HTMLInputElement>(null);

    const onAddUrl = () => {
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

        const ok = await onSubmit(newUrls);

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
        <Stack justify="start" style={{ maxWidth: "400px", marginTop: "1rem" }}>
            <form onSubmit={onSubmitHandler}>
                <TextInput
                    mb="md"
                    ref={baseInputRef}
                    error={error}
                    label="Пример адреса"
                    description="Добавьте новый по кнопке справа или Enter"
                    placeholder="https://google.excel.com/"
                    rightSection={
                        <IconPlus
                            size={24}
                            color={
                                error
                                    ? "var(--mantine-color-red-5)"
                                    : "var(--mantine-color-blue-5)"
                            }
                            onClick={onAddUrl}
                        />
                    }
                    onKeyDown={getHotkeyHandler([["Enter", onAddUrl]])}
                />
                <Stack>
                    {newUrls.map((url) => (
                        <TextInput
                            key={url}
                            disabled={true}
                            value={url}
                            rightSectionWidth={100}
                            rightSection={<Badge color="yellow">Новый</Badge>}
                        />
                    ))}
                </Stack>
                <Group justify="flex-start" mt="md">
                    <Button
                        type="submit"
                        disabled={newUrls.length === 0 || isDisabled}
                    >
                        Загрузить
                    </Button>
                </Group>
            </form>
        </Stack>
    );
};
