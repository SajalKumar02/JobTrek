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
        console.log(response);
        return response;
    },
    function (error) {
        console.log("This is an error");
        // console.log("API INTERCEPTOR")
        // if (
        //     error.response &&
        //     error.response.data &&
        //     error.response.data.message === "ACCESS TOKEN EXPIRED"
        // ) {
        //     try {
        //         if (!error.config) {
        //             return Promise.reject(error);
        //         }

        //         const originalRequest = error.config;
        //         if (originalRequest._retry) {
        //             window.location.href = "/register";
        //             return Promise.reject(error);
        //         }
        //         originalRequest._retry = true;
        //         await http.post('/auth/token/refresh');
        //         return http(originalRequest);
        //     } catch (refreshError) {
        //         window.location.href = "/register";
        //         return Promise.reject(refreshError);
        //     }
        // }
        return Promise.reject(error);
    }
);

export default http;
