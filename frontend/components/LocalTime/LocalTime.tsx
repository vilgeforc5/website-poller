"use client";

import { ReactNode, Suspense } from "react";
import { useIsHydrated } from "@/hooks/useHydrated";

export function LocalTime({
    date,
    children,
}: {
    date?: Date | string | number | null;
    children?: ReactNode;
}) {
    const hydrated = useIsHydrated();
    return (
        <Suspense key={hydrated ? "utc" : "local"}>
            <span>
                {children}
                {date ? new Date(date).toLocaleString() : "-"}
            </span>
        </Suspense>
    );
}
