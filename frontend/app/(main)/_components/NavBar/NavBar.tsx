"use client";
import { NavLink } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavBar = () => {
    const pathname = usePathname();

    return (
        <>
            <NavLink
                label="Главная"
                active={pathname === "/"}
                component={Link}
                href="/"
            />
            <NavLink
                label="Сайты"
                active={pathname === "/settings"}
                component={Link}
                href="/settings"
            />
        </>
    );
};
