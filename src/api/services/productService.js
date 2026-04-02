// src/api/services/productService.js
// Product management API service

import axiosInstance from '../axiosConfig';

const ENDPOINT = '/products';

export const productService = {
	// List all products with filters
	getProducts: (params = {}) => axiosInstance.get(ENDPOINT, { params }),

	// Get single product by ID
	getProduct: (id) => axiosInstance.get(`${ENDPOINT}/${id}`),

	// Create new product
	createProduct: (data) => axiosInstance.post(ENDPOINT, data),

	// Update product
	updateProduct: (id, data) => axiosInstance.put(`${ENDPOINT}/${id}`, data),

	// Delete product
	deleteProduct: (id) => axiosInstance.delete(`${ENDPOINT}/${id}`),

	// Get product batches
	getBatches: (productId, params = {}) =>
		axiosInstance.get(`${ENDPOINT}/${productId}/batches`, { params }),

	// Create product batch
	createBatch: (productId, data) =>
		axiosInstance.post(`${ENDPOINT}/${productId}/batches`, data),

	// Get product categories
	getCategories: (params = {}) =>
		axiosInstance.get('/categories', { params }),

	// Create category
	createCategory: (data) => axiosInstance.post('/categories', data),

	// Update category
	updateCategory: (id, data) => axiosInstance.put(`/categories/${id}`, data),

	// Delete category
	deleteCategory: (id) => axiosInstance.delete(`/categories/${id}`),

	// Get units of measure
	getUnits: () => axiosInstance.get('/units-of-measure'),

	// Bulk import products
	importProducts: (file) => {
		const formData = new FormData();
		formData.append('file', file);
		return axiosInstance.post(`${ENDPOINT}/import`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	},

	// Export products
	exportProducts: (params = {}) =>
		axiosInstance.get(`${ENDPOINT}/export`, {
			params,
			responseType: 'blob',
		}),
};

export default productService;
