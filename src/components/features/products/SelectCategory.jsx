// src/components/features/products/SelectCategory.jsx
// Reusable Category Select Component for Product Form

import React, { useState, useEffect } from 'react';
import {
	FormControl,
	FormHelperText,
	CircularProgress,
	Select,
	MenuItem,
} from '@mui/material';
import PropTypes from 'prop-types';

/**
 * SelectCategory Component
 * Reusable select component for product categories
 * Can be used in multiple forms (Products, Orders, etc.)
 */
const SelectCategory = ({
	value = '',
	onChange,
	onBlur,
	error = false,
	helperText = '',
	disabled = false,
	required = false,
	fullWidth = true,
	size = 'medium',
	categories = [],
	isLoading = false,
	label = 'Danh mục sản phẩm',
	placeholder = 'Chọn danh mục...',
}) => {
	const handleChange = (event) => {
		onChange?.(event.target.value);
	};

	return (
		<FormControl
			fullWidth={fullWidth}
			error={error}
			size={size}
			required={required}
			disabled={disabled || isLoading}
		>
			<Select
				value={value || ''}
				onChange={handleChange}
				onBlur={onBlur}
				displayEmpty
				renderValue={(selected) => {
					if (!selected) {
						return (
							<span style={{ color: '#9CA3AF' }}>
								{placeholder}
							</span>
						);
					}
					const category = categories.find(
						(cat) => cat.id === selected,
					);
					return category?.category_name || selected;
				}}
				startAdornment={
					isLoading ? (
						<CircularProgress
							color="inherit"
							size={20}
							style={{ marginRight: 8 }}
						/>
					) : null
				}
			>
				{categories.map((category) => (
					<MenuItem key={category.id} value={category.id}>
						{category.category_name}
					</MenuItem>
				))}
			</Select>
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
};

SelectCategory.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	error: PropTypes.bool,
	helperText: PropTypes.string,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	fullWidth: PropTypes.bool,
	size: PropTypes.oneOf(['small', 'medium']),
	categories: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			category_name: PropTypes.string,
		}),
	),
	isLoading: PropTypes.bool,
	label: PropTypes.string,
	placeholder: PropTypes.string,
};

export default SelectCategory;
