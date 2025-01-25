import { createStore } from "zustand/vanilla";

export type TablesState = {
    tableId?: number;
    action?: "delete" | "reparse";
    openedDropdowns: number[];
};

export type TablesActions = {
    resetTableAction: () => void;
    deleteTableAction: (id: number) => void;
    reparseTableAction: (id: number) => void;

    openDropDown: (id: number) => void;
    closeDropDown: (id: number) => void;
    toggleDropDown: (id: number) => void;
};

export type TablesStore = TablesState & TablesActions;

export const defaultInitState: TablesState = {
    tableId: undefined,
    openedDropdowns: [],
};

export const createTablesStore = (
    initState: TablesState = defaultInitState,
) => {
    return createStore<TablesStore>()((set) => ({
        ...initState,
        resetTableAction: () =>
            set((state) => ({
                ...state,
                tableId: undefined,
                action: undefined,
            })),
        deleteTableAction: (tableId: number) =>
            set((state) => ({ ...state, tableId, action: "delete" })),
        reparseTableAction: (tableId: number) =>
            set((state) => ({ ...state, tableId, action: "reparse" })),
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
