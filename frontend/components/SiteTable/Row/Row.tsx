import { ISiteInfo } from "backend/dist/layers/site/site.types";
import { Anchor, Grid, GridCol, List, ListItem, Text } from "@mantine/core";
import { RowControls } from "@/components/SiteTable/Row/RowControls";
import { isUserAdmin } from "@/lib/serverJwtValues";
import { PollsDropDown } from "@/components/SiteTable/Row/PollsDropDown/PollsDropDown";
import { CodeStatusBadge } from "@/components/SiteTable/Row/CodeStatusBadge";
import { WithRowFilters } from "@/components/SiteTable/Row/WithRowFilters";
import { LocalTime } from "@/components/LocalTime/LocalTime";

interface ISiteTableRowProps {
    row: ISiteInfo;
}

export const SiteTableRow = async ({ row }: ISiteTableRowProps) => {
    const isAdmin = await isUserAdmin();

    const lastStatusCode = row.lastStatusCode;

    return (
        <WithRowFilters code={lastStatusCode}>
            <Grid key={row.address}>
                {/* @ts-expect-error */}
                <Grid component={GridCol} align="center" span={12}>
                    <GridCol span={1}>
                        <RowControls
                            disableDropDown={row.polls.length === 0}
                            id={row.id}
                            hasDeletionFeature={isAdmin}
                        />
                    </GridCol>
                    <GridCol span={5}>
                        <Text
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            <Anchor href={row.address} target="_blank">
                                {row.address}
                            </Anchor>
                        </Text>
                    </GridCol>
                    <GridCol span={2}>
                        <Text>
                            <LocalTime date={row.createdAt} />
                        </Text>
                    </GridCol>
                    <GridCol span={2}>
                        {lastStatusCode ? (
                            <CodeStatusBadge code={lastStatusCode} />
                        ) : (
                            "-"
                        )}
                    </GridCol>
                    {isAdmin && (
                        <GridCol span={2}>
                            <List type="unordered" icon={""}>
                                {row.users.map(({ email }) => (
                                    <ListItem key={email}>{email}</ListItem>
                                ))}
                            </List>
                        </GridCol>
                    )}
                </Grid>
                <PollsDropDown id={row.id} polls={row.polls} />
            </Grid>
        </WithRowFilters>
    );
};
