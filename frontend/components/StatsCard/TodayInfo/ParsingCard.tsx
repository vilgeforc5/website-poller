import StatsCard from "../StatsCard";
import { serverFetch } from "@/lib/serverFetch";

interface ParsingCardData {
    lastTaskTime: string;
    count: number;
}

export const ParsingCard = async () => {
    const { data } = await serverFetch<ParsingCardData>(
        "/data-source-table-task/latest-info",
    );

    const lastTime = new Date(data?.lastTaskTime);

    return (
        <StatsCard
            data={{
                title: "Количество парсингов таблиц за сегодня",
                value: data?.count.toString(),
                description: !isNaN(lastTime.getTime())
                    ? `Последний парсинг: ${lastTime.toLocaleString()}`
                    : undefined,
            }}
        />
    );
};
