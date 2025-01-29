import { Grid, Group } from "@mantine/core";
import { serverFetch } from "@/lib/serverFetch";
import { revalidationKeys } from "@/lib/revalidationKeys";
import { TablePagination } from "@/components/SiteTable/Pagination/TablePagination";
import { SitesPerPageInput } from "@/components/SiteTable/SitesPerPageInput";
import { SiteTableHeader } from "@/components/SiteTable/SiteTableHeader";
import { ISiteInfo } from "backend/dist/layers/site/site.types";
import { SiteTableRow } from "@/components/SiteTable/Row/Row";
import { CodeFilterGroup } from "@/components/CodeFilterGroup/CodeFilterGroup";

const sitesPerPageDefault = 50;

interface ISiteTableProps {
    sitesPerPage?: string;
    page?: string;
    codes?: string;
}

export const SiteTable = async ({
    sitesPerPage,
    page,
    codes,
}: ISiteTableProps) => {
    const siteCountPerPage =
        parseInt(sitesPerPage || `${sitesPerPageDefault}`) ||
        sitesPerPageDefault;
    const pageNum = parseInt(page || "1") || 1;

    const { data: totalSiteCount } = await serverFetch<number>(
        `/site/total-count?${codes ? `codes=${codes}` : ""}`,
        {
            next: { tags: [revalidationKeys["sites"]] },
        },
    );

    const { data: sites } = await serverFetch<ISiteInfo[]>(
        `/site/get-paginated?limit=${siteCountPerPage}&skip=${(pageNum - 1) * siteCountPerPage}&take=5&codesParam=${codes || ""}`,
        {
            next: { tags: [revalidationKeys["sites"]] },
        },
    );

    return (
        <Grid>
            <Group pl="sm" mb="md">
                <SitesPerPageInput
                    max={totalSiteCount}
                    siteCountPerPage={siteCountPerPage}
                />
                <CodeFilterGroup />
            </Group>
            <SiteTableHeader />
            {sites.map((site) => (
                <SiteTableRow key={site.address} row={site} />
            ))}
            <TablePagination
                defaultValue={siteCountPerPage > totalSiteCount ? 1 : pageNum}
                total={Math.ceil(totalSiteCount / siteCountPerPage)}
                max={totalSiteCount}
            />
        </Grid>
    );
};
