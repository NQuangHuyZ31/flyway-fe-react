// src/api/services/voucherService.js
// Stock voucher API service (Input & Output)

import axiosInstance from '../axiosConfig';

export const voucherService = {
	// Stock Input Vouchers
	getInputVouchers: (params = {}) =>
		axiosInstance.get('/stock-input-vouchers', { params }),

	createInputVoucher: (data) =>
		axiosInstance.post('/stock-input-vouchers', data),

	getInputVoucher: (id) => axiosInstance.get(`/stock-input-vouchers/${id}`),

	updateInputVoucher: (id, data) =>
		axiosInstance.put(`/stock-input-vouchers/${id}`, data),

	deleteInputVoucher: (id) =>
		axiosInstance.delete(`/stock-input-vouchers/${id}`),

	// Add items to input voucher
	addInputItems: (voucherId, items) =>
		axiosInstance.post(`/stock-input-vouchers/${voucherId}/items`, {
			items,
		}),

	// Stock Output Vouchers
	getOutputVouchers: (params = {}) =>
		axiosInstance.get('/stock-output-vouchers', { params }),

	createOutputVoucher: (data) =>
		axiosInstance.post('/stock-output-vouchers', data),

	getOutputVoucher: (id) => axiosInstance.get(`/stock-output-vouchers/${id}`),

	updateOutputVoucher: (id, data) =>
		axiosInstance.put(`/stock-output-vouchers/${id}`, data),

	deleteOutputVoucher: (id) =>
		axiosInstance.delete(`/stock-output-vouchers/${id}`),

	// Add items to output voucher with batch allocation
	addOutputItems: (voucherId, items) =>
		axiosInstance.post(`/stock-output-vouchers/${voucherId}/items`, {
			items,
		}),

	// Voucher Status & Approvals
	changeVoucherStatus: (voucherId, status, data = {}) =>
		axiosInstance.post(`/vouchers/${voucherId}/status/${status}`, data),

	getPendingApprovals: (params = {}) =>
		axiosInstance.get('/vouchers/approvals/pending', { params }),

	approveVoucher: (voucherId, data = {}) =>
		axiosInstance.post(`/vouchers/${voucherId}/approve`, data),

	rejectVoucher: (voucherId, data = {}) =>
		axiosInstance.post(`/vouchers/${voucherId}/reject`, data),

	getVoucherHistory: (voucherId) =>
		axiosInstance.get(`/vouchers/${voucherId}/history`),

	// Batch allocation
	allocateBatch: (voucherId, itemId, batchId, quantity) =>
		axiosInstance.post(
			`/vouchers/${voucherId}/items/${itemId}/allocate-batch`,
			{
				batch_id: batchId,
				quantity,
			},
		),
};

export default voucherService;
