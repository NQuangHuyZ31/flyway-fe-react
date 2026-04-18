// src/components/features/units/UnitFormModal.jsx
// Create/Edit Unit Form Modal
// Reusable modal for both create and edit operations

import React, { useEffect, useRef } from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	CircularProgress,
	Box,
	FormControlLabel,
	Checkbox,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { Controller, useForm } from 'react-hook-form';
import Button from '../../common/Button';
import { useToast } from '../../../contexts/ToastContext';
import unitMeasureService from '../../../api/services/unitMeasureService';
import InputCreateForm from '../../common/InputCreateForm';

/**
 * Unit Form Modal Component
 * Used for both Create and Edit unit
 * Props:
 *   - open: boolean - Modal open state
 *   - onClose: function - Close modal handler
 *   - onSuccess: function - Success callback after save
 *   - unitData: object - Unit data for edit mode (null for create)
 */
export default function UnitFormModal({
	open,
	onClose,
	onSave,
	unitData = null,
}) {
	const { showToast } = useToast();
	const fieldRefs = useRef({});
	const isEditMode = !!unitData;

	const {
		register,
		handleSubmit,
		control,
		setError,
		clearErrors,
		getValues,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			name: '',
			code: '',
			abbreviation: '',
			is_active: 1,
		},
	});

	// Load unit data when modal opens in edit mode
	useEffect(() => {
		if (open) {
			clearErrors();
			if (isEditMode && unitData) {
				reset({
					name: unitData.name || '',
					code: unitData.code || '',
					abbreviation: unitData.abbreviation || '',
					is_active: unitData.is_active || 1,
				});
			} else if (!isEditMode) {
				// Reset form for create mode
				reset({
					name: '',
					code: '',
					abbreviation: '',
					is_active: 1,
				});
			}
		}
	}, [open, isEditMode, unitData, reset, clearErrors]);

	/**
	 * Handle form submission
	 */
	const onSubmit = async (data) => {
		try {
			onSave(data, isEditMode ? unitData.id : null);
		} catch (err) {
			showToast(err.message || 'Lỗi khi lưu đơn vị', 'error');
		}
	};

	const handleClose = () => {
		onClose();
	};

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
			{/* Dialog Title */}
			<DialogTitle>
				{isEditMode ? 'Sửa đơn vị' : 'Tạo đơn vị mới'}
			</DialogTitle>

			{/* Dialog Content */}
			<DialogContent dividers sx={{ pt: 2, pb: 4 }}>
				<form id="unit-form" onSubmit={handleSubmit(onSubmit)}>
					{/* Name Field */}
					<InputCreateForm
						label={'Tên đơn vị'}
						name={'name'}
						register={register}
						placeholder={'Nhập tên đơn vị'}
						rules={{
							required: 'Tên đơn vị không được để trống',
						}}
						fullWidth
						errors={errors}
						fieldRefs={fieldRefs}
					/>
					{/* Code Field */}
					<InputCreateForm
						label={'Mã đơn vị'}
						name={'code'}
						register={register}
						placeholder={'Nhập mã đơn vị'}
						rules={{
							required: 'Mã đơn vị không được để trống',
						}}
						fullWidth
						errors={errors}
						fieldRefs={fieldRefs}
					/>
					{/* Abbreviation Field */}
					<InputCreateForm
						label={'Tên viết tắt'}
						name={'abbreviation'}
						register={register}
						placeholder={'Nhập tên viết tắt (tùy chọn)'}
						fullWidth
						errors={errors}
						fieldRefs={fieldRefs}
					/>

					{/* Active Status Field */}
					<FormControlLabel
						control={
							<Controller
								name="is_active"
								control={control}
								render={({ field }) => (
									<Checkbox
										{...field}
										checked={field.value}
										disabled={isSubmitting}
									/>
								)}
							/>
						}
						label="Kích hoạt"
						sx={{ mt: 2 }}
					/>
				</form>
			</DialogContent>

			{/* Dialog Actions */}
			<DialogActions sx={{ p: 2, gap: 1 }}>
				<Button
					variant="outlined"
					color="secondary"
					onClick={handleClose}
					startIcon={<CancelIcon />}
				>
					Hủy
				</Button>
				<Button
					variant="contained"
					color="primary"
					type="submit"
					startIcon={<SaveIcon />}
				>
					Lưu
				</Button>
			</DialogActions>
		</Dialog>
	);
}
