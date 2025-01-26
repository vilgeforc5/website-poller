import { createStore } from "zustand/vanilla";

export type SiteState = {
    startPollModalOpen: boolean;
};

export type SiteActions = {
    openStartPollModal: (id: number) => void;
    closeStartPollModal: (id: number) => void;
};

export type SiteStore = SiteState & SiteActions;

export const defaultInitState: SiteState = {
    startPollModalOpen: false,
};

export const createSiteStore = (initState: SiteState = defaultInitState) => {
    return createStore<SiteStore>()((set) => ({
        ...initState,
        openStartPollModal: () =>
            set((state) => ({
                ...state,
                startPollModalOpen: true,
            })),
        closeStartPollModal: () =>
            set((state) => ({
                ...state,
                startPollModalOpen: false,
            })),
    }));
};
