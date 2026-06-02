import axios from "axios"

const apiRequest = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://novaestate-app.onrender.com/api",
    withCredentials: true
});

export default apiRequest;