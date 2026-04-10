// src/components/features/products/ProductForm.jsx
// Reusable Product Form Component for Create and Edit

import React, { useState, useEffect } from 'react';
import {
	Box,
	Grid,
	Paper,
	Button,
	CircularProgress,
	Alert,
	Stack,
	Divider,
	Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import Input from '../../common/Input';
import SelectCategory from './SelectCategory';
import SelectUnit from './SelectUnit';
import ProductService from '../../../api/services/productService';
import { useToast } from '../../../contexts/ToastContext';

/**
 * ProductForm Component
 * Reusable form for creating and editing products
 * Supports both create and edit modes with different submit handlers
 *
 * @param {string} mode - 'create' or 'edit'
 * @param {object} initialData - Product data for edit mode
 * @param {function} onSuccess - Callback after successful submit
 * @param {function} onCancel - Callback for cancel action
 * @param {boolean} isLoading - External loading state
 */
const ProductForm = ({
	mode = 'create',
	initialData = null,
	onSuccess,
	onCancel,
	isLoading: externalLoading = false,
}) => {
	// Form state
	const [formData, setFormData] = useState({
		product_name: '',
		product_code: '',
		sku: '',
		category_id: '',
		unit_id: '',
		price: '',
		cost: '',
		description: '',
		minimum_inventory: '0',
		status: '1',
	});

	const [categories, setCategories] = useState([]);
	const [units, setUnits] = useState([]);
	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [submitError, setSubmitError] = useState('');
	const { showToast } = useToast();

	// Initialize form with data for edit mode
	useEffect(() => {
		if (mode === 'edit' && initialData) {
			setFormData({
				product_name: initialData.product_name || '',
				product_code: initialData.product_code || '',
				sku: initialData.sku || '',
				category_id: initialData.category_id || '',
				unit_id: initialData.unit_id || '',
				price: initialData.price || '',
				cost: initialData.cost || '',
				description: initialData.description || '',
				minimum_inventory: initialData.minimum_inventory || '0',
				status: initialData.status?.toString() || '1',
			});
		}
	}, [mode, initialData]);

	// Fetch categories and units on mount
	useEffect(() => {
		const fetchSelectOptions = async () => {
			try {
				// For now, use hardcoded data
				// In production, fetch from API:
				// const categoriesData = await CategoryService.getCategories();
				// const unitsData = await UnitService.getUnits();

				// Hardcoded sample data for development
				setCategories([
					{ id: 1, category_name: 'Điện tử' },
					{ id: 2, category_name: 'Quần áo' },
					{ id: 3, category_name: 'Thực phẩm' },
					{ id: 4, category_name: 'Đồ gia dụng' },
				]);

				setUnits([
					{ id: 1, unit_name: 'Kilograms', unit_code: 'kg' },
					{ id: 2, unit_name: 'Pieces', unit_code: 'pcs' },
					{ id: 3, unit_name: 'Boxes', unit_code: 'box' },
					{ id: 4, unit_name: 'Liters', unit_code: 'ltr' },
				]);
			} catch (error) {
				console.error('Error fetching select options:', error);
				showToast('Không tải được dữ liệu', 'error');
			}
		};

		fetchSelectOptions();
	}, []);

	// Validation rules
	const validateForm = () => {
		const newErrors = {};

		if (!formData.product_name?.trim()) {
			newErrors.product_name = 'Tên sản phẩm là bắt buộc';
		}
		if (!formData.product_code?.trim()) {
			newErrors.product_code = 'Mã sản phẩm là bắt buộc';
		}
		if (!formData.sku?.trim()) {
			newErrors.sku = 'SKU là bắt buộc';
		}
		if (!formData.category_id) {
			newErrors.category_id = 'Danh mục là bắt buộc';
		}
		if (!formData.unit_id) {
			newErrors.unit_id = 'Đơn vị tính là bắt buộc';
		}
		if (!formData.price || isNaN(parseFloat(formData.price))) {
			newErrors.price = 'Giá là bắt buộc và phải là số';
		}
		if (!formData.cost || isNaN(parseFloat(formData.cost))) {
			newErrors.cost = 'Giá vốn là bắt buộc và phải là số';
		}
		if (
			formData.minimum_inventory &&
			isNaN(parseFloat(formData.minimum_inventory))
		) {
			newErrors.minimum_inventory = 'Tồn kho tối thiểu phải là số';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Handle input change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear error for this field when user starts typing
		if (touched[name]) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[name];
				return newErrors;
			});
		}
	};

	// Handle select change
	const handleSelectChange = (name, value) => {
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear error for this field
		if (touched[name]) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[name];
				return newErrors;
			});
		}
	};

	// Handle field blur
	const handleBlur = (e) => {
		const { name } = e.target;
		setTouched((prev) => ({
			...prev,
			[name]: true,
		}));
	};

	// Handle form submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsLoading(true);
		setSubmitError('');

		try {
			// Prepare data for API (convert string numbers to actual numbers)
			const dataToSubmit = {
				...formData,
				price: parseFloat(formData.price),
				cost: parseFloat(formData.cost),
				minimum_inventory: parseInt(formData.minimum_inventory) || 0,
				category_id: parseInt(formData.category_id),
				unit_id: parseInt(formData.unit_id),
				status: parseInt(formData.status),
			};

			if (mode === 'create') {
				await ProductService.createProduct(dataToSubmit);
				showToast('Tạo sản phẩm thành công', 'success');
			} else {
				await ProductService.updateProduct(
					initialData.id,
					dataToSubmit,
				);
				showToast('Cập nhật sản phẩm thành công', 'success');
			}

			onSuccess?.();
		} catch (error) {
			const errorMessage =
				error.message || 'Có lỗi xảy ra, vui lòng thử lại';
			setSubmitError(errorMessage);
			showToast(errorMessage, 'error');
		} finally {
			setIsLoading(false);
		}
	};

	const isSubmitting = isLoading || externalLoading;

	return (
		<Paper
			elevation={0}
			sx={{
				p: { xs: 2, md: 4 },
				bgcolor: 'white',
				maxWidth: 1400,
				mx: 'auto',
				width: '100%',
			}}
		>
			<form onSubmit={handleSubmit}>
				{/* Header */}
				<Box sx={{ mb: 3 }}>
					<Typography
						variant="h6"
						sx={{ color: '#1a1a1a', fontWeight: 600 }}
					>
						{mode === 'create'
							? 'Tạo Sản Phẩm Mới'
							: 'Chỉnh Sửa Sản Phẩm'}
					</Typography>
				</Box>

				<Divider sx={{ mb: 3 }} />

				{/* Error Alert */}
				{submitError && (
					<Alert severity="error" sx={{ mb: 2 }}>
						{submitError}
					</Alert>
				)}

				{/* Form Sections */}

				{/* Basic Information Section */}
				<Box sx={{ mb: 4 }}>
					<Typography
						variant="subtitle2"
						sx={{
							fontWeight: 600,
							color: '#4B5563',
							mb: 2,
						}}
					>
						Thông Tin Cơ Bản
					</Typography>

					<Grid container spacing={2}>
						{/* Product Name */}
						<Grid item xs={12} sm={6}>
							<Input
								label="Tên Sản Phẩm"
								name="product_name"
								value={formData.product_name}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="Nhập tên sản phẩm"
								error={!!errors.product_name}
								errorMessage={errors.product_name}
								required
								fullWidth
							/>
						</Grid>

						{/* Product Code */}
						<Grid item xs={12} sm={6}>
							<Input
								label="Mã Sản Phẩm"
								name="product_code"
								value={formData.product_code}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="Ví dụ: PRD001"
								error={!!errors.product_code}
								errorMessage={errors.product_code}
								required
								fullWidth
							/>
						</Grid>

						{/* SKU */}
						<Grid item xs={12} sm={6}>
							<Input
								label="SKU"
								name="sku"
								value={formData.sku}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="Mã SKU"
								error={!!errors.sku}
								errorMessage={errors.sku}
								required
								fullWidth
							/>
						</Grid>

						{/* Status */}
						<Grid item xs={12} sm={6}>
							<Input
								label="Trạng Thái"
								name="status"
								type="select"
								value={formData.status}
								onChange={handleChange}
								onBlur={handleBlur}
								required
								fullWidth
							/>
						</Grid>

						{/* Description */}
						<Grid item xs={12}>
							<Input
								label="Mô Tả"
								name="description"
								value={formData.description}
								onChange={handleChange}
								placeholder="Mô tả chi tiết sản phẩm"
								multiline
								rows={3}
								fullWidth
							/>
						</Grid>
					</Grid>
				</Box>

				<Divider sx={{ my: 3 }} />

				{/* Category & Unit Section */}
				<Box sx={{ mb: 4 }}>
					<Typography
						variant="subtitle2"
						sx={{
							fontWeight: 600,
							color: '#4B5563',
							mb: 2,
						}}
					>
						Phân Loại Và Đơn Vị
					</Typography>

					<Grid container spacing={2}>
						{/* Category */}
						<Grid item xs={12} sm={6}>
							<SelectCategory
								label="Danh Mục"
								value={formData.category_id}
								onChange={(value) =>
									handleSelectChange('category_id', value)
								}
								onBlur={handleBlur}
								error={!!errors.category_id}
								helperText={errors.category_id}
								categories={categories}
								required
								fullWidth
							/>
						</Grid>

						{/* Unit */}
						<Grid item xs={12} sm={6}>
							<SelectUnit
								label="Đơn Vị Tính"
								value={formData.unit_id}
								onChange={(value) =>
									handleSelectChange('unit_id', value)
								}
								onBlur={handleBlur}
								error={!!errors.unit_id}
								helperText={errors.unit_id}
								units={units}
								required
								fullWidth
							/>
						</Grid>
					</Grid>
				</Box>

				<Divider sx={{ my: 3 }} />

				{/* Pricing Section */}
				<Box sx={{ mb: 4 }}>
					<Typography
						variant="subtitle2"
						sx={{
							fontWeight: 600,
							color: '#4B5563',
							mb: 2,
						}}
					>
						Giá Cả Và Tồn Kho
					</Typography>

					<Grid container spacing={2}>
						{/* Price */}
						<Grid item xs={12} sm={6}>
							<Input
								label="Giá Bán"
								name="price"
								type="number"
								value={formData.price}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="0"
								error={!!errors.price}
								errorMessage={errors.price}
								inputProps={{ step: '0.01', min: '0' }}
								required
								fullWidth
							/>
						</Grid>

						{/* Cost */}
						<Grid item xs={12} sm={6}>
							<Input
								label="Giá Vốn"
								name="cost"
								type="number"
								value={formData.cost}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="0"
								error={!!errors.cost}
								errorMessage={errors.cost}
								inputProps={{ step: '0.01', min: '0' }}
								required
								fullWidth
							/>
						</Grid>

						{/* Minimum Inventory */}
						<Grid item xs={12} sm={6}>
							<Input
								label="Tồn Kho Tối Thiểu"
								name="minimum_inventory"
								type="number"
								value={formData.minimum_inventory}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="0"
								error={!!errors.minimum_inventory}
								errorMessage={errors.minimum_inventory}
								inputProps={{ step: '1', min: '0' }}
								fullWidth
							/>
						</Grid>
					</Grid>
				</Box>

				<Divider sx={{ my: 3 }} />

				{/* Action Buttons */}
				<Stack direction="row" spacing={2} justifyContent="flex-end">
					<Button
						variant="outlined"
						onClick={onCancel}
						disabled={isSubmitting}
					>
						Hủy
					</Button>
					<Button
						variant="contained"
						color="primary"
						type="submit"
						disabled={isSubmitting}
						startIcon={
							isSubmitting && <CircularProgress size={20} />
						}
					>
						{isSubmitting
							? 'Đang xử lý...'
							: mode === 'create'
							? 'Tạo'
							: 'Cập Nhật'}
					</Button>
				</Stack>
			</form>
		</Paper>
	);
};

ProductForm.propTypes = {
	mode: PropTypes.oneOf(['create', 'edit']),
	initialData: PropTypes.object,
	onSuccess: PropTypes.func,
	onCancel: PropTypes.func,
	isLoading: PropTypes.bool,
};

export default ProductForm;
