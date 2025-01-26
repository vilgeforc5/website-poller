import { ReactNode } from "react";
import {
    AppShell,
    AppShellHeader,
    AppShellMain,
    AppShellNavbar,
} from "@mantine/core";
import { NavBar } from "@/components/NavBar/NavBar";
import styles from "./main.module.scss";
import { HeaderContainer } from "@/components/Header/HeaderContainer";

export default function MainLayout({
    children,
}: {
    children: ReactNode;
    cards: ReactNode;
}) {
    return (
        <AppShell
            header={{ height: 50 }}
            navbar={{
                width: 250,
                breakpoint: "sm",
                collapsed: { desktop: false, mobile: true },
            }}
            p="sm"
            bg="var(--mantine-color-gray-0"
        >
            <AppShellHeader p="md">
                <HeaderContainer />
            </AppShellHeader>
            <AppShellNavbar p="md">
                <NavBar />
            </AppShellNavbar>
            <AppShellMain className={styles.main}>{children}</AppShellMain>
        </AppShell>
    );
}
