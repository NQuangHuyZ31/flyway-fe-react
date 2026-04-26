// src/components/common/TextArea.jsx

import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const normalizeValue = (val) => {
	return val ?? ''; // null | undefined -> ''
};

const TextArea = forwardRef((props, ref) => {
	const {
		label,
		name,
		value,
		onChange,
		onBlur,
		onFocus,
		placeholder,
		disabled = false,
		readOnly = false,
		required = false,
		error,
		errorMessage,
		successMessage,
		touched,
		hint,
		minLength,
		maxLength,
		rows = 4,
		resizable = true,
		showCounter = false,
		clearable = false,
		className = '',
		ariaLabel,
		ariaDescribedBy,
		testId,
		fullWidth = true,
		variant = 'outlined',
		size = 'small',
		...rest
	} = props;

	const [internalValue, setInternalValue] = useState(normalizeValue(value));

	useEffect(() => {
		setInternalValue(normalizeValue(value));
	}, [value]);

	const handleChange = (e) => {
		const newValue = normalizeValue(e.target.value);
		setInternalValue(newValue);

		onChange?.({
			...e,
			target: {
				...e.target,
				name,
				value: newValue,
			},
		});
	};

	const handleClear = () => {
		setInternalValue('');
		onChange?.({
			target: { name, value: '' },
		});
	};

	const charCount = internalValue.length;
	const showClearBtn = clearable && internalValue && !disabled && !readOnly;

	const hasError = !!error && touched;
	const helperText = hasError ? errorMessage || error : hint || '';

	return (
		<Box className={className}>
			<TextField
				inputRef={ref}
				id={name}
				name={name}
				label={label}
				value={internalValue}
				onChange={handleChange}
				onBlur={onBlur}
				onFocus={onFocus}
				placeholder={placeholder}
				disabled={disabled}
				InputProps={{
					readOnly,
					endAdornment: showClearBtn ? (
						<CloseIcon
							onClick={handleClear}
							sx={{ cursor: 'pointer', fontSize: '20px' }}
						/>
					) : undefined,
				}}
				inputProps={{
					minLength,
					maxLength,
					'aria-label': ariaLabel || label,
					'aria-describedby': ariaDescribedBy,
					'data-testid': testId,
				}}
				multiline
				rows={rows}
				required={required}
				variant={variant}
				size={size}
				fullWidth={fullWidth}
				error={hasError}
				helperText={
					hasError || hint
						? helperText
						: successMessage && touched
						? `✓ ${successMessage}`
						: ''
				}
				sx={{
					'& .MuiOutlinedInput-root': {
						resize: resizable ? 'vertical' : 'none',
					},
				}}
				{...rest}
			/>

			{showCounter && maxLength && (
				<Box
					sx={{
						textAlign: 'right',
						fontSize: '0.75rem',
						mt: '4px',
						color:
							charCount > maxLength * 0.8
								? 'warning.main'
								: 'text.secondary',
					}}
				>
					{charCount}/{maxLength}
				</Box>
			)}
		</Box>
	);
});

TextArea.displayName = 'TextArea';

TextArea.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	value: PropTypes.string, // vẫn để string, nhưng xử lý null bên trong
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	onFocus: PropTypes.func,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	readOnly: PropTypes.bool,
	required: PropTypes.bool,
	error: PropTypes.string,
	errorMessage: PropTypes.string,
	successMessage: PropTypes.string,
	touched: PropTypes.bool,
	hint: PropTypes.string,
	minLength: PropTypes.number,
	maxLength: PropTypes.number,
	rows: PropTypes.number,
	resizable: PropTypes.bool,
	showCounter: PropTypes.bool,
	clearable: PropTypes.bool,
	className: PropTypes.string,
	ariaLabel: PropTypes.string,
	ariaDescribedBy: PropTypes.string,
	testId: PropTypes.string,
	fullWidth: PropTypes.bool,
	variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
	size: PropTypes.oneOf(['small', 'medium']),
};

export default TextArea;
