import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null,

  setToken: (newToken) => {
    set({ token: newToken });

    if (newToken) {
      localStorage.setItem('accessToken', newToken);
    } else {
      localStorage.removeItem('accessToken');
    }
  },

  logout: () => {
    set({ token: null });
    localStorage.removeItem('accessToken');
  },
}));

export default useAuthStore;
