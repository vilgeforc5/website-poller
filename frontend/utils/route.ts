export const routeLinks = {
    dashboard: "/dashboard",
    settings: "/settings",
    tables: "/tables",
    sites: "/sites",
};

type TRouteLinks = typeof routeLinks;

export const routes: Array<{
    href: TRouteLinks[keyof TRouteLinks];
    label: string;
}> = [
    { href: routeLinks.dashboard, label: "Главная" },
    { href: routeLinks.settings, label: "Настройки" },
    { href: routeLinks.tables, label: "Парсинг" },
    { href: routeLinks.sites, label: "Сайты" },
];
