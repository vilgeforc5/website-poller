import StatsCard from "@/components/StatsCard/StatsCard";
import { serverFetch } from "@/lib/api";

interface ISiteInfo {
    count: number;
    diff: number;
    createdAt: Date;
}

export const SiteInfoCard = async () => {
    const latestInfo = await serverFetch<ISiteInfo>("/site/latest-info");
    const changeDate = new Date(latestInfo.createdAt);

    return (
        <StatsCard
            data={{
                title: "Всего сайтов",
                value: latestInfo.count.toString(),
                diff: latestInfo.diff,
                description: !isNaN(changeDate.getTime())
                    ? `Последнее изменение: ${changeDate.toLocaleString()}`
                    : undefined,
            }}
        />
    );
};
