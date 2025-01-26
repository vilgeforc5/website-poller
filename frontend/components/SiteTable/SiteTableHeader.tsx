import { Box, Grid, GridCol, Text } from "@mantine/core";

export const SiteTableHeader = () => {
    return (
        <GridCol
            style={{ borderBottom: "1px solid var(--mantine-color-gray-4)" }}
            component={Grid}
            span={12}
        >
            <GridCol span={1}>
                <Box w="xl" />
            </GridCol>
            <GridCol span={7}>
                <ParseTableHeaderText>Адрес</ParseTableHeaderText>
            </GridCol>
            <GridCol span={2}>
                <ParseTableHeaderText>Создан</ParseTableHeaderText>
            </GridCol>
            <GridCol span={2}>
                <ParseTableHeaderText>Последний код</ParseTableHeaderText>
            </GridCol>
        </GridCol>
    );
};

const ParseTableHeaderText = ({ children }: { children: React.ReactNode }) => (
    <Text size="md" fw="bold">
        {children}
    </Text>
);
