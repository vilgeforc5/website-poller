import React from "react";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavBar } from "@/components/NavBar.tsx";
import { Outlet } from "react-router";
import { Header } from "@/components/Header.tsx";
import { AddSiteModal } from "@/components/modals/AddSiteModal.tsx";

const AppLayout: React.FC<React.PropsWithChildren> = () => {
    const [navOpen, { toggle: toggleNavBar }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 50 }}
            navbar={{
                width: 250,
                breakpoint: "sm",
                collapsed: { mobile: !navOpen },
            }}
            padding="md"
        >
            <AppShell.Header p="md">
                <Header navOpen={navOpen} toggleNavBar={toggleNavBar} />
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <NavBar />
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
            <AddSiteModal />
        </AppShell>
    );
};

export default AppLayout;
