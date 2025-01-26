"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

import { createSiteStore, SiteStore } from "./site-store";

export type SiteStoreApi = ReturnType<typeof createSiteStore>;

export const SiteStoreContext = createContext<SiteStoreApi | undefined>(
    undefined,
);

export const SiteStoreProvider = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<SiteStoreApi>(null);
    if (!storeRef.current) {
        storeRef.current = createSiteStore();
    }

    return (
        <SiteStoreContext.Provider value={storeRef.current}>
            {children}
        </SiteStoreContext.Provider>
    );
};

export const useSiteStore = <T,>(selector: (store: SiteStore) => T): T => {
    const siteStoreContext = useContext(SiteStoreContext);

    if (!siteStoreContext) {
        throw new Error(`useSiteStore must be used within SiteStoreProvider`);
    }

    return useStore(siteStoreContext, selector);
};
