"use client";

import { ReactNode } from "react";
import { Collapse } from "@mantine/core";
import { useParseTableRowContext } from "@/components/ParseTable/Row/RowContext";

export const RowDropDown = ({ children }: { children: ReactNode }) => {
    const { dropDownOpen } = useParseTableRowContext();

    return (
        <Collapse style={{ width: "100%" }} in={dropDownOpen}>
            {children}
        </Collapse>
    );
};
