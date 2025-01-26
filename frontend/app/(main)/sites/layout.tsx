import { ReactNode } from "react";
import { SiteStoreProvider } from "@/store/store/site/site-store-provider";

export default function SitesLayout({
    children,
    table,
}: {
    children: ReactNode;
    table: ReactNode;
}) {
    return (
        <SiteStoreProvider>
            {table}
            {children}
        </SiteStoreProvider>
    );
}
