"use client";
import { Avatar, Burger, Divider, Flex, Menu } from "@mantine/core";
import { IconLogout2, IconMail, IconUserCheck } from "@tabler/icons-react";
import { HeaderTitle } from "@/app/(main)/_components/Header/HeaderTitle";
import { useRouter } from "next/navigation";

export const Header = ({ role, email }: HeaderProps) => {
    const router = useRouter();

    const onLogout = async () => {
        await fetch("/api/logout", { method: "POST" });
        router.refresh();
    };

    return (
        <Flex h="100%" align="center">
            <Burger opened={false} hiddenFrom="sm" size="sm" mr="4" />
            <HeaderTitle />
            <Menu
                trigger="click-hover"
                width={300}
                position="bottom"
                withArrow
                shadow="md"
            >
                <Menu.Target>
                    <Avatar ml="auto" radius="xl" />
                </Menu.Target>
                <Menu.Dropdown>
                    {email && (
                        <Menu.Item leftSection={<IconMail color="grey" />}>
                            {email}
                        </Menu.Item>
                    )}
                    {role && (
                        <Menu.Item leftSection={<IconUserCheck color="grey" />}>
                            {role}
                        </Menu.Item>
                    )}
                    <Divider />
                    <Menu.Item
                        onClick={onLogout}
                        mt="4"
                        leftSection={<IconLogout2 color="grey" />}
                    >
                        Выйти
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Flex>
    );
};

interface HeaderProps {
    role?: string;
    email?: string;
}
