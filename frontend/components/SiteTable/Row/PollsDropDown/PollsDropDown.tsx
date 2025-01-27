import { ISiteInfo } from "backend/dist/layers/site/site.types";
import { ParseInfoDropdownWrapper } from "@/components/SiteTable/Row/PollsDropDown/PollsDropDownWrapper";
import { Grid, GridCol, ScrollAreaAutosize, Text } from "@mantine/core";
import { CodeStatusBadge } from "@/components/SiteTable/Row/CodeStatusBadge";
import { LocalTime } from "@/components/LocalTime/LocalTime";

interface IPollsDropDownProps {
    polls: ISiteInfo["polls"];
    id: number;
}
export const PollsDropDown = ({ polls, id }: IPollsDropDownProps) => {
    return (
        <ParseInfoDropdownWrapper id={id}>
            <GridCol
                span={12}
                style={{
                    background: "var(--mantine-gray-0)",
                }}
            >
                <Grid>
                    <GridCol span={3}>
                        <Text fw="bolder">Время</Text>
                    </GridCol>
                    <GridCol span={3}>
                        <Text fw="bolder">Статус</Text>
                    </GridCol>
                    <GridCol span={3}>
                        <Text fw="bolder">Кол-во повторных попыток</Text>
                    </GridCol>
                    <GridCol span={3}>
                        <Text fw="bolder">Метод запроса</Text>
                    </GridCol>
                </Grid>
                <ScrollAreaAutosize mah="40vh" type="auto" scrollbarSize={8}>
                    {polls.map((poll) => (
                        <Grid
                            style={{
                                borderTop:
                                    "1px solid var(--mantine-color-gray-4)",
                                padding:
                                    "var(--mantine-spacing-sm) var(--mantine-spacing-lg) var(--mantine-spacing-sm) 0",
                            }}
                            key={poll.id}
                        >
                            <GridCol span={3}>
                                <LocalTime date={poll.createdAt} />
                            </GridCol>
                            <GridCol span={3}>
                                <CodeStatusBadge code={poll.statusCode} />
                            </GridCol>
                            <GridCol span={3}>{poll.retryCount}</GridCol>
                            <GridCol span={3}>{poll.requestMethod}</GridCol>
                        </Grid>
                    ))}
                </ScrollAreaAutosize>
            </GridCol>
        </ParseInfoDropdownWrapper>
    );
};
