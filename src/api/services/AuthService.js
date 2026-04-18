import axiosInstance from '../axiosConfig';
import { validateHelper } from '@/helpers/validateHelper';

/**
 * Authentication Service
 * Handles login, logout, token refresh, and user data fetching
 *
 * Note: axiosInstance response interceptor returns response.data directly,
 * so all responses are already unwrapped.
 */

const login = async (params) => {
	try {
		// axiosConfig response interceptor returns response.data directly
		// Expected shape: { token: string, user: {...}, data: {...} }
		const response = await axiosInstance.post('/auth/login', params);
		return response.data;
	} catch (error) {
		const message = validateHelper(error);
		throw new Error(message);
	}
};

const logout = async () => {
	try {
		await axiosInstance.post('/auth/logout');
	} catch (error) {
		const message = validateHelper(error);
		throw new Error(message);
	}
};

const refreshAccessToken = async () => {
	try {
		// Expected response shape: { token: string }
		const response = await axiosInstance.post('/auth/refresh');
		if (response.token) {
			localStorage.setItem('token', response.token);
		}
		return response.data;
	} catch (error) {
		const message = validateHelper(error);
		throw new Error(message);
	}
};

const getCurrentUser = async () => {
	try {
		// Expected response shape: { id, name, email, role, ... }
		const response = await axiosInstance.get('/me');
		return response.data;
	} catch (error) {
		const message = validateHelper(error);
		throw new Error(message);
	}
};

const authService = {
	login,
	logout,
	refreshAccessToken,
	getCurrentUser,
};

export default authService;
