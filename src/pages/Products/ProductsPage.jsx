// src/pages/products/ProductsPage.jsx
// Products list page with CRUD operations

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useToast } from '../../contexts/ToastContext';
import ProductTable from '../../components/features/products/ProductTable';
import useListData from '../../hooks/useListData';
import productService from '../../api/services/productService';
import { fetchProducts, deleteProduct } from '../../store/slices/productSlice';
import { useActionHook } from '@/hooks/useActionHook';
import { useFormModal } from '@/hooks/useFormModal';

const ProductsPage = () => {
	const navigate = useNavigate();
	const { showToast } = useToast();

	// Consolidate all list logic into one hook
	const {
		data: products,
		loading,
		error,
		pagination,
		filters,
		mutate,
		addItem,
		updateItem,
		removeItem,
		updateTotal,
		headerFilters,
		onPaginationChange,
		onClearFilters,
		onSearchfilter,
	} = useListData({
		fetchDataURL: (params) => productService.getProducts(params),
		defaultPerPage: 25,
	});

	const { deleteAction } = useActionHook({ addItem, updateItem, removeItem });
	const deletedFormModal = useFormModal();

	const confirmDelete = async () => {
		if (!deletedFormModal.formModal.data) return;

		try {
			await deleteAction(
				deletedFormModal.formModal.data.id,
				productService.deleteProduct,
			);
			showToast('Sản phẩm đã được xóa', 'success');

			deletedFormModal.close();
		} catch (error) {
			showToast(error.message || 'Xóa sản phẩm thất bại', 'error');
		}
	};

	/**
	 * Handle exporting products to CSV
	 */
	const handleExport = useCallback(async () => {
		try {
			showToast('Exporting products...', 'info');
			// TODO: Implement actual export functionality
			showToast('Products exported successfully', 'success');
		} catch (error) {
			showToast('Failed to export products', 'error');
		}
	}, [showToast]);

	/**
	 * Handle importing products from file
	 */
	const handleImport = useCallback(() => {
		// TODO: Open import modal or trigger file input
		showToast('Import functionality coming soon', 'info');
	}, [showToast]);

	return (
		<Container maxWidth="xl" sx={{ py: 3 }}>
			{/* Page Header */}
			<Box sx={{ mb: 4 }}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						mb: 3,
					}}
				>
					<Typography
						variant="body2"
						sx={{ color: 'text.secondary' }}
					>
						Tổng cộng: <strong>{pagination.total} sản phẩm</strong>
					</Typography>
					<Box sx={{ display: 'flex', gap: 1 }}>
						<Button
							variant="contained"
							color="primary"
							startIcon={<AddIcon />}
							onClick={() => navigate('/products/create')}
							size="large"
							sx={{ textTransform: 'none' }}
						>
							Thêm Sản Phẩm
						</Button>
						<Button
							variant="outlined"
							size="small"
							startIcon={<DownloadIcon />}
							onClick={handleExport}
							disabled={products.length === 0 || loading}
							sx={{ textTransform: 'none' }}
						>
							Xuất
						</Button>

						<Button
							variant="outlined"
							size="small"
							startIcon={<UploadIcon />}
							onClick={handleImport}
							sx={{ textTransform: 'none' }}
						>
							Nhập
						</Button>
					</Box>
				</Box>
			</Box>

			{/* Products Table */}
			<ProductTable
				products={products}
				columns={headerFilters}
				isLoading={loading}
				pagination={{
					per_page: pagination.per_page,
					page: pagination.page,
				}}
				total={pagination.total}
				filters={filters}
				headerFilters={headerFilters}
				onDelete={(product) => deletedFormModal.open(product)}
				onView={(id) => navigate(`/products/${id}/detail`)}
				onSearchfilter={onSearchfilter}
				onClearFilters={onClearFilters}
				onPageChange={onPaginationChange}
			/>

			{/* Delete Confirmation Dialog */}
			<ConfirmDialog
				open={deletedFormModal.formModal.open}
				onCancel={deletedFormModal.close}
				onConfirm={confirmDelete}
				title="Xác nhận xóa"
				message={`Bạn có chắc chắn muốn xóa sản phẩm "${deletedFormModal.formModal.data?.product_name}"?`}
				isDanger={true}
			/>
		</Container>
	);
};

export default ProductsPage;
