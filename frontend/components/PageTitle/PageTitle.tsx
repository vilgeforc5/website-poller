"use client";

import {
    ActionIcon,
    Group,
    GroupProps,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";

interface IPageTitleProps extends GroupProps {
    title: string;
    description?: string | null;
    refresh?: () => void;
}

export const PageTitle = ({
    title,
    refresh,
    description,
    ...other
}: IPageTitleProps) => (
    <Group {...other}>
        {refresh && (
            <ActionIcon variant="filled" size="sm" onClick={refresh}>
                <IconRefresh />
            </ActionIcon>
        )}
        <Stack gap={0}>
            <Title order={3}>{title}</Title>
            {description && (
                <Text c="gray" size="sm">
                    {description}
                </Text>
            )}
        </Stack>
    </Group>
);
