"use client";

import {
    Button,
    Group,
    Modal,
    Stack,
    Text,
    ThemeIcon,
    Title,
} from "@mantine/core";
import { ReactNode } from "react";
import { IconAlertHexagon } from "@tabler/icons-react";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    description: ReactNode;
    type?: "warning" | "danger";
}

export const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    description,
    type = "danger",
}: ConfirmationModalProps) => {
    const accentColor = type === "danger" ? "red" : "yellow";

    return (
        <Modal
            withCloseButton={false}
            size="md"
            opened={isOpen}
            onClose={onClose}
            centered
        >
            <Stack gap="xs" align="center" justify="center">
                <ThemeIcon
                    bd="0"
                    size="65px"
                    variant="outline"
                    color={accentColor}
                >
                    <IconAlertHexagon
                        style={{ width: "100%", height: "100%" }}
                    />
                </ThemeIcon>
                <Title fw="bold" order={3}>
                    Вы уверены?
                </Title>
                <Text ta="center">{description}</Text>
                <Group mt="md">
                    <Button onClick={onClose} variant="default">
                        Отменить
                    </Button>
                    <Button onClick={onConfirm} color={accentColor}>
                        Подтвердить
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
};
