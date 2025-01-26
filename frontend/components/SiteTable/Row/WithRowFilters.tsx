"use client";

import { ReactNode } from "react";
import { GridCol } from "@mantine/core";
import { useSiteStore } from "@/store/store/site/site-store-provider";

export const WithRowFilters = ({
    code,
    children,
}: {
    code?: number;
    children: ReactNode;
}) => {
    const filteredCodes = useSiteStore((state) => state.filteredStatusCodes);

    return (
        <GridCol
            span={12}
            style={{
                borderBottom: "1px solid var(--mantine-color-gray-4)",
                opacity:
                    code &&
                    !filteredCodes.some((filteredCode) =>
                        filteredCode
                            .toString()
                            .startsWith(code?.toString().at(0) || ""),
                    )
                        ? "0.25"
                        : 1,
            }}
            p="md"
        >
            {children}
        </GridCol>
    );
};
