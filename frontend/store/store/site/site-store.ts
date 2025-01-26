import { createStore } from "zustand/vanilla";

export type SiteState = {
    startPollModalOpen: boolean;
    openedDropdowns: number[];
};

export type SiteActions = {
    openStartPollModal: () => void;
    closeStartPollModal: () => void;

    openDropDown: (id: number) => void;
    closeDropDown: (id: number) => void;
    toggleDropDown: (id: number) => void;
};

export type SiteStore = SiteState & SiteActions;

export const defaultInitState: SiteState = {
    startPollModalOpen: false,
    openedDropdowns: [],
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
        openDropDown: (tableId: number) =>
            set((state) => ({
                ...state,
                openedDropdowns: Array.from(
                    new Set([...state.openedDropdowns, tableId]),
                ),
            })),
        closeDropDown: (tableId: number) =>
            set((state) => ({
                ...state,
                openedDropdowns: state.openedDropdowns.filter(
                    (dropDown) => dropDown !== tableId,
                ),
            })),
        toggleDropDown: (tableId: number) =>
            set((state) => {
                const isOpen = state.openedDropdowns.includes(tableId);

                return {
                    ...state,
                    openedDropdowns: isOpen
                        ? state.openedDropdowns.filter(
                              (dropDown) => dropDown !== tableId,
                          )
                        : [...state.openedDropdowns, tableId],
                };
            }),
    }));
};
