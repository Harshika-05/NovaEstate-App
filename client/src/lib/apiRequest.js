import axios from "axios"
const apiRequest = axios.create({
    baseURL : "https://novaestate-app.onrender.com",
    withCredentials : true
});
export default apiRequest;