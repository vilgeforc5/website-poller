"use client";

import { ReactNode } from "react";
import { Collapse } from "@mantine/core";
import { useSiteStore } from "@/store/store/site/site-store-provider";

export const ParseInfoDropdownWrapper = ({
    children,
    id,
}: {
    children: ReactNode;
    id: number;
}) => {
    const dropDowns = useSiteStore((state) => state.openedDropdowns);

    return (
        <Collapse style={{ width: "100%" }} in={dropDowns.includes(id)}>
            {children}
        </Collapse>
    );
};
