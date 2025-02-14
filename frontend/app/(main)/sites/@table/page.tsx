import { Stack } from "@mantine/core";
import { SiteTable } from "@/components/SiteTable/SiteTable";
import { AddSiteForm } from "@/components/Forms/AddSiteForm";
import { createSitesAction } from "@/lib/actions/site/createSiteAction";

export default async function SitesTablePage({
    searchParams,
}: {
    searchParams: Promise<{
        sitesPerPage?: string;
        page?: string;
        codes?: string;
    }>;
}) {
    const params = await searchParams;

    return (
        <Stack>
            <SiteTable
                sitesPerPage={params.sitesPerPage}
                page={params.page}
                codes={params.codes}
            />
            <AddSiteForm onSubmitAction={createSitesAction} />
        </Stack>
    );
}
