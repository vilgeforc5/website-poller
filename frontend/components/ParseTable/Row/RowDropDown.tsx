"use client";

import { ReactNode } from "react";
import { Collapse } from "@mantine/core";
import { useTablesStore } from "@/store/store/table-store-provider";

export const RowDropDown = ({
    children,
    id,
}: {
    children: ReactNode;
    id: number;
}) => {
    const dropDowns = useTablesStore((state) => state.openedDropdowns);

    return (
        <Collapse style={{ width: "100%" }} in={dropDowns.includes(id)}>
            {children}
        </Collapse>
    );
};
