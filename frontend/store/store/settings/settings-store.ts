import { createStore } from "zustand/vanilla";

export type SettingsState = {
    deleteUserModalOpen: boolean;
    targetUserId?: number;
};

export type SettingsAction = {
    openDeleteUserModal: () => void;
    closeDeleteUserModal: () => void;
    setTargetUserId: (id: number) => void;
};

export type SettingsStore = SettingsState & SettingsAction;

export const defaultInitState: SettingsState = {
    deleteUserModalOpen: false,
};

export const createSettingsStore = (
    initState: SettingsState = defaultInitState,
) => {
    return createStore<SettingsStore>()((set) => ({
        ...initState,
        openDeleteUserModal: () =>
            set((state) => ({
                ...state,
                deleteUserModalOpen: true,
            })),
        closeDeleteUserModal: () =>
            set((state) => ({
                ...state,
                deleteUserModalOpen: false,
            })),
        setTargetUserId: (targetUserId: number | undefined) =>
            set((state) => ({
                ...state,
                targetUserId,
            })),
    }));
};
