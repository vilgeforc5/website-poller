import StatsCard from "@/components/StatsCard/StatsCard";
import { serverFetch } from "@/lib/serverFetch";
import { IPollingTaskLatestInfo } from "backend/src/layers/polling-task/polling-task.types";

export const PollingCard = async () => {
    const { data } = await serverFetch<IPollingTaskLatestInfo>(
        "/polling-task/latest-info",
    );
    const lastTime = data.lastTaskTime;

    return (
        <StatsCard
            data={{
                title: "Количество опросов за сегодня",
                value: data.count,
                description: lastTime
                    ? `Последний опрос: ${new Date(lastTime).toLocaleDateString()}`
                    : undefined,
            }}
        />
    );
};
