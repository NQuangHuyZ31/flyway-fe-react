import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import ProductForm from '../../components/features/products/ProductForm';
import { useProductForm } from '../../hooks/useProductForm';

const ProductEdit = () => {
	const { id: productId } = useParams();

	const {
		defaultValue,
		isLoading,
		isSubmitting,
		errors,
		selectedImageFile,
		setSelectedImageFile,
		handleSubmit,
	} = useProductForm(productId); // With productId = Edit mode

	// Show loading spinner while fetching product data
	if (isLoading) {
		return (
			<Box
				sx={{
					p: 2,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '400px',
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<>
			<Box sx={{ p: 2, width: '100%' }}>
				<ProductForm
					defaultValues={defaultValue}
					onSubmit={handleSubmit}
					isSubmitting={isSubmitting}
					onImageChange={(file) => setSelectedImageFile(file)}
					resErrors={errors}
					productId={productId} // Pass productId for duplicate check in edit mode
				/>
			</Box>
		</>
	);
};

export default ProductEdit;
