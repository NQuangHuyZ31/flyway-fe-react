// src/api/services/userService.js
// User and authentication API service

import axiosInstance from '../axiosConfig';

const ENDPOINT = '/users';

export const userService = {
	// Authentication
	login: (email, password) =>
		axiosInstance.post('/auth/login', { email, password }),

	logout: () => axiosInstance.post('/auth/logout'),

	getCurrentUser: () => axiosInstance.get('/auth/me'),

	refreshToken: () => axiosInstance.post('/auth/refresh'),

	// User management
	getUsers: (params = {}) => axiosInstance.get(ENDPOINT, { params }),

	getUser: (id) => axiosInstance.get(`${ENDPOINT}/${id}`),

	createUser: (data) => axiosInstance.post(ENDPOINT, data),

	updateUser: (id, data) => axiosInstance.put(`${ENDPOINT}/${id}`, data),

	deleteUser: (id) => axiosInstance.delete(`${ENDPOINT}/${id}`),

	changePassword: (data) => axiosInstance.post('/auth/change-password', data),

	// Role management
	getRoles: () => axiosInstance.get('/roles'),

	createRole: (data) => axiosInstance.post('/roles', data),

	updateRole: (id, data) => axiosInstance.put(`/roles/${id}`, data),

	deleteRole: (id) => axiosInstance.delete(`/roles/${id}`),

	// Permission management
	getPermissions: () => axiosInstance.get('/permissions'),

	assignPermissionsToRole: (roleId, permissions) =>
		axiosInstance.post(`/roles/${roleId}/permissions`, { permissions }),

	// Activity logs
	getActivityLogs: (params = {}) =>
		axiosInstance.get('/audit/activity-logs', { params }),

	getChangeHistory: (entityType, entityId) =>
		axiosInstance.get(`/audit/history/${entityType}/${entityId}`),
};

export default userService;
