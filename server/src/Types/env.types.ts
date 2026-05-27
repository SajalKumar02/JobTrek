declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            MONGO_URI: string;
            NODE_ENV: string;
            FRONTEND_URL: string;
            BACKEND_URL: string;
            JWT_ACCESS_SECRET: string;
            JWT_REFRESH_SECRET: string;
        }
    }
}

export { }