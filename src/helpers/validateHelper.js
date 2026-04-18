export const validateHelper = () => {
	const validateError = (error) => {
		if (!error) return null;

		const message =
			error?.response?.data?.errors?.name?.[0] ||
			error?.response?.data?.message ||
			error.message ||
			'Lỗi không xác định';

		return message;
	};
};
