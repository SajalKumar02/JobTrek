import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";


const config: AxiosRequestConfig = {
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
};

const http: AxiosInstance = axios.create(config);

http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message === "REFRESH TOKEN EXPIRED"
        ) {
            window.location.href = "/register";
        }
        return Promise.reject(error);
    }
);

export default http;
