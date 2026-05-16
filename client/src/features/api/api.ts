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
        if (
            error.response &&
            error.response.data &&
            error.response.data.message === "ACCESS TOKEN EXPIRED"
        ) {
            try {
                return http.post('/auth/token/refresh')
                    .then(() => {
                        const originalRequest = error.config;
                        return http(originalRequest);
                    });

            } catch (refreshError) {
                window.location.href = "/register";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default http;
