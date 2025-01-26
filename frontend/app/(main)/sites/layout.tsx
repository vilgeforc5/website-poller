import { ReactNode } from "react";
import { SiteStoreProvider } from "@/store/store/site/site-store-provider";
import { PageTitle } from "@/components/PageTitle/PageTitle";
import { revalidateTag } from "next/cache";
import { revalidationKeys } from "@/lib/revalidationKeys";
import { Group } from "@mantine/core";
import { StartPollButtonWrapper } from "@/components/ActionButton/StartPollButtonWrapper";
import { StartPollModal } from "@/components/Modals/Site/StartPollModal";

export default function SitesLayout({
    children,
    table,
}: {
    children: ReactNode;
    table: ReactNode;
}) {
    return (
        <SiteStoreProvider>
            <StartPollModal />
            <Group justify="space-between" align="center">
                <PageTitle
                    mb="xl"
                    title="Cайты"
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
