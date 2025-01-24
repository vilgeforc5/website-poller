"use client";

import { ActionIcon, Group } from "@mantine/core";
import { IconChevronCompactDown, IconDatabaseX } from "@tabler/icons-react";
import { useParseTableRowContext } from "@/components/ParseTable/Row/RowContext";

export const RowControls = () => {
    const { toggleDropDown, shouldBeDisabled } = useParseTableRowContext();

    return (
        <Group wrap="nowrap" justify="start" gap="xs" w="xl">
            <ActionIcon
                variant="outline"
                size="md"
                aria-label="Settings"
                onClick={toggleDropDown}
                disabled={shouldBeDisabled}
            >
                <IconChevronCompactDown
                    style={{
                        width: "70%",
                        height: "70%",
                    }}
                    stroke={1.5}
                />
            </ActionIcon>
            <ActionIcon
                variant="outline"
                size="md"
                aria-label="Settings"
                color="red"
            >
                <IconDatabaseX
                    style={{
                        width: "70%",
                        height: "70%",
                    }}
                    stroke={1.5}
                />
            </ActionIcon>
        </Group>
    );
};
