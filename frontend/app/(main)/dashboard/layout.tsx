import { ReactNode } from "react";
import { SimpleGrid, Stack } from "@mantine/core";
import "@mantine/charts/styles.css";
import { PageTitle } from "@/components/PageTitle/PageTitle";
import { revalidatePath } from "next/cache";

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
            <PageTitle
                refresh={async () => {
                    "use server";

                    revalidatePath("/dashboard");
                }}
                title="Главная"
            />
            <SimpleGrid cols={{ base: 1, lg: 2 }}>
                {cards}
                {codeChart}
            </SimpleGrid>
            {children}
        </Stack>
    );
}
