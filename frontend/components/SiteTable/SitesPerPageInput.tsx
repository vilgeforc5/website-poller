"use client";
import { NumberInput } from "@mantine/core";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const step = 10;

export const SitesPerPageInput = ({
    siteCountPerPage,
    max,
}: {
    siteCountPerPage: number;
    max: number;
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateSiteCount = useDebouncedCallback((value: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set("sitesPerPage", value.toString());

        router.push(`${pathname}?${params.toString()}`);
    }, 1000);

    return (
        <NumberInput
            max={max}
            w="fit-content"
            radius="md"
            step={step}
            description="Сайтов на странице"
            defaultValue={siteCountPerPage}
            allowNegative={false}
            min={step}
            allowDecimal={false}
            onChange={updateSiteCount}
        />
    );
};
