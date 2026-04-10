// src/pages/Products/ProductEdit.jsx
// Product Edit Page

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Box, Alert, CircularProgress } from '@mui/material';
import ProductForm from '../../components/features/products/ProductForm';
import ProductService from '../../api/services/productService';
import PageHeader from '../../components/common/PageHeader';
import { useToast } from '../../contexts/ToastContext';

const ProductEdit = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const { showToast } = useToast();

	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				// First try to get from location state (passed from list page)
				if (location.state?.product) {
					setProduct(location.state.product);
					setLoading(false);
					return;
				}

				// Otherwise fetch from API
				const response = await ProductService.getProduct(id);
				setProduct(response.data || response);
			} catch (err) {
				const errorMessage =
					err.message || 'Không tải được thông tin sản phẩm';
				setError(errorMessage);
				showToast(errorMessage, 'error');
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchProduct();
		}
	}, [id, location.state, showToast]);

	const handleSuccess = () => {
		navigate(`/products/${id}/detail`);
	};

	const handleCancel = () => {
		navigate(`/products/${id}/detail`);
	};

	if (loading) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '100vh',
					bgcolor: '#f5f7fa',
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', pb: 4 }}>
				<PageHeader title="Chỉnh Sửa Sản Phẩm" />
				<Box sx={{ width: '100%', px: { xs: 2, md: 4 }, mt: 3 }}>
					<Alert severity="error">{error}</Alert>
				</Box>
			</Box>
		);
	}

	if (!product) {
		return (
			<Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', pb: 4 }}>
				<PageHeader title="Chỉnh Sửa Sản Phẩm" />
				<Box sx={{ width: '100%', px: { xs: 2, md: 4 }, mt: 3 }}>
					<Alert severity="warning">Không tìm thấy sản phẩm</Alert>
				</Box>
			</Box>
		);
	}

	return (
		<Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', pb: 4 }}>
			{/* Page Header */}
			<PageHeader
				title={`Chỉnh Sửa: ${product.product_name}`}
				breadcrumbs={[
					{ label: 'Trang chủ', href: '/' },
					{ label: 'Sản phẩm', href: '/products' },
					{ label: 'Chỉnh sửa' },
				]}
			/>

			{/* Form Content */}
			<Box sx={{ width: '100%', px: { xs: 2, md: 4 }, mt: 3 }}>
				<ProductForm
					mode="edit"
					initialData={product}
					onSuccess={handleSuccess}
					onCancel={handleCancel}
				/>
			</Box>
		</Box>
	);
};

export default ProductEdit;
