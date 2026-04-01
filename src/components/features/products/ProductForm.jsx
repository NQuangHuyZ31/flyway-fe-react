// src/components/features/products/ProductForm.jsx
// Form component for creating/editing products

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import Input from '../../common/Input';
import Select from '../../common/Select';
import TextArea from '../../common/TextArea';
import Button from '../../common/Button';
import FormField from '../../common/FormField';

const ProductForm = ({
	onSubmit,
	initialData = null,
	isLoading = false,
	categories = [],
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: initialData || {
			name: '',
			description: '',
			category_id: '',
			sku: '',
			unit: '',
			purchase_price: '',
			selling_price: '',
		},
	});

	useEffect(() => {
		if (initialData) {
			reset(initialData);
		}
	}, [initialData, reset]);

	const handleFormSubmit = async (data) => {
		try {
			await onSubmit(data);
		} catch (error) {
			console.error('Form submission error:', error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(handleFormSubmit)}
			className="product-form"
		>
			<div className="form-grid">
				<FormField
					label="Product Name"
					error={errors.name?.message}
					required
				>
					<Input
						{...register('name', {
							required: 'Product name is required',
							minLength: {
								value: 3,
								message: 'Name must be at least 3 characters',
							},
						})}
						placeholder="Enter product name"
					/>
				</FormField>

				<FormField label="SKU" error={errors.sku?.message} required>
					<Input
						{...register('sku', {
							required: 'SKU is required',
						})}
						placeholder="Enter SKU"
					/>
				</FormField>

				<FormField
					label="Category"
					error={errors.category_id?.message}
					required
				>
					<Select
						{...register('category_id', {
							required: 'Category is required',
						})}
					>
						<option value="">Select a category</option>
						{categories.map((cat) => (
							<option key={cat.id} value={cat.id}>
								{cat.name}
							</option>
						))}
					</Select>
				</FormField>

				<FormField label="Unit" error={errors.unit?.message} required>
					<Select
						{...register('unit', {
							required: 'Unit is required',
						})}
					>
						<option value="">Select unit</option>
						<option value="kg">Kilogram</option>
						<option value="pcs">Pieces</option>
						<option value="box">Box</option>
						<option value="liter">Liter</option>
					</Select>
				</FormField>

				<FormField
					label="Purchase Price"
					error={errors.purchase_price?.message}
					required
				>
					<Input
						{...register('purchase_price', {
							required: 'Purchase price is required',
							pattern: {
								value: /^\d+(\.\d{2})?$/,
								message: 'Invalid price format',
							},
						})}
						type="number"
						step="0.01"
						placeholder="0.00"
					/>
				</FormField>

				<FormField
					label="Selling Price"
					error={errors.selling_price?.message}
					required
				>
					<Input
						{...register('selling_price', {
							required: 'Selling price is required',
							pattern: {
								value: /^\d+(\.\d{2})?$/,
								message: 'Invalid price format',
							},
						})}
						type="number"
						step="0.01"
						placeholder="0.00"
					/>
				</FormField>

				<div className="form-grid-full">
					<FormField
						label="Description"
						error={errors.description?.message}
					>
						<TextArea
							{...register('description')}
							placeholder="Enter product description"
							rows={4}
						/>
					</FormField>
				</div>
			</div>

			<div className="form-actions">
				<Button type="submit" variant="primary" isLoading={isLoading}>
					{initialData ? 'Update Product' : 'Create Product'}
				</Button>
			</div>
		</form>
	);
};

ProductForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	initialData: PropTypes.object,
	isLoading: PropTypes.bool,
	categories: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			name: PropTypes.string,
		}),
	),
};

export default ProductForm;
