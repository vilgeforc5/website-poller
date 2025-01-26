"use client";
import { Button, ButtonProps } from "@mantine/core";
import { useSiteStore } from "@/store/store/site/site-store-provider";

interface IStartPollButtonProps extends ButtonProps {}

export const StartPollButton = (props: IStartPollButtonProps) => {
    const openModal = useSiteStore((state) => state.openStartPollModal);

    return (
        <Button {...props} onClick={openModal}>
            Начать опрос
        </Button>
    );
};
