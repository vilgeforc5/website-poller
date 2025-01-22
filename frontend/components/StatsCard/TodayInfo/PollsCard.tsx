import StatsCard from "@/components/StatsCard/StatsCard";
import { serverFetch } from "@/lib/api";

interface IPollsInfo {
    todayPositivePercent: number;
    difference: number;
}

export const PollsCard = async () => {
    const data = await serverFetch<IPollsInfo>("/poll/latest-info");

    return (
        <StatsCard
            data={{
                title: "Процент позитивных статус кодов",
                value: `${data.todayPositivePercent.toFixed(2)}%`,
                diff: data.difference,
                description: "За сегодня",
            }}
        />
    );
};
