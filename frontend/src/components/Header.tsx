import { Avatar, Burger, Flex, Menu } from "@mantine/core";
import { HeaderTitle } from "@/components/Text/HeaderTitle.tsx";
import { useAuth } from "@/auth/AuthProvider.tsx";
import { IconLogout2, IconMail, IconUserCheck } from "@tabler/icons-react";
import axios from "axios";
import { useAuthData } from "@/auth/useAuthData.ts";
import Divider = Menu.Divider;

export const Header = ({ navOpen, toggleNavBar }: HeaderProps) => {
    const { resetTokens } = useAuth();
    const { role, email } = useAuthData();

    const onLogout = () => {
        const controller = new AbortController();

        axios.post("api/auth/logout").then(() => {
            resetTokens();
        });

        return () => controller.abort();
    };

    return (
        <Flex h="100%" align="center">
            <Burger
                opened={navOpen}
                onClick={toggleNavBar}
                hiddenFrom="sm"
                size="sm"
                mr="4"
            />
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
                    <Menu.Item leftSection={<IconMail color="grey" />}>
                        {email}
                    </Menu.Item>
                    <Menu.Item leftSection={<IconUserCheck color="grey" />}>
                        {role}
                    </Menu.Item>
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
    navOpen: boolean;
    toggleNavBar: () => void;
}
