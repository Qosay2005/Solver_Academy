import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token:localStorage.getItem('accessToken')|| null,

  setToken: (newToken) => {
    set({ 
      token: newToken
     });
  },

  logout: () => {
    set({ token: null });
    localStorage.removeItem('accessToken');
  },
}));

export default useAuthStore;
