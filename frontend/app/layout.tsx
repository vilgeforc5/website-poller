import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import {
    ColorSchemeScript,
    mantineHtmlProps,
    MantineProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";

export const metadata: Metadata = {
    title: "Anubis | Poller",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript />
            </head>
            <body>
                <MantineProvider>
                    <Notifications />
                    {children}
                    <Notifications />
                </MantineProvider>
            </body>
        </html>
    );
}
