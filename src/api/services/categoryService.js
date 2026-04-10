import axiosInstance from '../axiosConfig';

const END_POINT = '/categories';

export const getCategories = async () => {
	try {
		const res = await axiosInstance.get(END_POINT);
		return res.data;
	} catch (error) {
		const message =
			error.response?.data?.message || 'Failed to fetch categories';
		throw new Error(message);
	}
};

const CategoryService = {
	getCategories,
};

export default CategoryService;
