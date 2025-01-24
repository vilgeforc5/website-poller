import StatsCard from "../StatsCard";
import { serverFetch } from "@/lib/serverFetch";
import { routeLinks } from "@/utils/route";
import { IDataSourceTableTaskLatestInfo } from "backend/src/layers/data-source-table-task/data-source-table-task.types";

export const ParsingCard = async () => {
    const {
        data: { count, lastTaskTime },
    } = await serverFetch<IDataSourceTableTaskLatestInfo>(
        "/data-source-table-task/latest-info",
    );

    return (
        <StatsCard
            title="Парсингов таблиц"
            period="За сегодня"
            value={count}
            description={
                lastTaskTime
                    ? `Последний парсинг: ${new Date(lastTaskTime).toLocaleString()}`
                    : undefined
            }
            link={routeLinks.tables}
        />
    );
};
