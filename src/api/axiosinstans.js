import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BURL }`,
    headers: {
     "Accept-language": "en"
    }
});

export default axiosInstance ;