"use client";

import { Chip, Group } from "@mantine/core";
import { useSiteStore } from "@/store/store/site/site-store-provider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export const CodeFilterGroup = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const { filteredStatusCodes: codes, handleStatusCode } = useSiteStore(
        (state) => state,
    );

    const createPageURL = useCallback(() => {
        const params = new URLSearchParams(searchParams);
        params.set("codes", codes.join("."));

        return `${pathname}?${params.toString()}`;
    }, [codes]);

    const isChecked = (value: number) =>
        codes.includes(value) || codes.length === 0;

    const onCheck = (value: number) => {
        handleStatusCode(value);
    };

    useEffect(() => {
        const url = createPageURL();
        router.push(url);
    }, [createPageURL]);

    return (
        <Group justify="center" mt="md">
            <Chip
                checked={isChecked(200)}
                color="green.5"
                value="2"
                onClick={() => onCheck(200)}
            >
                200
            </Chip>
            <Chip
                checked={isChecked(300)}
                color="yellow.3"
                value="3"
                onClick={() => onCheck(300)}
            >
                300
            </Chip>
            <Chip
                checked={codes.includes(400)}
                color="orange.5"
                value="4"
                onClick={() => onCheck(400)}
            >
                400
            </Chip>
            <Chip
                checked={isChecked(500)}
                color="red.5"
                value="5"
                onClick={() => onCheck(500)}
            >
                500
            </Chip>
        </Group>
    );
};
