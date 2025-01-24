"use client";
import { NavLink, NavLinkProps } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/utils/route";

const linkStyles: NavLinkProps = { style: { cursor: "pointer" } };

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
