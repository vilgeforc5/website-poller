import { create } from "zustand/react";

interface AddSiteModalState {
    isOpen: boolean;
    toggle: () => void;
}

export const useAddSiteModal = create<AddSiteModalState>((set) => ({
    isOpen: false,
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
