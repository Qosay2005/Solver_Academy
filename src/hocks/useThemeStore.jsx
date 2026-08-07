import { create } from 'zustand';

const useThemeStore = create((set) => ({
  mode: typeof window !== 'undefined' ? (localStorage.getItem('appMode') || 'light') : 'light',

  setMode: (nextMode) => {
    set({ mode: nextMode });
    if (typeof window !== 'undefined') {
      localStorage.setItem('appMode', nextMode);
    }
  },

  toggleMode: () => {
    set((state) => {
      const nextMode = state.mode === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        localStorage.setItem('appMode', nextMode);
      }
      return { mode: nextMode };
    });
  },
}));

export default useThemeStore;
