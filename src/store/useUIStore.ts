import { create } from 'zustand';

interface UIState {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  toggleMobileMenu: () => void;
  
  // Example for full-screen visualizer mode
  isVisualizerFullscreen: boolean;
  setVisualizerFullscreen: (isFullscreen: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  
  isVisualizerFullscreen: false,
  setVisualizerFullscreen: (isFullscreen) => set({ isVisualizerFullscreen: isFullscreen }),
}));
