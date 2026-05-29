import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
    baseURL: "http://localhost:8000/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
};

const http: AxiosInstance = axios.create(config);

http.defaults.withCredentials = true;

http.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response?.status === 401) {
            const isLoginPage = window.location.pathname === '/register';
            if (!isLoginPage) {
                window.location.href = "/register";
            }
        }
        return Promise.reject(error);
    }
);

export default http;
