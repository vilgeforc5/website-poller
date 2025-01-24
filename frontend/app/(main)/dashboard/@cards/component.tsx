import { SiteCard } from "@/components/StatsCard/TodayInfo/SiteCard";
import { PollsCard } from "@/components/StatsCard/TodayInfo/PollsCard";
import { PollingCard } from "@/components/StatsCard/TodayInfo/PollingCard";
import { Suspense } from "react";
import { SimpleGrid, Skeleton } from "@mantine/core";
import { ParsingCard } from "@/components/StatsCard/TodayInfo/ParsingCard";

export default function CardsComponent() {
    return (
        <SimpleGrid cols={2}>
            <Suspense fallback={<Skeleton radius="md" />}>
                <SiteCard />
            </Suspense>
            <Suspense fallback={<Skeleton radius="md" />}>
                <PollsCard />
            </Suspense>
            <Suspense fallback={<Skeleton radius="md" />}>
                <PollingCard />
            </Suspense>
            <Suspense>
                <ParsingCard />
            </Suspense>
        </SimpleGrid>
    );
}
