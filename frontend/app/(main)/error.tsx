"use client";

import { Button, Stack, Text, Title } from "@mantine/core";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <Stack justify="center" align="center" flex={1}>
            <Title style={{ color: "red" }}>
                Произошла критическая ошибка 😭
            </Title>
            <Text>{error.message}</Text>
            <Button onClick={reset}>Перезагрузиться</Button>
        </Stack>
    );
}
