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
            <ActionIcon variant="filled" size="sm" onClick={refresh}>
                <IconRefresh />
            </ActionIcon>
        )}
        <Title order={3}>{title}</Title>
    </Group>
);
