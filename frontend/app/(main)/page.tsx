import { SimpleGrid, Stack, Title } from "@mantine/core";
import StatsCard from "@/components/StatsCard/StatsCard";
import MobileDesktopChart from "@/components/CodesChart/CodesChart";
import { SiteInfoCard } from "@/components/StatsCard/Info/SiteInfoCard";
import { PollingInfoCard } from "@/components/StatsCard/Info/PollingInfoCard";

export default async function Home() {
    return (
        <Stack>
            <Title>Главная</Title>
            <SimpleGrid cols={{ base: 1, lg: 2 }}>
                <SimpleGrid cols={2}>
                    <SiteInfoCard />
                    <StatsCard
                        data={{
                            title: "Процент позитивных статус кодов",
                            value: "90%",
                            description: "За последний день",
                        }}
                    />
                    <PollingInfoCard />
                    <StatsCard
                        data={{
                            title: "Telegram статус",
                            value: "Отправлен",
                            description: "Телегарм сообщение",
                        }}
                    />
                </SimpleGrid>
                <MobileDesktopChart />
            </SimpleGrid>
        </Stack>
    );
}
