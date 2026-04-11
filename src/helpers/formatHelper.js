export const formatCurrency = (value) => {
	if (value === null || value === undefined) return '-';
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
	}).format(value);
};
