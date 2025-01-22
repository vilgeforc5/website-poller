"use client";
import { NavLink, NavLinkProps } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

const linkStyles: NavLinkProps = { style: { cursor: "pointer" } };

const routes = [
    { href: "/dashboard", label: "Главная" },
    { href: "/settings", label: "Настройки" },
];

export const NavBar = () => (
    <>
        {routes.map(({ label, href }) => (
            <Link_ key={href} label={label} href={href} />
        ))}
    </>
);

const Link_ = ({ href, label }: { href: string; label: string }) => {
    const pathname = usePathname();

    return (
        <NavLink
            label={label}
            active={pathname === href}
            component={Link}
            href={href}
            {...linkStyles}
        />
    );
};
