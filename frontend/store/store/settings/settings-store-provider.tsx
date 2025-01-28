"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

import { createSettingsStore, SettingsStore } from "./settings-store";

export type SettingsStoreApi = ReturnType<typeof createSettingsStore>;

export const SettingsStoreContext = createContext<SettingsStoreApi | undefined>(
    undefined,
);

export const SettingsStoreContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const storeRef = useRef<SettingsStoreApi>(null);
    if (!storeRef.current) {
        storeRef.current = createSettingsStore();
    }

    return (
        <SettingsStoreContext.Provider value={storeRef.current}>
            {children}
        </SettingsStoreContext.Provider>
    );
};

export const useSettingsStore = <T,>(
    selector: (store: SettingsStore) => T,
): T => {
    const settingsStore = useContext(SettingsStoreContext);

    if (!settingsStore) {
        throw new Error(
            `useSettingsStore must be used within SettingsStoreContextProvider`,
        );
    }

    return useStore(settingsStore, selector);
};
