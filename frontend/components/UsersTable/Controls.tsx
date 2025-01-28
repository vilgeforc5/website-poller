"use client";
import { ActionIcon } from "@mantine/core";
import { IconDatabaseX } from "@tabler/icons-react";
import { useSettingsStore } from "@/store/store/settings/settings-store-provider";

interface IUserTableControlsProps {
    isDisabled: boolean;
    userId: number;
}

export const UserTableControls = ({
    isDisabled,
    userId,
}: IUserTableControlsProps) => {
    const settingsStore = useSettingsStore((state) => state);

    return (
        <ActionIcon
            disabled={isDisabled}
            variant="outline"
            size="md"
            color="red"
            onClick={() => {
                settingsStore.setTargetUserId(userId);
                settingsStore.openDeleteUserModal();
            }}
        >
            <IconDatabaseX
                style={{
                    width: "70%",
                    height: "70%",
                }}
                stroke={2}
            />
        </ActionIcon>
    );
};
