import { ReactNode } from "react";
import { SimpleGrid, Stack, Title } from "@mantine/core";
import "@mantine/charts/styles.css";

export default function DashboardLayout({
    children,
    cards,
    codeChart,
}: {
    children: ReactNode;
    cards: ReactNode;
    codeChart: ReactNode;
}) {
    return (
        <Stack>
            <Title>Главная</Title>
            <SimpleGrid cols={{ base: 1, lg: 2 }}>
                {cards}
                {codeChart}
            </SimpleGrid>
            {children}
        </Stack>
    );
}
