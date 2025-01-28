"use client";

import { ActionIcon, ActionIconGroup } from "@mantine/core";
import { IconChevronCompactDown, IconDatabaseX } from "@tabler/icons-react";
import { useSiteStore } from "@/store/store/site/site-store-provider";

interface IRowControlsProps {
    id: number;
    disableDropDown: boolean;
    hasDeletionFeature: boolean;
}

export const RowControls = ({
    id,
    disableDropDown,
    hasDeletionFeature,
}: IRowControlsProps) => {
    const { openedDropdowns, toggleDropDown, setTargetToDeletionId } =
        useSiteStore((state) => state);

    const isDropDownOpen = openedDropdowns.includes(id);

    return (
        <ActionIconGroup style={{ flexWrap: "wrap" }}>
            <ActionIcon
                variant="outline"
                size="md"
                color="blue"
                onClick={() => toggleDropDown(id)}
                disabled={disableDropDown}
            >
                <IconChevronCompactDown
                    style={{
                        width: "70%",
                        height: "70%",
                        transform: isDropDownOpen
                            ? "rotate(-180deg)"
                            : "initial",
                    }}
                    stroke={2.5}
                />
            </ActionIcon>
            {hasDeletionFeature && (
                <ActionIcon
                    variant="outline"
                    size="md"
                    color="red"
                    onClick={() => {
                        setTargetToDeletionId(id);
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
            )}
        </ActionIconGroup>
    );
};
