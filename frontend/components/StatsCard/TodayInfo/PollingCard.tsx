import StatsCard from "@/components/StatsCard/StatsCard";
import { serverFetch } from "@/lib/serverFetch";
import { IPollingTaskLatestInfo } from "backend/src/layers/polling-task/polling-task.types";
import { LocalTime } from "@/components/LocalTime/LocalTime";

export const PollingCard = async () => {
    const { data } = await serverFetch<IPollingTaskLatestInfo>(
        "/polling-task/latest-info",
    );
    const lastTime = data.lastTaskTime;

    return (
        <StatsCard
            title="Опросов сайтов"
            period="За сегодня"
            value={data.count}
            description={lastTime ? <LocalTime date={lastTime} /> : undefined}
        />
    );
};
