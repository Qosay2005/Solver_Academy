import axios from "axios";

const AuthaxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BURL}`,
  headers: {
    "Accept-language": "en",
  },
});

AuthaxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

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