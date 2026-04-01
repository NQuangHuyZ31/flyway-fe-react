// src/api/services/customerService.js
// Customer management API service

import axiosInstance from '../axiosConfig';

const ENDPOINT = '/customers';

export const customerService = {
	// List customers
	getCustomers: (params = {}) => axiosInstance.get(ENDPOINT, { params }),

	// Get single customer
	getCustomer: (id) => axiosInstance.get(`${ENDPOINT}/${id}`),

	// Create customer
	createCustomer: (data) => axiosInstance.post(ENDPOINT, data),

	// Update customer
	updateCustomer: (id, data) => axiosInstance.put(`${ENDPOINT}/${id}`, data),

	// Delete customer
	deleteCustomer: (id) => axiosInstance.delete(`${ENDPOINT}/${id}`),

	// Get customer contacts
	getContacts: (customerId) =>
		axiosInstance.get(`${ENDPOINT}/${customerId}/contacts`),

	// Add contact
	addContact: (customerId, data) =>
		axiosInstance.post(`${ENDPOINT}/${customerId}/contacts`, data),

	// Update contact
	updateContact: (customerId, contactId, data) =>
		axiosInstance.put(
			`${ENDPOINT}/${customerId}/contacts/${contactId}`,
			data,
		),

	// Delete contact
	deleteContact: (customerId, contactId) =>
		axiosInstance.delete(`${ENDPOINT}/${customerId}/contacts/${contactId}`),

	// Get customer addresses
	getAddresses: (customerId) =>
		axiosInstance.get(`${ENDPOINT}/${customerId}/addresses`),

	// Get customer orders
	getOrders: (customerId, params = {}) =>
		axiosInstance.get(`${ENDPOINT}/${customerId}/orders`, { params }),

	// Get customer quotations
	getQuotations: (customerId, params = {}) =>
		axiosInstance.get(`${ENDPOINT}/${customerId}/quotations`, { params }),

	// Get customer credit info
	getCreditInfo: (customerId) =>
		axiosInstance.get(`${ENDPOINT}/${customerId}/credit`),

	// Import customers
	importCustomers: (file) => {
		const formData = new FormData();
		formData.append('file', file);
		return axiosInstance.post(`${ENDPOINT}/import`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	},

	// Export customers
	exportCustomers: (params = {}) =>
		axiosInstance.get(`${ENDPOINT}/export`, {
			params,
			responseType: 'blob',
		}),
};

export default customerService;
