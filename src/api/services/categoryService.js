import axiosInstance from '../axiosConfig';
import { validateHelper } from '@/helpers/validateHelper';

const END_POINT = '/categories';

/**
 * List all categories with optional pagination
 */
export const getCategories = async (params = {}) => {
	try {
		const res = await axiosInstance.get(END_POINT, { params });
		// Return full response structure for useListData hook
		return res.data.data || [];
	} catch (error) {
		const message = validateHelper(error);
		throw new Error(message);
	}
};

/**
 * Get single category by ID
 */
export const getCategory = async (id) => {
	try {
		const res = await axiosInstance.get(`${END_POINT}/${id}`);
		// Extract data from response wrapper
		return res.data.data || res.data;
	} catch (error) {
		const message = validateHelper(error);
		throw new Error(message);
	}
};

/**
 * Create new category
 */
export const createCategory = async (data) => {
	try {
		const res = await axiosInstance.post(END_POINT, data);
		return res.data.data || res.data;
	} catch (error) {
		const message = validateHelper(error);
		throw new Error(message);
	}
};

/**
 * Update existing category
 */
export const updateCategory = async (id, data) => {
	try {
		const res = await axiosInstance.put(`${END_POINT}/${id}`, data);
		return res.data.data || res.data;
	} catch (error) {
		const message = validateHelper(error);
		throw new Error(message);
	}
};

/**
 * Delete category
 */
export const deleteCategory = async (id) => {
	try {
		const res = await axiosInstance.delete(`${END_POINT}/${id}`);
		return res.data.data || res.data;
	} catch (error) {
		const message = validateHelper(error);
		throw new Error(message);
	}
};

const categoryService = {
	getCategories,
	getCategory,
	createCategory,
	updateCategory,
	deleteCategory,
};

export default categoryService;
