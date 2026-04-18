// src/pages/Units/UnitsContainer.jsx
// Units Container - Container Layer
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
import UnitsTable from '../../components/features/units/UnitsTable';
import UnitFormModal from '@/components/features/Units/UnitFormModal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import useListData from '../../hooks/useListData';
import unitMeasureService from '../../api/services/unitMeasureService';
import { useActionHook } from '../../hooks/useActionHook';
import { useFormModal } from '../../hooks/useFormModal';

/**
 * Units Container
 * Container Layer: Data fetching via useApi hook
 * Manages modals for create/edit/delete operations
 */
export default function UnitsContainer() {
	const { showToast } = useToast();

	// Modal states
	const formModal = useFormModal();
	const deletedModal = useFormModal();
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Fetch units data with pagination and filtering
	const {
		data: units,
		loading,
		error,
		pagination,
		filters,
		addItem,
		updateItem,
		removeItem,
		updateTotal,
		headerFilters,
		onSearchfilter,
		onPaginationChange,
		onClearFilters,
	} = useListData({
		fetchDataURL: (params) => unitMeasureService.getUnitMeasures(params),
		defaultPerPage: 25,
	});

	const { createAction, updateAction, deleteAction } = useActionHook({
		addItem,
		updateItem,
		removeItem,
	});

	// handle save (create or update)
	const handleSave = async (data, unitId) => {
		try {
			if (unitId) {
				// Update existing unit
				await updateAction(
					unitId,
					data,
					unitMeasureService.updateUnitMeasure,
				);
				showToast('Cập nhật đơn vị thành công', 'success');
			} else {
				// Create new unit
				await createAction(data, unitMeasureService.createUnitMeasure);
				showToast('Tạo đơn vị thành công', 'success');
			}
			formModal.close();
		} catch (error) {
			showToast(error.message || 'Lỗi khi lưu đơn vị', 'error');
		}
	};

	// handle delete
	const handleConfirmDelete = async () => {
		if (!deletedModal.formModal.data) return;
		setIsSubmitting(true);

		try {
			await deleteAction(
				deletedModal.formModal.data.id,
				unitMeasureService.deleteUnitMeasure,
			);
			showToast('Xóa đơn vị thành công', 'success');
		} catch (error) {
			showToast(error.message || 'Lỗi khi xóa đơn vị', 'error');
		} finally {
			setIsSubmitting(false);
			deletedModal.close();
		}
	};

	return (
		<Container maxWidth="xl" sx={{ py: 1 }}>
			{/* Page Header */}
			<Box sx={{ mb: 1 }}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						mb: 1,
					}}
				>
					<Typography variant="h4">Đơn vị tính</Typography>
					<Box sx={{ display: 'flex', gap: 1 }}>
						<Button
							variant="contained"
							color="primary"
							startIcon={<AddIcon />}
							onClick={() => formModal.open()}
							size="large"
						>
							Tạo đơn vị
						</Button>
					</Box>
				</Box>

				<Typography variant="body2" color="text.secondary">
					Tổng cộng: <strong>{pagination.total} đơn vị</strong>
				</Typography>
			</Box>

			{/* Feature Layer */}
			<UnitsTable
				units={units}
				columns={headerFilters}
				headerFilters={headerFilters}
				pagination={pagination}
				total={pagination.total}
				filters={filters}
				isLoading={loading}
				showActions={true}
				onPageChange={onPaginationChange}
				onEdit={(unit) => formModal.open(unit)}
				onDelete={(unit) => deletedModal.open(unit)}
				onSearchfilter={onSearchfilter}
				onClearFilters={onClearFilters}
			/>

			{/* Form Modal - Create/Edit */}
			<UnitFormModal
				open={formModal.formModal.open}
				onClose={formModal.close}
				onSave={handleSave}
				unitData={formModal.formModal.data}
			/>

			{/* Delete Confirmation Dialog */}
			<ConfirmDialog
				open={deletedModal.formModal.open}
				title="Xóa đơn vị"
				message={`Bạn có chắc chắn muốn xóa đơn vị "${deletedModal.formModal.data?.name}"? Hành động này không thể hoàn tác.`}
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
