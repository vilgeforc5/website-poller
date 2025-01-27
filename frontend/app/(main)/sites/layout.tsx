import { ReactNode } from "react";
import { SiteStoreProvider } from "@/store/store/site/site-store-provider";
import { PageTitle } from "@/components/PageTitle/PageTitle";
import { revalidateTag } from "next/cache";
import { revalidationKeys } from "@/lib/revalidationKeys";
import { Group } from "@mantine/core";
import { StartPollButtonWrapper } from "@/components/ActionButton/StartPollButtonWrapper";
import { StartPollModal } from "@/components/Modals/Site/StartPollModal";
import { serverFetch } from "@/lib/serverFetch";
import { IPollingTaskLatestInfo } from "backend/dist/layers/polling-task/polling-task.types";
import { LocalTime } from "@/components/LocalTime/LocalTime";

export default async function SitesLayout({
    children,
    table,
}: {
    children: ReactNode;
    table: ReactNode;
}) {
    const { data } = await serverFetch<IPollingTaskLatestInfo>(
        "/polling-task/latest-info",
    );
    const lastTime = data.lastTaskTime;

    return (
        <SiteStoreProvider>
            <StartPollModal />
            <Group justify="space-between" align="center">
                <PageTitle
                    mb="xl"
                    title="Cайты"
                    description={
                        lastTime && (
                            <LocalTime date={lastTime}>
                                Последнее обновление в{" "}
                            </LocalTime>
                        )
                    }
                    refresh={async () => {
                        "use server";

                        revalidateTag(revalidationKeys["sites"]);
                    }}
                />
                <StartPollButtonWrapper />
            </Group>
            {table}
            {children}
        </SiteStoreProvider>
    );
}
