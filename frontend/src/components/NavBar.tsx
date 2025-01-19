import { NavLink } from "@mantine/core";
import { NavLink as RouterNavLink } from "react-router";
import { useAuthData } from "@/auth/useAuthData.ts";

export const NavBar = () => {
    const { role } = useAuthData();

    return (
        <>
            <NavLink label="Главная" component={RouterNavLink} to="/" />
            <NavLink label="Сайты" component={RouterNavLink} to="/sites" />
            {["ADMIN", "OWNER"].includes(role) && (
                <NavLink label="Настройки" component={RouterNavLink} to="/settings" />
            )}
        </>
    );
};
