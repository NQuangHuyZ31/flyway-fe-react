// src/components/common/Input.jsx
// Enhanced Input component with validation, accessibility, and rich features
// Converted to Material-UI

import React, { forwardRef, useState, useEffect, useCallback } from 'react';
import {
	TextField,
	InputAdornment,
	Box,
	FormHelperText,
	IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Close from '@mui/icons-material/Close';

const Input = forwardRef(
	(
		{
			label,
			name,
			type = 'text',
			placeholder,
			value,
			onChange,
			onBlur,
			onFocus,
			error,
			touched,
			disabled = false,
			required = false,
			readOnly = false,
			icon: Icon = null,
			iconPosition = 'left',
			hint,
			errorMessage,
			successMessage,
			className = '',
			maxLength,
			minLength,
			pattern,
			validation,
			clearable = false,
			showPasswordToggle = false,
			prefix,
			suffix,
			ariaLabel,
			ariaDescribedBy,
			testId,
			debounceDelay = 0,
			fullWidth = true,
			variant = 'outlined',
			size = 'small',
			...props
		},
		ref,
	) => {
		const [internalValue, setInternalValue] = useState(value || '');
		const [isPasswordVisible, setIsPasswordVisible] = useState(false);
		const [validationError, setValidationError] = useState(null);
		const [debounceTimer, setDebounceTimer] = useState(null);

		// Custom validation
		const validateInput = useCallback(
			(val) => {
				if (!validation) return null;

				for (const rule of validation) {
					if (rule.test && !rule.test(val)) {
						setValidationError(rule.message || 'Invalid input');
						return rule.message;
					}
				}
				setValidationError(null);
				return null;
			},
			[validation],
		);

		// Handle change with debounce
		const handleChange = useCallback(
			(e) => {
				const { value: newValue } = e.target;
				setInternalValue(newValue);

				// Clear previous debounce timer
				if (debounceTimer) {
					clearTimeout(debounceTimer);
				}

				// Validate immediately
				if (validation) {
					validateInput(newValue);
				}

				// Debounce the onChange callback
				if (debounceDelay > 0) {
					const timer = setTimeout(() => {
						onChange?.(e);
					}, debounceDelay);
					setDebounceTimer(timer);
				} else {
					onChange?.(e);
				}
			},
			[onChange, validation, validateInput, debounceDelay, debounceTimer],
		);

		const handleBlur = useCallback(
			(e) => {
				onBlur?.(e);
				if (validation) {
					validateInput(e.target.value);
				}
			},
			[onBlur, validation, validateInput],
		);

		const handleFocus = useCallback(
			(e) => {
				onFocus?.(e);
			},
			[onFocus],
		);

		const handleClear = useCallback(() => {
			setInternalValue('');
			onChange?.({
				target: { name, value: '' },
			});
		}, [onChange, name]);

		// Update internal value when external value changes
		useEffect(() => {
			setInternalValue(value !== undefined ? value : '');
		}, [value]);

		const displayValue = internalValue;
		const effectiveType =
			type === 'password' && isPasswordVisible ? 'text' : type;
		const showClearButton =
			clearable && displayValue && !disabled && !readOnly;

		const hasError = (error || validationError) && touched;
		const helperText = hasError
			? errorMessage || error || validationError
			: hint;

		// Build start adornment
		let startAdornment = null;
		if (prefix || (Icon && iconPosition === 'left')) {
			startAdornment = (
				<InputAdornment position="start">
					{Icon && iconPosition === 'left' && <Icon />}
					{prefix && (
						<span style={{ marginLeft: '4px' }}>{prefix}</span>
					)}
				</InputAdornment>
			);
		}

		// Build end adornment
		let endAdornment = null;
		if (
			suffix ||
			showPasswordToggle ||
			showClearButton ||
			(Icon && iconPosition === 'right')
		) {
			endAdornment = (
				<InputAdornment position="end">
					{suffix && (
						<span style={{ marginRight: '4px' }}>{suffix}</span>
					)}
					{showPasswordToggle && type === 'password' && (
						<IconButton
							onClick={() =>
								setIsPasswordVisible(!isPasswordVisible)
							}
							edge="end"
							size="small"
							tabIndex={-1}
							aria-label={
								isPasswordVisible
									? 'Hide password'
									: 'Show password'
							}
						>
							{isPasswordVisible ? (
								<VisibilityOff />
							) : (
								<Visibility />
							)}
						</IconButton>
					)}
					{showClearButton && (
						<IconButton
							onClick={handleClear}
							edge="end"
							size="small"
							tabIndex={-1}
							aria-label="Clear input"
						>
							<Close />
						</IconButton>
					)}
					{Icon && iconPosition === 'right' && <Icon />}
				</InputAdornment>
			);
		}

		return (
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
				<TextField
					inputRef={ref}
					id={name}
					name={name}
					type={effectiveType}
					placeholder={placeholder}
					value={displayValue}
					onChange={handleChange}
					onBlur={handleBlur}
					onFocus={handleFocus}
					disabled={disabled}
					inputProps={{
						readOnly: readOnly,
						maxLength: maxLength,
						minLength: minLength,
						pattern: pattern,
						'aria-label': ariaLabel || label,
						'aria-describedby': ariaDescribedBy,
						'aria-invalid': hasError,
						'data-testid': testId,
					}}
					label={label}
					required={required}
					variant={variant}
					size={size}
					fullWidth={fullWidth}
					error={hasError}
					helperText={
						helperText ||
						(successMessage && touched ? `✓ ${successMessage}` : '')
					}
					startadornment={startAdornment}
					endadornment={endAdornment}
					{...props}
				/>
			</Box>
		);
	},
);

export default Input;
