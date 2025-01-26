"use client";

import { Chip, ChipGroup, Group } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const CodeFilterGroup = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [codes, setCodes] = useState<string[]>([]);

    useEffect(() => {
        const codesParam = searchParams.get("codes");
        setCodes(codesParam ? codesParam.split(".") : []);
    }, [searchParams]);

    const handleChipClick = useDebouncedCallback((value: string) => {
        let newCodes = [...codes];

        if (newCodes.includes(value)) {
            newCodes = newCodes.filter((code) => code !== value);
        } else {
            newCodes.push(value);
        }
        setCodes(newCodes);

        const params = new URLSearchParams(searchParams);
        if (newCodes.length > 0) {
            params.set("codes", newCodes.join("."));
        } else {
            params.delete("codes");
        }
        router.push(`${pathname}?${params.toString()}`);
    }, 1000);

    const isChecked = (value: string) =>
        codes.includes(value) || codes.length === 0;

    return (
        <ChipGroup multiple value={codes}>
            <Group justify="center" mt="md">
                <Chip
                    checked={isChecked("2")}
                    color="green.5"
                    value="2"
                    onClick={() => handleChipClick("2")}
                >
                    200
                </Chip>
                <Chip
                    checked={isChecked("3")}
                    color="yellow.3"
                    value="3"
                    onClick={() => handleChipClick("3")}
                >
                    300
                </Chip>
                <Chip
                    checked={isChecked("4")}
                    color="orange.5"
                    value="4"
                    onClick={() => handleChipClick("4")}
                >
                    400
                </Chip>
                <Chip
                    checked={isChecked("5")}
                    color="red.5"
                    value="5"
                    onClick={() => handleChipClick("5")}
                >
                    500
                </Chip>
            </Group>
        </ChipGroup>
    );
};
