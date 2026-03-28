import React from 'react';
import {
	Box,
	TextField,
	FormHelperText,
	FormControl,
	useTheme,
} from '@mui/material';

/**
 * Reusable Form Field Component
 * Wraps Material-UI TextField with consistent styling and validation
 *
 * @param {Object} props - Component props
 * @param {string} props.value - Field value
 * @param {function} props.onChange - Change handler
 * @param {string} props.label - Field label
 * @param {string} props.type - Input type (text, email, password, number, date, etc.)
 * @param {string} props.error - Error message (if any)
 * @param {boolean} props.required - Whether field is required
 * @param {boolean} props.disabled - Whether field is disabled
 * @param {string} props.placeholder - Placeholder text
 * @param {stringslash} props.helperText - Helper text below field
 * @param {number} props.rows - Number of rows for multiline input
 * @param {string} props.variant - Variant: 'outlined' (default), 'filled', 'standard'
 * @param {string} props.size - Size: 'small', 'medium'
 * @param {string} props.fullWidth - Whether field should take full width
 */
const FormField = ({
	value,
	onChange,
	label,
	type = 'text',
	error,
	required = false,
	disabled = false,
	placeholder = '',
	helperText = '',
	rows = 1,
	variant = 'outlined',
	size = 'medium',
	fullWidth = true,
	...otherProps
}) => {
	const theme = useTheme();
	const isMultiline = rows > 1;

	return (
		<FormControl fullWidth={fullWidth} error={!!error}>
			<TextField
				value={value}
				onChange={onChange}
				label={label}
				type={type}
				required={required}
				disabled={disabled}
				placeholder={placeholder}
				variant={variant}
				size={size}
				multiline={isMultiline}
				rows={isMultiline ? rows : undefined}
				error={!!error}
				helperText={error || helperText}
				fullWidth={fullWidth}
				sx={{
					'& .MuiOutlinedInput-root': {
						'&.Mui-focused fieldset': {
							borderColor: theme.palette.primary.main,
						},
					},
				}}
				{...otherProps}
			/>
		</FormControl>
	);
};

export default FormField;
