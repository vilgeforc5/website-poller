import StatsCard from "@/components/StatsCard/StatsCard";
import { serverFetch } from "@/lib/api";

interface IPollingInfo {
    count: number;
    lastDate?: Date;
}

export const PollingInfoCard = async () => {
    const result = await serverFetch<IPollingInfo>("/polling-task/latest-info");
    const changeDate = new Date(result?.lastDate || "");

    return (
        <StatsCard
            data={{
                title: "Количество опросов за сегодня",
                value: result.count.toString(),
                description: !isNaN(changeDate.getTime())
                    ? `Последний опрос: ${changeDate.toLocaleString()}`
                    : undefined,
            }}
        />
    );
};
