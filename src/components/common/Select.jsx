// src/components/common/Select.jsx
// Reusable Select/Dropdown component
// Converted to Material-UI

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem, FormHelperText, Box } from '@mui/material';

const Select = ({
	label,
	name,
	value,
	onChange,
	options,
	placeholder = 'Select an option',
	error,
	touched,
	disabled = false,
	required = false,
	searchable = true,
	multi = false,
	className = '',
	onBlur,
	variant = 'outlined',
	size = 'small',
	fullWidth = true,
}) => {
	const [searchTerm, setSearchTerm] = useState('');

	const filteredOptions = searchable
		? options.filter((opt) =>
				opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
		  )
		: options;

	const selectedOption = options.find((opt) => opt.value === value);

	const handleSelect = (optionValue) => {
		onChange({ target: { name, value: optionValue } });
		setSearchTerm('');
	};

	const hasError = error && touched;

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
			<TextField
				select
				name={name}
				label={label}
				value={value || ''}
				onChange={(e) => handleSelect(e.target.value)}
				onBlur={onBlur}
				disabled={disabled}
				required={required}
				variant={variant}
				size={size}
				fullWidth={fullWidth}
				error={hasError}
				helperText={hasError ? error : ''}
				SelectProps={{
					MenuProps: {
						PaperProps: {
							sx: {
								maxHeight: '300px',
							},
						},
					},
				}}
				sx={{
					'& .MuiOutlinedInput-input': {
						padding: '8.5px 14px',
					},
				}}
			>
				{!value && placeholder && (
					<MenuItem value="" disabled>
						<em>{placeholder}</em>
					</MenuItem>
				)}
				{filteredOptions.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
				{filteredOptions.length === 0 && searchTerm && (
					<MenuItem disabled>
						<em>No options found</em>
					</MenuItem>
				)}
			</TextField>
		</Box>
	);
};

Select.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
				.isRequired,
			label: PropTypes.string.isRequired,
		}),
	).isRequired,
	placeholder: PropTypes.string,
	error: PropTypes.string,
	touched: PropTypes.bool,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	searchable: PropTypes.bool,
	multi: PropTypes.bool,
	className: PropTypes.string,
	onBlur: PropTypes.func,
	variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
	size: PropTypes.oneOf(['small', 'medium']),
	fullWidth: PropTypes.bool,
};

export default Select;
