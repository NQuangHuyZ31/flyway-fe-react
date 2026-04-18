import axiosInstance from '../axiosConfig';
import { validateHelper } from '@/helpers/validateHelper';

const END_POINT = '/units';

/**
 * List all units with optional pagination
 */
export const getUnitMeasures = async (params = {}) => {
	try {
		const res = await axiosInstance.get(END_POINT, { params });
		return res.data.data || [];
	} catch (error) {
		const message = validateHelper(error);
		throw new Error(message);
	}
};

/**
 * Get single unit by ID
 */
export const getUnitMeasure = async (id) => {
	try {
		const res = await axiosInstance.get(`${END_POINT}/${id}`);
		return res.data.data || res.data;
	} catch (error) {
		const message = validateHelper(error);
		throw new Error(message);
	}
};

/**
 * Create new unit
 */
export const createUnitMeasure = async (data) => {
	try {
		const res = await axiosInstance.post(END_POINT, data);
		return res.data.data || res.data;
	} catch (error) {
		const message = validateHelper(error);
		console.log('Error creating unit:', error, 'message:', message);
		throw new Error(message);
	}
};

/**
 * Update existing unit
 */
export const updateUnitMeasure = async (id, data) => {
	try {
		const res = await axiosInstance.put(`${END_POINT}/${id}`, data);
		return res.data.data || res.data;
	} catch (error) {
		const message = validateHelper(error);
		throw new Error(message);
	}
};

/**
 * Delete unit
 */
export const deleteUnitMeasure = async (id) => {
	try {
		const res = await axiosInstance.delete(`${END_POINT}/${id}`);
		return res.data.data || res.data;
	} catch (error) {
		const message = validateHelper(error);
		throw new Error(message);
	}
};

const unitMeasureService = {
	getUnitMeasures,
	getUnitMeasure,
	createUnitMeasure,
	updateUnitMeasure,
	deleteUnitMeasure,
};

export default unitMeasureService;
