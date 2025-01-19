import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import AuthProvider from "@/auth/AuthProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { staleTime: 1 * 60 * 1000, refetchOnWindowFocus: false },
    },
});

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <MantineProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Notifications />
                    <App />
                </AuthProvider>
            </QueryClientProvider>
        </MantineProvider>
    </BrowserRouter>,
);
