import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { useToast } from '../../contexts/ToastContext';
import ProductForm from '../../components/features/products/ProductForm';
import storageService from '../../api/services/presignedURLService';
import productService from '../../api/services/productService';

const ProductCreate = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { showToast } = useToast();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [selectedImageFile, setSelectedImageFile] = useState(null);

	const defaultValue = {
		// Basic Info
		product_name: '',
		product_code: '',
		category_id: '',
		unit_id: '',
		sku: '',

		// Pricing (Thông tin giá cả)
		cost: '',
		price: '',

		// Inventory
		minimum_inventory: 0,
		total_quantity: 0,

		// Status
		is_active: true,

		// addition info
		description: '',
		product_image_url: '',
	};

	// handle upload image to S3 and return the image URL
	const handleuploadImage = async (file) => {
		try {
			const presignedRes = await storageService.presifnedURLService(
				file,
				'products',
			);

			if (!presignedRes || !presignedRes.presignedURL) {
				showToast('Không nhận được URL upload', 'error');
				return;
			}

			await storageService.uploadFileToS3(
				file,
				presignedRes.presignedURL,
			);
			return presignedRes.path;
			// setSelectedImageFile(file);
		} catch (error) {
			showToast(error.message || 'Lỗi khi upload hình ảnh', 'error');
		}
	};

	const onSubmit = async (data) => {
		setIsSubmitting(true);
		try {
			// Prepare data
			const submitData = {
				...data,
				cost: data.cost ? parseFloat(data.cost) : undefined,
				price: data.price ? parseFloat(data.price) : undefined,
				minimum_inventory: data.minimum_inventory
					? parseInt(data.minimum_inventory)
					: undefined,
				total_quantity: data.total_quantity
					? parseInt(data.total_quantity)
					: 0,
				is_active: data.is_active ? 1 : 0,
			};

			// Handle image file if selected
			if (selectedImageFile) {
				const pathImage = await handleuploadImage(selectedImageFile);
				if (!pathImage) {
					showToast('Lỗi khi upload hình ảnh', 'error');
					setIsSubmitting(false);
					return;
				}
				submitData.product_image_url = pathImage;
				// // create product with image URL
				await productService.createProduct(submitData);
			} else {
				// Submit without image
				await productService.createProduct(submitData);
			}

			showToast('Tạo sản phẩm thành công', 'success');
			reset();
			// navigate('/products');
			setSelectedImageFile(null);
		} catch (error) {
			// showToast(error.message || 'Lỗi tạo sản phẩm', 'error');
			console.log('Create product error:', error);
		} finally {
			setSelectedImageFile(null);
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<Box sx={{ p: 2, width: '100%' }}>
				<ProductForm
					defaultValues={defaultValue}
					onSubmit={onSubmit}
					isSubmitting={isSubmitting}
					onImageChange={setSelectedImageFile}
				/>
			</Box>
		</>
	);
};

export default ProductCreate;
