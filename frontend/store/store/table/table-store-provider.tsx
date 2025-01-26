"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

import { createTablesStore, TablesStore } from "./tables-store";

export type TablesStoreApi = ReturnType<typeof createTablesStore>;

export const TablesStoreContext = createContext<TablesStoreApi | undefined>(
    undefined,
);

export interface TablesStoreProviderProps {
    children: ReactNode;
}

export const TablesStoreProvider = ({ children }: TablesStoreProviderProps) => {
    const storeRef = useRef<TablesStoreApi>(null);
    if (!storeRef.current) {
        storeRef.current = createTablesStore();
    }

    return (
        <TablesStoreContext.Provider value={storeRef.current}>
            {children}
        </TablesStoreContext.Provider>
    );
};

export const useTablesStore = <T,>(selector: (store: TablesStore) => T): T => {
    const tablesStoreContext = useContext(TablesStoreContext);

    if (!tablesStoreContext) {
        throw new Error(
            `useTablesStore must be used within TablesStoreProvider`,
        );
    }

    return useStore(tablesStoreContext, selector);
};
