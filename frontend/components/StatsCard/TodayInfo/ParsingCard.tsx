import StatsCard from "../StatsCard";
import { serverFetch } from "@/lib/serverFetch";
import { IDataSourceTableTaskLatestInfo } from "backend/src/layers/data-source-table-task/data-source-table-task.types";

export const ParsingCard = async () => {
    const {
        data: { count, lastTaskTime },
    } = await serverFetch<IDataSourceTableTaskLatestInfo>(
        "/data-source-table-task/latest-info",
    );

    return (
        <StatsCard
            data={{
                title: "Количество парсингов таблиц за сегодня",
                value: count,
                description: lastTaskTime
                    ? `Последний парсинг: ${new Date(lastTaskTime).toLocaleString()}`
                    : undefined,
            }}
        />
    );
};
