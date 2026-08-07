import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BURL || "https://knowledgeshop.runasp.net/api"}`,
    headers: {
     "Accept-language": "en"
    }
});

export default axiosInstance ;