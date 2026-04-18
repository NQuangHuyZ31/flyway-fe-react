// src/api/services/productService.js
// Product management API service

import { validateHelper } from '@/helpers/validateHelper';
import axiosInstance from '../axiosConfig';

const ENDPOINT = '/products';

// List all products with filters
const getProducts = async (params = {}) => {
	try {
		const res = await axiosInstance.get(ENDPOINT, { params });
		return res.data.data || [];
	} catch (error) {
		const message = validateHelper(error);
		throw new Error(message);
	}
};

// Get single product by ID
const getProduct = async (id) => {
	try {
		const res = await axiosInstance.get(`${ENDPOINT}/${id}`);
		return res.data.data;
	} catch (error) {
		const message = validateHelper(error);
		throw new Error(message);
	}
};

const createProduct = async (data) => {
	try {
		const res = await axiosInstance.post(ENDPOINT, data);
		return res.data.data;
	} catch (error) {
		const message = validateHelper(error);
		throw new Error(message);
	}
};

const updateProduct = async (id, data) => {
	try {
		const res = await axiosInstance.put(`${ENDPOINT}/${id}`, data);
		return res.data.data;
	} catch (error) {
		const message = validateHelper(error);
		throw new Error(message);
	}
};

const deleteProduct = async (id) => {
	try {
		const res = await axiosInstance.delete(`${ENDPOINT}/${id}`);
		return res.data.data;
	} catch (error) {
		const message = validateHelper(error);
		throw new Error(message);
	}
};

const getProductBatches = async (productId, params = {}) => {
	try {
		const res = await axiosInstance.get(
			`${ENDPOINT}/${productId}/batches`,
			{ params },
		);
		return res.data.data || [];
	} catch (error) {
		const message = validateHelper(error);
		throw new Error(message);
	}
};

const checkDuplicate = async (field, value) => {
	try {
		const res = await axiosInstance.post(`${ENDPOINT}/check-duplicate`, {
			field,
			value,
		});
		return res.data;
	} catch (error) {
		const message = validateHelper(error);
		throw new Error(message);
	}
};

const productService = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
	getProductBatches,
	checkDuplicate,
};

export default productService;
