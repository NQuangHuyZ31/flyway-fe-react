// src/api/services/warehouseService.js
// Warehouse management API service

import axiosInstance from '../axiosConfig';

const ENDPOINT = '/warehouses';

export const warehouseService = {
	// List all warehouses
	getWarehouses: (params = {}) => axiosInstance.get(ENDPOINT, { params }),

	// Get single warehouse
	getWarehouse: (id) => axiosInstance.get(`${ENDPOINT}/${id}`),

	// Create warehouse
	createWarehouse: (data) => axiosInstance.post(ENDPOINT, data),

	// Update warehouse
	updateWarehouse: (id, data) => axiosInstance.put(`${ENDPOINT}/${id}`, data),

	// Delete warehouse
	deleteWarehouse: (id) => axiosInstance.delete(`${ENDPOINT}/${id}`),

	// Get warehouse sections
	getSections: (warehouseId, params = {}) =>
		axiosInstance.get(`${ENDPOINT}/${warehouseId}/sections`, { params }),

	// Create section
	createSection: (warehouseId, data) =>
		axiosInstance.post(`${ENDPOINT}/${warehouseId}/sections`, data),

	// Update section
	updateSection: (warehouseId, sectionId, data) =>
		axiosInstance.put(
			`${ENDPOINT}/${warehouseId}/sections/${sectionId}`,
			data,
		),

	// Delete section
	deleteSection: (warehouseId, sectionId) =>
		axiosInstance.delete(
			`${ENDPOINT}/${warehouseId}/sections/${sectionId}`,
		),

	// Assign users to warehouse
	assignUsers: (warehouseId, userIds) =>
		axiosInstance.post(`${ENDPOINT}/${warehouseId}/assign-users`, {
			user_ids: userIds,
		}),

	// Get warehouse capacity
	getCapacity: (warehouseId) =>
		axiosInstance.get(`${ENDPOINT}/${warehouseId}/capacity`),

	// Get warehouse activities
	getActivities: (warehouseId, params = {}) =>
		axiosInstance.get(`${ENDPOINT}/${warehouseId}/activities`, { params }),
};

export default warehouseService;
