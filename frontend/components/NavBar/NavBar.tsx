import { routes } from "@/utils/route";
import { NavBarLink } from "@/components/NavBar/NavBarLink";
import { isUserAdmin } from "@/lib/jwtUtils";

export const NavBar = async () => {
    const isAdmin = await isUserAdmin();
    const routeList = isAdmin
        ? routes
        : routes.filter((route) => !route.isAdminOnly);

    return (
        <>
            {routeList.map(({ label, href }) => (
                <NavBarLink key={href} label={label} href={href} />
            ))}
        </>
    );
};
