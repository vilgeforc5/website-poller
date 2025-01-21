import { ReactNode } from "react";
import {
    AppShell,
    AppShellHeader,
    AppShellMain,
    AppShellNavbar,
} from "@mantine/core";
import { HeaderContainer } from "@/app/(main)/_components/Header/HeaderContainer";
import { NavBar } from "@/app/(main)/_components/NavBar/NavBar";

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <AppShell
            header={{ height: 50 }}
            navbar={{
                width: 250,
                breakpoint: "sm",
                collapsed: { desktop: false, mobile: true },
            }}
            padding="md"
        >
            <AppShellHeader p="md">
                <HeaderContainer />
            </AppShellHeader>
            <AppShellNavbar p="md">
                <NavBar />
            </AppShellNavbar>
            <AppShellMain style={{ display: "flex", flexDirection: "column" }}>
                {children}
            </AppShellMain>
        </AppShell>
    );
}
