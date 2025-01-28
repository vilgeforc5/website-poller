import React from "react";
import { SettingsStoreContextProvider } from "@/store/store/settings/settings-store-provider";
import { DeleteUserModal } from "@/components/Modals/Settings/DeleteUserModal";

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SettingsStoreContextProvider>
            <DeleteUserModal />
            {children}
        </SettingsStoreContextProvider>
    );
}
