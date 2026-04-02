// src/api/axiosConfig.js
// Axios configuration with interceptors

import axios from 'axios';
import { Navigate } from 'react-router-dom';
import AuthService from './services/AuthService';

const API_BASE_URL =
	import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Create axios instance
const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	timeout: 30000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

// Request interceptor - Add token to all requests
axiosInstance.interceptors.request.use(
	(config) => {
		// Add auth token if available
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Response interceptor
axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		const token = localStorage.getItem('token');

		// Nếu 401 và chưa retry
		if (
			token &&
			error.response?.status === 401 &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;

			try {
				const res = await AuthService.refreshAccessToken();
				const newToken = res.token;
				console.log('Token refreshed successfully', newToken);
				// Lưu token mới
				localStorage.setItem('token', newToken);

				// Gắn token mới vào header
				originalRequest.headers.Authorization = `Bearer ${newToken}`;

				// Gọi lại request cũ
				return axiosInstance(originalRequest);
			} catch (refreshError) {
				// Refresh fail → logout
				localStorage.removeItem('token');

				// redirect bằng window
				window.location.href = '/login';

				return Promise.reject(refreshError);
			}
		}

		// Các lỗi khác
		return Promise.reject({
			status: error.response?.status,
			message: error.response?.data?.message || error.message,
			errors: error.response?.data?.errors,
		});
	},
);

export default axiosInstance;
