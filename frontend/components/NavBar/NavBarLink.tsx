"use client";

import { usePathname } from "next/navigation";
import { NavLink, NavLinkProps } from "@mantine/core";
import Link from "next/link";

const linkStyles: NavLinkProps = { style: { cursor: "pointer" } };

export const NavBarLink = ({
    href,
    label,
}: {
    href: string;
    label: string;
}) => {
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
