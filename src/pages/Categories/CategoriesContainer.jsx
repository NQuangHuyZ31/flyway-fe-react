// src/pages/Categories/CategoriesContainer.jsx
// Categories Container - Container Layer
// Fetches data via useApi and passes to feature layer

import React, { useState, useCallback } from 'react';
import {
	Container,
	Box,
	Button,
	Typography,
	Alert,
	CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import { useToast } from '../../contexts/ToastContext';
import Categoriestable from '../../components/features/categories/CategoriesTable';
import CategoryFormModal from '../../components/features/categories/CategoryFormModal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import useListData from '../../hooks/useListData';
import categoryService from '../../api/services/categoryService';
import { useActionHook } from '../../hooks/useActionHook';
import { useFormModal } from '../../hooks/useFormModal';

/**
 * Categories Container
 * Container Layer: Data fetching via useApi hook
 * Manages modals for create/edit/delete operations
 */
export default function CategoriesContainer() {
	const { showToast } = useToast();

	// Modal states
	const formModal = useFormModal();
	const deletedModal = useFormModal();

	const [isSubmitting, setIsSubmitting] = useState(false);

	// Fetch categories data with pagination and filtering
	const {
		data: categories,
		loading,
		error,
		pagination,
		addItem,
		updateItem,
		removeItem,
		filters,
		headerFilters,
		onSearchfilter,
		onPaginationChange,
		onClearFilters,
	} = useListData({
		fetchDataURL: (params) => categoryService.getCategories(params),
		defaultPerPage: 25,
	});

	const { createAction, updateAction, deleteAction } = useActionHook({
		addItem,
		updateItem,
		removeItem,
	});

	/**
	 * Handle successful save
	 */
	const handleSave = async (data, categoryId) => {
		try {
			if (categoryId) {
				// Update existing category
				await updateAction(
					categoryId,
					data,
					categoryService.updateCategory,
				);
				showToast('Danh mục đã được cập nhật', 'success');
			} else {
				// Create new category, add to list
				await createAction(data, categoryService.createCategory);
				showToast('Danh mục đã được tạo', 'success');
			}

			formModal.close();
		} catch (error) {
			showToast(error.message || 'Lưu danh mục thất bại', 'error');
		}
	};

	/**
	 * Confirm and execute delete
	 */
	const handleConfirmDelete = async () => {
		if (!deletedModal.formModal.data) return;
		setIsSubmitting(true);
		try {
			await deleteAction(
				deletedModal.formModal.data.id,
				categoryService.deleteCategory,
			);
			showToast('Danh mục đã được xóa', 'success');
			deletedModal.close();
		} catch (error) {
			showToast(error.message || 'Xóa danh mục thất bại', 'error');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Container maxWidth="xl" sx={{ py: 1 }}>
			{/* Page Header */}
			<Box sx={{ mb: 1 }}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'center',
						mb: 1,
					}}
				>
					<Box sx={{ display: 'flex', gap: 1 }}>
						<Button
							variant="contained"
							color="primary"
							startIcon={<AddIcon />}
							onClick={() => formModal.open()}
							size="large"
						>
							Tạo danh mục
						</Button>
					</Box>
				</Box>

				{!loading && pagination && (
					<Typography variant="body2" color="text.secondary">
						Tổng cộng: <strong>{pagination.total} danh mục</strong>
					</Typography>
				)}
			</Box>

			{/* Feature Layer */}
			<Categoriestable
				categories={categories}
				columns={headerFilters}
				headerFilters={headerFilters}
				pagination={pagination}
				total={pagination.total}
				filters={filters}
				isLoading={loading}
				showActions={true}
				onPageChange={onPaginationChange}
				onEdit={(category) => formModal.open(category)}
				onDelete={(category) => deletedModal.open(category)}
				onSearchfilter={onSearchfilter}
				onClearFilters={onClearFilters}
			/>

			{/* Form Modal - Create/Edit */}
			<CategoryFormModal
				open={formModal.formModal.open}
				onClose={formModal.close}
				onSave={handleSave}
				categoryData={formModal.formModal.data}
			/>

			{/* Delete Confirmation Dialog */}
			<ConfirmDialog
				open={deletedModal.formModal.open}
				title="Xóa danh mục"
				message={`Bạn có chắc chắn muốn xóa danh mục "${deletedModal.formModal.data?.name}"? Hành động này không thể hoàn tác.`}
				confirmText="Xóa"
				cancelText="Hủy"
				severity="error"
				onConfirm={handleConfirmDelete}
				onCancel={deletedModal.close}
				isSubmitting={isSubmitting}
			/>
		</Container>
	);
}
