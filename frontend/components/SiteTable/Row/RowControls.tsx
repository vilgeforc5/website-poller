"use client";

import { ActionIcon, ActionIconGroup } from "@mantine/core";
import { IconChevronCompactDown } from "@tabler/icons-react";
import { useSiteStore } from "@/store/store/site/site-store-provider";

interface IRowControlsProps {
    id: number;
    disableDropDown: boolean;
}

export const RowControls = ({ id, disableDropDown }: IRowControlsProps) => {
    const { openedDropdowns, toggleDropDown } = useSiteStore((state) => state);

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
        </ActionIconGroup>
    );
};
