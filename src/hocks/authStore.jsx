import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: localStorage.getItem('accessToken') || null,

  setToken: (newToken) => {
    localStorage.setItem('accessToken', newToken);
    set({ token: newToken });
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    set({ token: null });
  },
}));

export default useAuthStore;