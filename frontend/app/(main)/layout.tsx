import { ReactNode } from "react";
import {
    AppShell,
    AppShellHeader,
    AppShellMain,
    AppShellNavbar,
} from "@mantine/core";
import { HeaderContainer } from "@/components/Header/HeaderContainer";
import { NavBar } from "@/components/NavBar/NavBar";
import styles from "./main.module.scss";

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <AppShell
            header={{ height: 50 }}
            navbar={{
                width: 250,
                breakpoint: "sm",
                collapsed: { desktop: false, mobile: true },
            }}
            p="sm"
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
