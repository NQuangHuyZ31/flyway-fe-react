import axios from 'axios';
import { refreshAccessToken } from './AuthService';

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    timeout: 10000,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const token = localStorage.getItem('token');

        if (error.response?.status === 401 && token) {
            await refreshAccessToken();
        }

        return Promise.reject(error);
    },
);

export default axiosClient;
