import { create } from "zustand";

type SearchStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
};

export const useSearch = create<SearchStore>((set, get) => ({
  isOpen: false,
  toggle: () => set({ isOpen: !get().isOpen }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
