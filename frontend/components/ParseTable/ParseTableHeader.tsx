import { Box, Grid, GridCol, Text } from "@mantine/core";

export const ParseTableHeader = () => {
    return (
        <GridCol
            style={{ borderBottom: "1px solid var(--mantine-color-gray-4)" }}
            component={Grid}
            span={12}
        >
            <GridCol span={1}>
                <Box w="xl" />
            </GridCol>
            <GridCol span={5}>
                <ParseTableHeaderText>Адрес</ParseTableHeaderText>
            </GridCol>
            <GridCol span={2}>
                <ParseTableHeaderText>Создана</ParseTableHeaderText>
            </GridCol>
            <GridCol span={2}>
                <ParseTableHeaderText>Последний опрос</ParseTableHeaderText>
            </GridCol>
            <GridCol span={2}>
                <ParseTableHeaderText>Пользователи</ParseTableHeaderText>
            </GridCol>
        </GridCol>
    );
};

const ParseTableHeaderText = ({ children }: { children: React.ReactNode }) => (
    <Text size="lg" fw="bold">
        {children}
    </Text>
);
