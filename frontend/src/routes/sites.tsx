import { Box, Button, Flex, Paper, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useAddSiteModal } from "@/components/modals/AddSiteModalState.ts";
import { useSitesQuery } from "@/api/useSitesQuery.ts";
import { SiteTable } from "@/components/site/Table/SiteTable.tsx";

export default function Sites() {
    const { toggle } = useAddSiteModal();
    const sites = useSitesQuery();

    if (!sites) {
        return null;
    }

    return (
        <Box>
            <Flex justify="space-between" align="center">
                <Title title="Сайты">Сайты</Title>
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
