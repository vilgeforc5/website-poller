import StatsCard from "@/components/StatsCard/StatsCard";
import { serverFetch } from "@/lib/serverFetch";
import { ISiteLatestInfo } from "backend/src/layers/site/site.types";

export const SiteCard = async () => {
    const { data } = await serverFetch<ISiteLatestInfo>("/site/latest-info");
    const lastCreatedTime = data.lastCreatedTime;

    return (
        <StatsCard
            title="Сайты"
            period="За все время"
            description={
                lastCreatedTime
                    ? `Последнее изменение: ${new Date(lastCreatedTime).toLocaleString()}`
                    : undefined
            }
            diff={data.diffFromYesterday}
            value={data.count}
        />
    );
};
