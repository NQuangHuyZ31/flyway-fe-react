// src/pages/Products/ProductCreate.jsx
// Product Create Page

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import ProductForm from '../../components/features/products/ProductForm';
import PageHeader from '../../components/common/PageHeader';

const ProductCreate = () => {
	const navigate = useNavigate();

	const handleSuccess = () => {
		navigate('/products');
	};

	const handleCancel = () => {
		navigate('/products');
	};

	return (
		<Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', pb: 4 }}>
			{/* Page Header */}
			<PageHeader
				title="Tạo Sản Phẩm Mới"
				breadcrumbs={[
					{ label: 'Trang chủ', href: '/' },
					{ label: 'Sản phẩm', href: '/products' },
					{ label: 'Tạo mới' },
				]}
			/>

			{/* Form Content */}
			<Box sx={{ width: '100%', px: { xs: 2, md: 4 }, mt: 3 }}>
				<ProductForm
					mode="create"
					onSuccess={handleSuccess}
					onCancel={handleCancel}
				/>
			</Box>
		</Box>
	);
};

export default ProductCreate;
