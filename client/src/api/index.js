import axios from 'axios';

const config = {
  baseURL: `${import.meta.env.VITE_API_URL}api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const http = axios.create(config);

let accessToken = null; //module-level variable. Lives in JS memory, outside any component. Survives across renders, shared by anything that imports

export const setAccessToken = (token) => {
  accessToken = token;
}; // the only way to write to that variable

export const getAccessToken = () => accessToken; // the only way to read it

http.interceptors.request.use((config) => {
  if (!config._retry && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Request interceptor
// → runs before every outgoing request
// → grabs accessToken via getAccessToken() (not via closure/prop)
// → attaches Authorization header if present

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isUnauthorized =
      error.response &&
      (error.response.status === 401 ||
        (error.response.status === 403 &&
          error.response.data?.message === 'Unauthorized'));

    const isRefreshRequest =
      originalRequest.url?.includes('/auth/refreshToken');

    if (isUnauthorized && !originalRequest._retry && !isRefreshRequest) {
      originalRequest._retry = true;
      try {
        const res = await http.get('/auth/refreshToken');
        const newAccessToken = res.data.accessToken;
        setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return http(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default http;
