import axios from 'axios';
import { refreshAccessToken } from './AuthService';

const axiosAuth = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    timeout: 10000,
});

axiosAuth.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

axiosAuth.interceptors.response.use(
    (response) => response,
    async (error) => {
        const token = localStorage.getItem('token');

        if (error.response?.status === 401 && token) {
            await refreshAccessToken();
        }

        return Promise.reject(error);
    },
);

export default axiosAuth;
