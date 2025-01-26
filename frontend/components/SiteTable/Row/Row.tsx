import { ISiteInfo } from "backend/dist/layers/site/site.types";
import { Anchor, Grid, GridCol, List, ListItem, Text } from "@mantine/core";
import { RowControls } from "@/components/SiteTable/Row/RowControls";
import { isUserAdmin } from "@/lib/serverJwtValues";
import { PollsDropDown } from "@/components/SiteTable/Row/PollsDropDown/PollsDropDown";
import { CodeStatusBadge } from "@/components/SiteTable/Row/CodeStatusBadge";

interface ISiteTableRowProps {
    row: ISiteInfo;
}

export const SiteTableRow = async ({ row }: ISiteTableRowProps) => {
    const isAdmin = await isUserAdmin();

    return (
        <Grid
            style={{
                borderBottom: "1px solid var(--mantine-color-gray-4)",
            }}
            component={GridCol}
            key={row.address}
            // @ts-expect-error
            span={12}
        >
            {/* @ts-expect-error */}
            <Grid component={GridCol} align="center" span={12}>
                <GridCol span={1}>
                    <RowControls
                        disableDropDown={row.polls.length === 0}
                        id={row.id}
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
                    <Text>{new Date(row.createdAt).toLocaleString()}</Text>
                </GridCol>
                <GridCol span={2}>
                    {row.lastStatusCode ? (
                        <CodeStatusBadge code={row.lastStatusCode} />
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
    );
};
