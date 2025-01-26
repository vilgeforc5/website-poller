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
    isAdminOnly?: boolean;
}> = [
    { href: routeLinks.dashboard, label: "Главная" },
    { href: routeLinks.sites, label: "Сайты" },
    { href: routeLinks.tables, label: "Парсинг" },
    { href: routeLinks.settings, label: "Настройки", isAdminOnly: true },
];
