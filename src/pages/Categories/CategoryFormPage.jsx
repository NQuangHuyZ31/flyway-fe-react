// src/pages/Categories/CategoryFormPage.jsx
// Create/Edit Category Form Page

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
	Container,
	Box,
	TextField,
	Button,
	Typography,
	FormControlLabel,
	Checkbox,
	Alert,
	CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { useForm, Controller } from 'react-hook-form';
import { useToast } from '../../contexts/ToastContext';
import categoryService from '../../api/services/categoryService';

/**
 * Category Form Page
 * Handle create and edit category via form
 * Uses React Hook Form for validation
 */
export default function CategoryFormPage() {
	const navigate = useNavigate();
	const { id } = useParams();
	const location = useLocation();
	const { showToast } = useToast();

	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState(null);

	const isEditMode = !!id;

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting: formIsSubmitting },
	} = useForm({
		defaultValues: {
			name: '',
			slug: '',
			is_active: true,
		},
	});

	// Load category data for edit mode
	useEffect(() => {
		const loadCategory = async () => {
			if (!isEditMode) return;

			try {
				setIsLoading(true);
				setError(null);

				// Try to get category from location state first (faster)
				const category = location.state?.category;
				if (category) {
					reset({
						name: category.name || '',
						slug: category.slug || '',
						is_active: category.is_active ?? true,
					});
					return;
				}

				// Otherwise fetch from API
				const data = await categoryService.getCategory(id);
				reset({
					name: data.name || '',
					slug: data.slug || '',
					is_active: data.is_active ?? true,
				});
			} catch (err) {
				setError(err.message || 'Không thể tải danh mục');
				showToast(err.message || 'Không thể tải danh mục', 'error');
			} finally {
				setIsLoading(false);
			}
		};

		loadCategory();
	}, [id, isEditMode, reset, location.state, showToast]);

	/**
	 * Handle form submission
	 * React Hook Form validates before calling this
	 */
	const onSubmit = async (data) => {
		try {
			setIsSubmitting(true);
			setError(null);

			if (isEditMode) {
				await categoryService.updateCategory(id, data);
				showToast('Cập nhật danh mục thành công', 'success');
			} else {
				await categoryService.createCategory(data);
				showToast('Tạo danh mục thành công', 'success');
			}

			navigate('/categories');
		} catch (err) {
			const errorMsg = err.message || 'Lỗi khi lưu danh mục';
			setError(errorMsg);
			showToast(errorMsg, 'error');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Container maxWidth="sm" sx={{ py: 3 }}>
			{/* Header */}
			<Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
				<Button
					startIcon={<ArrowBackIcon />}
					onClick={() => navigate('/categories')}
					variant="text"
				>
					Quay lại
				</Button>
				<Typography variant="h4">
					{isEditMode ? 'Sửa danh mục' : 'Tạo danh mục mới'}
				</Typography>
			</Box>

			{/* Error State */}
			{error && (
				<Alert severity="error" sx={{ mb: 3 }}>
					{error}
				</Alert>
			)}

			{/* Loading State */}
			{isLoading && (
				<CircularProgress
					sx={{ display: 'block', margin: '30px auto' }}
				/>
			)}

			{/* Form */}
			{!isLoading && (
				<Box component="form" onSubmit={handleSubmit(onSubmit)}>
					{/* Name Field */}
					<Controller
						name="name"
						control={control}
						rules={{
							required: 'Tên danh mục không được để trống',
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label="Tên danh mục"
								placeholder="Nhập tên danh mục"
								fullWidth
								margin="normal"
								error={!!errors.name}
								helperText={errors.name?.message}
								disabled={isSubmitting || formIsSubmitting}
							/>
						)}
					/>

					{/* Slug Field */}
					<Controller
						name="slug"
						control={control}
						rules={{
							required: 'Slug không được để trống',
							pattern: {
								value: /^[a-z0-9-]+$/,
								message:
									'Slug không hợp lệ (chỉ chứa chữ thường, số và dấu gạch ngang)',
							},
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label="Slug"
								placeholder="Nhập slug (lowercase, hyphen-separated)"
								fullWidth
								margin="normal"
								error={!!errors.slug}
								helperText={
									errors.slug?.message ||
									'Ví dụ: an-vat, nuoc-uong'
								}
								disabled={isSubmitting || formIsSubmitting}
							/>
						)}
					/>

					{/* Active Checkbox */}
					<Controller
						name="is_active"
						control={control}
						render={({ field }) => (
							<FormControlLabel
								control={
									<Checkbox
										{...field}
										checked={field.value}
										disabled={
											isSubmitting || formIsSubmitting
										}
									/>
								}
								label="Hoạt động"
								sx={{ my: 2 }}
							/>
						)}
					/>

					{/* Submit Buttons */}
					<Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<SaveIcon />}
							type="submit"
							disabled={isSubmitting || formIsSubmitting}
							fullWidth
						>
							{isSubmitting ? 'Đang lưu...' : 'Lưu'}
						</Button>
						<Button
							variant="outlined"
							size="large"
							onClick={() => navigate('/categories')}
							disabled={isSubmitting || formIsSubmitting}
						>
							Hủy
						</Button>
					</Box>
				</Box>
			)}
		</Container>
	);
}
