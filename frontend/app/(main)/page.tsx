import { SimpleGrid, Stack, Title } from "@mantine/core";
import StatsCard from "@/components/StatsCard/StatsCard";
import MobileDesktopChart from "@/components/CodesChart/CodesChart";

export default function Home() {
    return (
        <Stack>
            <Title>Главная</Title>
            <SimpleGrid cols={{ base: 1, lg: 2 }}>
                <SimpleGrid cols={2}>
                    <StatsCard
                        data={{
                            title: "Всего сайтов",
                            value: "111",
                            diff: 1,
                            description: "Последнее изменение: вчера",
                        }}
                    />
                    <StatsCard
                        data={{
                            title: "Процент позитивных статус кодов",
                            value: "90%",
                        }}
                    />
                    <StatsCard
                        data={{
                            title: "Количество опросов за сегодня",
                            value: "3",
                            description: "Последний опрос: сегодня",
                        }}
                    />
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
