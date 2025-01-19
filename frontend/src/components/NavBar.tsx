import { NavLink } from "@mantine/core";
import { NavLink as RouterNavLink } from "react-router";

export const NavBar = () => {
    return (
        <>
            <NavLink label="Главная" component={RouterNavLink} to="/" />
            <NavLink label="Сайты" component={RouterNavLink} to="/sites" />
            <NavLink
                label="Настройки"
                component={RouterNavLink}
                to="/settings"
            />
        </>
    );
};
