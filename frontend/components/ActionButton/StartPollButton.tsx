"use client";
import { Button, ButtonProps } from "@mantine/core";
import { useSiteStore } from "@/store/store/site/site-store-provider";

export const StartPollButton = (props: ButtonProps) => {
    const openModal = useSiteStore((state) => state.openStartPollModal);

    return (
        <Button {...props} onClick={openModal}>
            Начать опрос
        </Button>
    );
};
