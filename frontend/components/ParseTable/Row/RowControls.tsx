"use client";

import { ActionIcon, ActionIconGroup } from "@mantine/core";
import {
    IconChevronCompactDown,
    IconDatabaseX,
    IconRestore,
} from "@tabler/icons-react";
import { useTablesStore } from "@/store/store/table/table-store-provider";

interface IRowControlsProps {
    id: number;
    disableDropDown: boolean;
}

export const RowControls = ({ id, disableDropDown }: IRowControlsProps) => {
    const {
        deleteTableAction,
        reparseTableAction,
        openedDropdowns,
        toggleDropDown,
    } = useTablesStore((state) => state);

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
                        transform: isDropDownOpen ? "rotate(-180deg)" : "",
                    }}
                    stroke={2.5}
                />
            </ActionIcon>
            <ActionIcon
                variant="outline"
                size="md"
                color="red"
                onClick={() => deleteTableAction(id)}
            >
                <IconDatabaseX
                    style={{
                        width: "70%",
                        height: "70%",
                    }}
                    stroke={2}
                />
            </ActionIcon>
            <ActionIcon
                variant="outline"
                size="md"
                aria-label="Settings"
                color="yellow"
                onClick={() => reparseTableAction(id)}
            >
                <IconRestore
                    style={{
                        width: "70%",
                        height: "70%",
                    }}
                    stroke={2}
                />
            </ActionIcon>
        </ActionIconGroup>
    );
};
