"use client";

import { Pagination } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const TablePagination = ({
    total,
    defaultValue,
}: {
    total: number;
    defaultValue: number;
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());

        return `${pathname}?${params.toString()}`;
    };

    return (
        <Pagination
            value={defaultValue}
            onChange={(value) => {
                router.push(createPageURL(value));
            }}
            total={total}
        />
    );
};
