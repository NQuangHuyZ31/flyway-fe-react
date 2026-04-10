// src/components/features/products/SelectUnit.jsx
// Reusable Unit Select Component for Product Form

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
 * SelectUnit Component
 * Reusable select component for product units of measurement
 * Can be used in multiple forms (Products, Orders, etc.)
 */
const SelectUnit = ({
	value = '',
	onChange,
	onBlur,
	error = false,
	helperText = '',
	disabled = false,
	required = false,
	fullWidth = true,
	size = 'medium',
	units = [],
	isLoading = false,
	label = 'Đơn vị tính',
	placeholder = 'Chọn đơn vị...',
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
					const unit = units.find((u) => u.id === selected);
					return unit?.unit_name || selected;
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
				{units.map((unit) => (
					<MenuItem key={unit.id} value={unit.id}>
						{unit.unit_name} ({unit.unit_code})
					</MenuItem>
				))}
			</Select>
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
};

SelectUnit.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	error: PropTypes.bool,
	helperText: PropTypes.string,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	fullWidth: PropTypes.bool,
	size: PropTypes.oneOf(['small', 'medium']),
	units: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			unit_name: PropTypes.string,
			unit_code: PropTypes.string,
		}),
	),
	isLoading: PropTypes.bool,
	label: PropTypes.string,
	placeholder: PropTypes.string,
};

export default SelectUnit;
