import { Box, Button, Flex, Paper, Title } from "@mantine/core";
import { IconPlus, IconRotate } from "@tabler/icons-react";
import { useAddSiteModal } from "@/components/modals/AddSiteModalState.ts";
import { useSitesQuery } from "@/api/useSitesQuery.ts";
import { SiteTable } from "@/components/site/Table/SiteTable.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/api/queryKeys.ts";

export default function Sites() {
    const { toggle } = useAddSiteModal();
    const sites = useSitesQuery();
    const queryClient = useQueryClient();

    if (!sites) {
        return null;
    }

    return (
        <Box>
            <Flex justify="space-between" align="center">
                <Flex align="center">
                    <Title title="Сайты">Сайты</Title>
                    <IconRotate
                        style={{ marginTop: "4", cursor: "pointer" }}
                        onClick={() =>
                            queryClient.invalidateQueries({
                                queryKey: [queryKeys.siteList],
                            })
                        }
                    />
                </Flex>
                <Button leftSection={<IconPlus />} onClick={toggle}>
                    Добавить сайт
                </Button>
            </Flex>
            <Paper mt="sm">
                <SiteTable sites={sites} />
            </Paper>
        </Box>
    );
}
