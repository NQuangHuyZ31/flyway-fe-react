// src/api/services/productService.js
// Product management API service

import axiosInstance from '../axiosConfig';

const ENDPOINT = '/products';

// List all products with filters
const getProducts = async (params = {}) => {
	try {
		const res = await axiosInstance.get(ENDPOINT, { params });
		return res.data;
	} catch (error) {
		const message =
			error.response?.data?.message || 'Tải sản phẩm thất bại';
		throw new Error(message);
	}
};

// Get single product by ID
const getProduct = async (id) => {
	try {
		const res = await axiosInstance.get(`${ENDPOINT}/${id}`);
		return res.data;
	} catch (error) {
		const message =
			error.response?.data?.message || 'Tải sản phẩm thất bại';
		throw new Error(message);
	}
};

const createProduct = async (data) => {
	try {
		const res = await axiosInstance.post(ENDPOINT, data);
		return res.data;
	} catch (error) {
		const message =
			error.response?.data?.message || 'Tạo sản phẩm thất bại';
		throw new Error(message);
	}
};

const updateProduct = async (id, data) => {
	try {
		const res = await axiosInstance.put(`${ENDPOINT}/${id}`, data);
		return res.data;
	} catch (error) {
		const message =
			error.response?.data?.message || 'Cập nhật sản phẩm thất bại';
		throw new Error(message);
	}
};

const deleteProduct = async (id) => {
	try {
		const res = await axiosInstance.delete(`${ENDPOINT}/${id}`);
		return res.data;
	} catch (error) {
		const message =
			error.response?.data?.message || 'Xóa sản phẩm thất bại';
		throw new Error(message);
	}
};

const ProductService = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};

export default ProductService;
