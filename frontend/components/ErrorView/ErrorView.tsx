import { Blockquote, Button, Stack, Text } from "@mantine/core";

export const ErrorView = ({
    error,
    reset,
    showStack = true,
}: {
    error: Error & { digest?: string };
    reset: () => void;
    showStack?: boolean;
}) => (
    <Blockquote
        style={{ overflow: "hidden" }}
        color="red"
        cite="Ошибка сервера"
    >
        <Stack>
            <Text size="lg"> {error.message}</Text>
            {showStack && (
                <Text
                    size="md"
                    style={{
                        wordWrap: "break-word",
                        maxHeight: "100px",
                        overflowY: "scroll",
                    }}
                >
                    {error.stack}
                </Text>
            )}
            <Button mt="auto" w="max-content" onClick={reset}>
                Перезагрузить
            </Button>
        </Stack>
    </Blockquote>
);
