import React from 'react';
import { Box } from '@mui/material';
import ProductForm from '../../components/features/products/ProductForm';
import { useProductForm } from '../../hooks/useProductForm';

const ProductCreate = () => {
	const {
		defaultValue,
		isSubmitting,
		errors,
		selectedImageFile,
		setSelectedImageFile,
		handleSubmit,
	} = useProductForm(); // No productId = Create mode

	return (
		<>
			<Box sx={{ p: 2, width: '100%' }}>
				<ProductForm
					defaultValues={defaultValue}
					onSubmit={handleSubmit}
					isSubmitting={isSubmitting}
					onImageChange={(file) => setSelectedImageFile(file)}
					resErrors={errors}
				/>
			</Box>
		</>
	);
};

export default ProductCreate;
