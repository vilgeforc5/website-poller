export const routeLinks = {
    dashboard: "/dashboard",
    settings: "/settings",
    tables: "/tables",
};

type TRouteLinks = typeof routeLinks;

export const routes: Array<{
    href: TRouteLinks[keyof TRouteLinks];
    label: string;
}> = [
    { href: "/dashboard", label: "Главная" },
    { href: "/settings", label: "Настройки" },
    { href: "/tables", label: "Парсинг" },
];
