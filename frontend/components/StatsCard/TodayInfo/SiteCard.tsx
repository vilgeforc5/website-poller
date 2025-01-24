import StatsCard from "@/components/StatsCard/StatsCard";
import { serverFetch } from "@/lib/serverFetch";

interface ISiteInfo {
    count: number;
    diff: number;
    createdAt: Date;
}

export const SiteCard = async () => {
    const { data } = await serverFetch<ISiteInfo>("/site/latest-info");
    const changeDate = new Date(data.createdAt);

    return (
        <StatsCard
            data={{
                title: "Всего сайтов",
                value: 50,
                diff: 50,
                description: "Последнее изменение: 01:38",
            }}
            // data={{
            //     title: "Всего сайтов",
            //     value: data.count.toString(),
            //     diff: data.diff,
            //     description: !isNaN(changeDate.getTime())
            //         ? `Последнее изменение: ${changeDate.toLocaleString()}`
            //         : undefined,
            // }}
        />
    );
};
