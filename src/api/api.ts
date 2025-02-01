import axios, {  AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { $axios, BaseURL } from "./axios";

const $api = axios.create({
    withCredentials: true,
    baseURL: BaseURL
})

$api.interceptors.request.use((config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
            originalRequest._isRetry = true;

            try {
                const { data } = await $axios.get("/auth/refresh");
                localStorage.setItem("accessToken", data.accessToken);
                return $api.request(originalRequest)
            } catch (error) {
                console.error("Token yangilashda xatolik:", error);
            }
        }

        throw error
    }
);

export default $api
