import { Box, Grid, GridCol, Text } from "@mantine/core";
import { isUserAdmin } from "@/lib/jwtUtils";

export const SiteTableHeader = async () => {
    const isAdmin = await isUserAdmin();

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
                <ParseTableHeaderText>Создан</ParseTableHeaderText>
            </GridCol>
            <GridCol span={2}>
                <ParseTableHeaderText>Последний код</ParseTableHeaderText>
            </GridCol>
            {isAdmin && (
                <GridCol span={2}>
                    <ParseTableHeaderText>Пользователи</ParseTableHeaderText>
                </GridCol>
            )}
        </GridCol>
    );
};

const ParseTableHeaderText = ({ children }: { children: React.ReactNode }) => (
    <Text size="md" fw="bold">
        {children}
    </Text>
);
