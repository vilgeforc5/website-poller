"use client";

import { Chip, Group } from "@mantine/core";
import { useSiteStore } from "@/store/store/site/site-store-provider";

export const CodeFilterGroup = () => {
    const { filteredStatusCodes: codes, handleStatusCode } = useSiteStore(
        (state) => state,
    );

    const isChecked = (value: number) =>
        codes.includes(value) || codes.length === 0;

    return (
        <Group justify="center" mt="md">
            <Chip
                checked={isChecked(200)}
                color="green.5"
                value="2"
                onClick={() => handleStatusCode(200)}
            >
                200
            </Chip>
            <Chip
                checked={isChecked(300)}
                color="yellow.3"
                value="3"
                onClick={() => handleStatusCode(300)}
            >
                300
            </Chip>
            <Chip
                checked={codes.includes(400)}
                color="orange.5"
                value="4"
                onClick={() => handleStatusCode(400)}
            >
                400
            </Chip>
            <Chip
                checked={isChecked(500)}
                color="red.5"
                value="5"
                onClick={() => handleStatusCode(500)}
            >
                500
            </Chip>
        </Group>
    );
};
