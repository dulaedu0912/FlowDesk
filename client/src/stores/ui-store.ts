import { create } from "zustand";

interface UIState {
  sidebarOpen: boolean;
  activeWorkspaceId: string | null;
  toggleSidebar: () => void;
  setWorkspace: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  activeWorkspaceId: null,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setWorkspace: (id) => set({ activeWorkspaceId: id })
}));
