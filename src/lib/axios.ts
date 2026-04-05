import axios, { type AxiosResponse } from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

let isRefreshing = false;
let refreshPromise: Promise<AxiosResponse> | null = null;

axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;

        if (status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;

                refreshPromise = axios.post(
                    `${import.meta.env.VITE_API_URL}/api/auth/refresh-token`,
                    {},
                    { withCredentials: true }
                ).finally(() => {
                    isRefreshing = false;
                });
            }

            await refreshPromise;

            return axiosInstance(originalRequest);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
