import StatsCard from "../StatsCard";
import { serverFetch } from "@/lib/serverFetch";
import { routeLinks } from "@/utils/route";
import { IDataSourceTableTaskLatestInfo } from "backend/src/layers/data-source-table-task/data-source-table-task.types";
import { LocalTime } from "@/components/LocalTime/LocalTime";

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
                lastTaskTime ? <LocalTime date={lastTaskTime} /> : undefined
            }
            link={routeLinks.tables}
        />
    );
};
