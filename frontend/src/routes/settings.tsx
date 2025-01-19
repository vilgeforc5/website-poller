import { Box, Button, Table, Title } from "@mantine/core";
import { useAppState } from "@/api/useAppState.ts";
import { usePollMutation } from "@/api/usePollMutation.ts";

export default function Settings() {
    const state = useAppState();
    const mutate = usePollMutation(
        () => {},
        () => {},
        () => {},
    );

    if (!state) {
        return null;
    }

    const isIdle = state.pollingState === "IDLE";

    return (
        <Box>
            <Title>Настройки</Title>
            <Table withTableBorder mt="sm" mb="sm">
                <Table.Thead>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Cостояние</Table.Th>
                            <Table.Th>Метод опрос</Table.Th>
                            <Table.Th>Последний опрос</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>
                                {isIdle ? "Неактивен" : "Активен"}
                            </Table.Td>
                            <Table.Td>{state.requestMethod}</Table.Td>
                            <Table.Td>
                                {new Date(
                                    state.lastPollTime,
                                ).toLocaleTimeString()}
                            </Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table.Thead>
            </Table>
            <Button
                color="orange"
                mt="6"
                disabled={!isIdle}
                onClick={() => mutate()}
            >
                Начать опрос сайтов
            </Button>
        </Box>
    );
}
