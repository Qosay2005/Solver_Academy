import axios from "axios";
import useAuthStore from "../hocks/authStore";

const AuthaxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BURL }`,
  headers: {
    "Accept-language": "en",
  },
});

AuthaxiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AuthaxiosInstance;