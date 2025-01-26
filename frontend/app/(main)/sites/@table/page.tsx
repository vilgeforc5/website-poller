import { Stack } from "@mantine/core";
import { SiteTable } from "@/components/SiteTable/SiteTable";
import { PageTitle } from "@/components/PageTitle/PageTitle";
import { revalidateTag } from "next/cache";
import { revalidationKeys } from "@/lib/revalidationKeys";
import { AddSiteForm } from "@/components/Forms/AddSiteForm";
import { createSitesAction } from "@/lib/actions/site/createSiteAction";

export default async function SitesTablePage({
    searchParams,
}: {
    searchParams: Promise<{ sitesPerPage?: string; page?: string }>;
}) {
    const params = await searchParams;

    return (
        <Stack>
            <PageTitle
                title="Cайты"
                refresh={async () => {
                    "use server";

                    revalidateTag(revalidationKeys["sites"]);
                }}
            />
            <SiteTable sitesPerPage={params.sitesPerPage} page={params.page} />
            <AddSiteForm onSubmitAction={createSitesAction} />
        </Stack>
    );
}
