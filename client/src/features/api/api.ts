import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
};

const http: AxiosInstance = axios.create(config);

http.defaults.withCredentials = true;

http.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log(error);
        // if (
        //     error.response &&
        //     error.response.data &&
        //     error.response.data.message === "REFRESH TOKEN EXPIRED"
        // ) {
        // window.location.href = "/register";
        // }
        // else if (
        //     error.response &&
        //     error.response.data &&
        //     error.response.data.message === "ACCESS TOKEN EXPIRED"
        // ) {
        //     try {
        //         console.log("API INTERCEPTOR")
        //         const originalRequest = error.config;
        //         await http.post('/auth/token/refresh');
        //         return http(originalRequest);
        //     } catch (refreshError) {
        //         window.location.href = "/register";
        //         return Promise.reject(refreshError);
        //     }
        // }
    }
);

export default http;
