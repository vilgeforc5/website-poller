import StatsCard from "@/components/StatsCard/StatsCard";
import { serverFetch } from "@/lib/serverFetch";

interface IPollingInfo {
    count: number;
    lastDate?: Date;
}

export const PollingCard = async () => {
    const { data } = await serverFetch<IPollingInfo>(
        "/polling-task/latest-info",
    );
    const changeDate = new Date(data?.lastDate || "");

    return (
        <StatsCard
            // data={{
            //     title: "Количество опросов за сегодня",
            //     value: data.count.toString(),
            //     description: !isNaN(changeDate.getTime())
            //         ? `Последний опрос: ${changeDate.toLocaleString()}`
            //         : undefined,
            // }}
            data={{
                title: "Количество опросов за сегодня",
                value: "3",
                description: "Последний опрос: 02:10",
            }}
        />
    );
};
