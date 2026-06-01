import axios from "axios"

// For development use localhost, for production use your deployed API
const apiRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api",
    withCredentials: true
});

export default apiRequest;