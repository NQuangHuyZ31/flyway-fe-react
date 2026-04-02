// src/api/services/orderService.js
// Order management API service

import axiosInstance from '../axiosConfig';

const ENDPOINT = '/orders';

export const orderService = {
	// List orders
	getOrders: (params = {}) => axiosInstance.get(ENDPOINT, { params }),

	// Get single order
	getOrder: (id) => axiosInstance.get(`${ENDPOINT}/${id}`),

	// Create order
	createOrder: (data) => axiosInstance.post(ENDPOINT, data),

	// Update order
	updateOrder: (id, data) => axiosInstance.put(`${ENDPOINT}/${id}`, data),

	// Delete order
	deleteOrder: (id) => axiosInstance.delete(`${ENDPOINT}/${id}`),

	// Add order items
	addItems: (orderId, items) =>
		axiosInstance.post(`${ENDPOINT}/${orderId}/items`, { items }),

	// Update order item
	updateItem: (orderId, itemId, data) =>
		axiosInstance.put(`${ENDPOINT}/${orderId}/items/${itemId}`, data),

	// Delete order item
	deleteItem: (orderId, itemId) =>
		axiosInstance.delete(`${ENDPOINT}/${orderId}/items/${itemId}`),

	// Get fulfillments
	getFulfillments: (orderId) =>
		axiosInstance.get(`${ENDPOINT}/${orderId}/fulfillments`),

	// Create shipment
	createShipment: (orderId, data) =>
		axiosInstance.post(`${ENDPOINT}/${orderId}/shipments`, data),

	// Update order status
	updateStatus: (orderId, status, data = {}) =>
		axiosInstance.post(`${ENDPOINT}/${orderId}/status/${status}`, data),

	// Get order history
	getHistory: (orderId) =>
		axiosInstance.get(`${ENDPOINT}/${orderId}/history`),

	// Print order
	printOrder: (orderId) =>
		axiosInstance.get(`${ENDPOINT}/${orderId}/print`, {
			responseType: 'blob',
		}),

	// Export orders
	exportOrders: (params = {}) =>
		axiosInstance.get(`${ENDPOINT}/export`, {
			params,
			responseType: 'blob',
		}),
};

export default orderService;
