"use client";

import { ActionIcon, Group, GroupProps, Title } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";

interface IPageTitleProps extends GroupProps {
    title: string;
    refresh?: () => void;
}

export const PageTitle = ({ title, refresh, ...other }: IPageTitleProps) => (
    <Group {...other}>
        {refresh && (
            <ActionIcon variant="filled" onClick={refresh}>
                <IconRefresh />
            </ActionIcon>
        )}
        <Title order={2}>{title}</Title>
    </Group>
);
