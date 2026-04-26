import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import storageService from '../api/services/presignedURLService';
import productService from '../api/services/productService';

/**
 * Custom hook for Product form (Create/Edit)
 * Handles: product fetching, image upload, form submission
 * Shows UI immediately, data updates after fetch completes
 */
export const useProductForm = (productId) => {
	const navigate = useNavigate();
	const { showToast } = useToast();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isLoading, setIsLoading] = useState(productId ? true : false);
	const [selectedImageFile, setSelectedImageFile] = useState(null);
	const [errors, setErrors] = useState({});
	const [product, setProduct] = useState(null);

	const defaultValue = {
		product_name: '',
		product_code: '',
		category_id: '',
		unit_id: '',
		sku: '',
		cost: '',
		price: '',
		minimum_inventory: 0,
		total_quantity: 0,
		is_active: true,
		description: '',
		product_image_url: '',
	};

	// Fetch product detail on mount (for edit mode)
	// But don't block UI rendering - show empty form first
	useEffect(() => {
		if (!productId) return;

		const fetchProduct = async () => {
			try {
				setIsLoading(true);
				const response = await productService.getProduct(productId);
				if (response) {
					setProduct(response);
				}
			} catch (error) {
				showToast('Lỗi tải thông tin sản phẩm', 'error');
				// Don't navigate away, let user stay on the form
			} finally {
				setIsLoading(false);
			}
		};

		fetchProduct();
	}, [productId, showToast]);

	// Upload image to S3 and return path
	const handleuploadImage = async (file) => {
		try {
			const presignedRes = await storageService.presignedURLService(
				file,
				'products',
			);

			if (!presignedRes || !presignedRes.data.presignedURL) {
				showToast('Không nhận được URL upload', 'error');
				return;
			}

			await storageService.uploadFileToS3(
				file,
				presignedRes.data.presignedURL,
			);
			return presignedRes.data.path;
		} catch (error) {
			showToast(error.message || 'Lỗi khi upload hình ảnh', 'error');
		}
	};

	// Handle form submission (create or update)
	const handleSubmit = async (formData) => {
		setIsSubmitting(true);
		try {
			// Prepare data
			const submitData = {
				...formData,
				cost: formData.cost ? parseFloat(formData.cost) : undefined,
				price: formData.price ? parseFloat(formData.price) : undefined,
				minimum_inventory: formData.minimum_inventory
					? parseInt(formData.minimum_inventory)
					: undefined,
				total_quantity: formData.total_quantity
					? parseInt(formData.total_quantity)
					: 0,
				is_active: formData.is_active ? 1 : 0,
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
			}

			// Create or Update
			if (productId) {
				// Edit mode
				await productService.updateProduct(productId, submitData);
				showToast('Cập nhật sản phẩm thành công', 'success');
			} else {
				// Create mode
				await productService.createProduct(submitData);
				showToast('Tạo sản phẩm thành công', 'success');
			}

			navigate('/products');
		} catch (error) {
			showToast(
				error.message || 'Lỗi lưu sản phẩm. Vui lòng thử lại',
				'error',
			);
			setErrors(error.errors || {});
		} finally {
			setSelectedImageFile(null);
			setIsSubmitting(false);
		}
	};

	// Prepare default values (for edit mode)
	const defaultValueWithProduct = product
		? {
				product_name: product.product_name || '',
				product_code: product.product_code || '',
				category_id: product.category?.id || '',
				unit_id: product.unit?.id || '',
				sku: product.sku || '',
				cost: product.cost || '',
				price: product.price || '',
				minimum_inventory: product.minimum_inventory || 0,
				total_quantity: product.total_quantity || 0,
				is_active: product.is_active ? true : false,
				description: product.description || '',
				product_image_url: product.product_image_url || '',
		  }
		: defaultValue;

	return {
		defaultValue: defaultValueWithProduct,
		isLoading,
		isSubmitting,
		errors,
		selectedImageFile,
		setSelectedImageFile,
		handleSubmit,
		product,
		isEditMode: !!productId,
	};
};
