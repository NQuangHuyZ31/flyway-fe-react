import axiosInstance from '../axiosConfig';

const END_POINTS = '/units-of-measure';
const getUnutMeasures = async () => {
	try {
		const res = await axiosInstance.get(END_POINTS);
		return res.data;
	} catch (error) {
		const message =
			error.response?.data?.message ||
			error.message ||
			'Failed to load unit measures';
	}
};

const UnitMesureService = {
	getUnutMeasures,
};

export default UnitMesureService;
