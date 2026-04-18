import React, { useEffect, useRef } from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	FormControlLabel,
	Checkbox,
	CircularProgress,
	Box,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useForm, Controller } from 'react-hook-form';
import Button from '../../common/Button';
import { useToast } from '../../../contexts/ToastContext';
import categoryService from '../../../api/services/categoryService';
import InputCreateForm from '../../common/InputCreateForm';

/**
 * Category Form Modal Component
 * Used for both Create and Edit category
 * Props:
 *   - open: boolean - Modal open state
 *   - onClose: function - Close modal handler
 *   - onSuccess: function - Success callback after save
 *   - categoryData: object - Category data for edit mode (null for create)
 */
export default function CategoryFormModal({
	open,
	onClose,
	onSave,
	onSuccess,
	categoryData = null,
}) {
	const { showToast } = useToast();
	const fieldRefs = useRef({});
	const isEditMode = !!categoryData;

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
			slug: '',
			is_active: true,
		},
	});

	// Load category data when modal opens in edit mode
	useEffect(() => {
		if (open) {
			clearErrors();
			if (isEditMode && categoryData) {
				reset({
					name: categoryData.name || '',
					slug: categoryData.slug || '',
					is_active: categoryData.is_active ?? true,
				});
			} else if (!isEditMode) {
				// Reset form for create mode
				reset({
					name: '',
					slug: '',
					is_active: true,
				});
			}
		}
	}, [open, isEditMode, categoryData, reset, clearErrors]);

	/**
	 * Handle form submission
	 */
	const onSubmit = async (data) => {
		onSave(data, isEditMode ? categoryData.id : null);
	};

	const handleClose = () => {
		if (!isSubmitting) {
			onClose();
			clearErrors();
			reset();
		}
	};

	console.log('errors:', errors);

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
			{/* Dialog Title */}
			<DialogTitle>
				{isEditMode ? 'Sửa danh mục' : 'Tạo danh mục mới'}
			</DialogTitle>

			{/* Dialog Content */}
			<DialogContent dividers sx={{ pt: 2 }}>
				<form
					id="category-form"
					onSubmit={handleSubmit(onSubmit)}
					noValidate
				>
					{/* Name Field */}
					<InputCreateForm
						label={'Tên danh mục'}
						name={'name'}
						register={register}
						placeholder={'Nhập tên danh mục'}
						rules={{
							required: 'Tên danh mục không được để trống',
						}}
						fullWidth
						errors={errors}
						disabled={isSubmitting}
						fieldRefs={fieldRefs}
					/>
					{/* Slug Field */}
					<InputCreateForm
						label={'Slug'}
						name={'slug'}
						register={register}
						placeholder={'Nhập slug (tự động tạo nếu để trống)'}
						fullWidth
						// error={errors}
						disabled={isSubmitting}
						fieldRefs={fieldRefs}
					/>

					{/* Active Checkbox */}
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
					disabled={isSubmitting}
					startIcon={<CancelIcon />}
				>
					Hủy
				</Button>
				<Button
					variant="contained"
					color="primary"
					// onClick={handleSubmit(onSubmit)}
					type="submit"
					form="category-form"
					disabled={isSubmitting}
					startIcon={<SaveIcon />}
				>
					{isSubmitting ? 'Đang lưu...' : 'Lưu'}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
