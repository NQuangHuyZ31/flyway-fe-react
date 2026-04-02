// src/api/services/quotationService.js
// Quotation management API service

import axiosInstance from '../axiosConfig';

const ENDPOINT = '/quotations';

export const quotationService = {
	// List quotations
	getQuotations: (params = {}) => axiosInstance.get(ENDPOINT, { params }),

	// Get single quotation
	getQuotation: (id) => axiosInstance.get(`${ENDPOINT}/${id}`),

	// Create quotation
	createQuotation: (data) => axiosInstance.post(ENDPOINT, data),

	// Update quotation
	updateQuotation: (id, data) => axiosInstance.put(`${ENDPOINT}/${id}`, data),

	// Delete quotation
	deleteQuotation: (id) => axiosInstance.delete(`${ENDPOINT}/${id}`),

	// Add quotation items
	addItems: (quotationId, items) =>
		axiosInstance.post(`${ENDPOINT}/${quotationId}/items`, { items }),

	// Update quotation item
	updateItem: (quotationId, itemId, data) =>
		axiosInstance.put(`${ENDPOINT}/${quotationId}/items/${itemId}`, data),

	// Delete quotation item
	deleteItem: (quotationId, itemId) =>
		axiosInstance.delete(`${ENDPOINT}/${quotationId}/items/${itemId}`),

	// Send quotation to customer
	sendQuotation: (quotationId, recipients, data = {}) =>
		axiosInstance.post(`${ENDPOINT}/${quotationId}/send`, {
			recipients,
			...data,
		}),

	// Convert to order
	convertToOrder: (quotationId, data = {}) =>
		axiosInstance.post(`${ENDPOINT}/${quotationId}/convert-to-order`, data),

	// Update status
	updateStatus: (quotationId, status, data = {}) =>
		axiosInstance.post(`${ENDPOINT}/${quotationId}/status/${status}`, data),

	// Get quotation history
	getHistory: (quotationId) =>
		axiosInstance.get(`${ENDPOINT}/${quotationId}/history`),

	// Print quotation
	printQuotation: (quotationId) =>
		axiosInstance.get(`${ENDPOINT}/${quotationId}/print`, {
			responseType: 'blob',
		}),

	// Export quotations
	exportQuotations: (params = {}) =>
		axiosInstance.get(`${ENDPOINT}/export`, {
			params,
			responseType: 'blob',
		}),
};

export default quotationService;
