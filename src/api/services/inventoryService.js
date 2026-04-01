// src/api/services/inventoryService.js
// Inventory management API service

import axiosInstance from '../axiosConfig';

const ENDPOINT = '/inventory';

export const inventoryService = {
	// Get inventory list
	getInventory: (params = {}) => axiosInstance.get(ENDPOINT, { params }),

	// Get inventory by product and warehouse
	getStockLevel: (productId, warehouseId) =>
		axiosInstance.get(`${ENDPOINT}/stock-level`, {
			params: { product_id: productId, warehouse_id: warehouseId },
		}),

	// Get all stock by product
	getProductStock: (productId) =>
		axiosInstance.get(`${ENDPOINT}/product/${productId}`),

	// Adjust inventory
	adjustInventory: (data) => axiosInstance.post(`${ENDPOINT}/adjust`, data),

	// Get inventory adjustments
	getAdjustments: (params = {}) =>
		axiosInstance.get(`${ENDPOINT}/adjustments`, { params }),

	// Get inventory transactions
	getTransactions: (params = {}) =>
		axiosInstance.get(`${ENDPOINT}/transactions`, { params }),

	// Get inventory transaction details
	getTransaction: (id) => axiosInstance.get(`${ENDPOINT}/transactions/${id}`),

	// Create physical count
	createPhysicalCount: (data) =>
		axiosInstance.post(`${ENDPOINT}/physical-counts`, data),

	// Get physical counts
	getPhysicalCounts: (params = {}) =>
		axiosInstance.get(`${ENDPOINT}/physical-counts`, { params }),

	// Add count details
	addCountDetails: (countId, details) =>
		axiosInstance.post(`${ENDPOINT}/physical-counts/${countId}/details`, {
			details,
		}),

	// Approve physical count
	approveCount: (countId, data = {}) =>
		axiosInstance.post(
			`${ENDPOINT}/physical-counts/${countId}/approve`,
			data,
		),

	// Get reserved stock
	getReservedStock: (params = {}) =>
		axiosInstance.get(`${ENDPOINT}/reserved`, { params }),

	// Get stock movements
	getMovements: (params = {}) =>
		axiosInstance.get(`${ENDPOINT}/movements`, { params }),
};

export default inventoryService;
