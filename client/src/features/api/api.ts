import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";


const config: AxiosRequestConfig = {
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
};

const http: AxiosInstance = axios.create(config);

export default http;
