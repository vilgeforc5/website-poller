import StatsCard from "@/components/StatsCard/StatsCard";
import { serverFetch } from "@/lib/serverFetch";
import { IPollLatestInfo } from "backend/src/layers/poll/poll.types";

export const PollsCard = async () => {
    const { data } = await serverFetch<IPollLatestInfo>("/poll/latest-info");

    return (
        <StatsCard
            title="Позитивных статус кодов"
            value={`${data.positiveCodePercent.toFixed(2)}%`}
            diff={data.diffFromYesterday}
            description="За сегодня"
        />
    );
};
