import React, { forwardRef, useState, useEffect, useCallback } from 'react';
import { TextField, InputAdornment, Box, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Close from '@mui/icons-material/Close';

const Input = forwardRef((props, ref) => {
	const {
		label,
		name,
		type = 'text',
		value,
		onChange,
		onBlur,
		onFocus,
		error,
		touched,
		disabled = false,
		required = false,
		readOnly = false,
		icon: Icon,
		iconPosition = 'left',
		hint,
		errorMessage,
		successMessage,
		maxLength,
		minLength,
		pattern,
		validation,
		clearable = false,
		showPasswordToggle = false,
		prefix,
		suffix,
		debounceDelay = 0,
		fullWidth = true,
		variant = 'outlined',
		size = 'small',
		...rest
	} = props;

	const [internalValue, setInternalValue] = useState(value ?? '');
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [validationError, setValidationError] = useState(null);
	const [timer, setTimer] = useState(null);

	// ===== EFFECT =====
	useEffect(() => {
		setInternalValue(value ?? '');
	}, [value]);

	// ===== VALIDATION =====
	const validate = useCallback(
		(val) => {
			if (!validation) return;

			for (const rule of validation) {
				if (rule.test && !rule.test(val)) {
					setValidationError(rule.message);
					return;
				}
			}

			setValidationError(null);
		},
		[validation],
	);

	// ===== HANDLERS =====
	const handleChange = useCallback(
		(e) => {
			let val = e.target.value;

			// 👉 handle number min
			if (type === 'number') {
				val = val === '' ? '' : Math.max(1, Number(val));
			}

			setInternalValue(val);

			validate(val);

			if (timer) clearTimeout(timer);

			if (debounceDelay > 0) {
				const t = setTimeout(
					() =>
						onChange?.({
							...e,
							target: { ...e.target, value: val },
						}),
					debounceDelay,
				);
				setTimer(t);
			} else {
				onChange?.({ ...e, target: { ...e.target, value: val } });
			}
		},
		[onChange, debounceDelay, timer, validate, type],
	);

	const handleBlur = (e) => {
		validate(e.target.value);
		onBlur?.(e);
	};

	const handleClear = () => {
		setInternalValue('');
		onChange?.({ target: { name, value: '' } });
	};

	// ===== COMPUTED =====
	const effectiveType =
		type === 'password' && isPasswordVisible ? 'text' : type;

	const hasError = Boolean((error || validationError) && touched);

	const helperText = hasError
		? errorMessage || error || validationError
		: hint || (successMessage && touched ? `✓ ${successMessage}` : '');

	// ===== INPUT PROPS =====
	const inputProps = {
		readOnly,
		maxLength,
		minLength,
		pattern,
		...(type === 'number' && { min: 1 }),
	};

	// ===== ADORNMENTS =====
	const startAdornment = (prefix || (Icon && iconPosition === 'left')) && (
		<InputAdornment position="start">
			{Icon && iconPosition === 'left' && <Icon />}
			{prefix && <span style={{ marginLeft: 4 }}>{prefix}</span>}
		</InputAdornment>
	);

	const showClear = clearable && internalValue && !disabled && !readOnly;

	const endAdornment = (suffix ||
		showPasswordToggle ||
		showClear ||
		(Icon && iconPosition === 'right')) && (
		<InputAdornment position="end">
			{suffix && <span style={{ marginRight: 4 }}>{suffix}</span>}

			{showPasswordToggle && type === 'password' && (
				<IconButton
					size="small"
					onClick={() => setIsPasswordVisible((prev) => !prev)}
				>
					{isPasswordVisible ? <VisibilityOff /> : <Visibility />}
				</IconButton>
			)}

			{showClear && (
				<IconButton size="small" onClick={handleClear}>
					<Close />
				</IconButton>
			)}

			{Icon && iconPosition === 'right' && <Icon />}
		</InputAdornment>
	);

	return (
		<Box>
			<TextField
				ref={ref}
				name={name}
				type={effectiveType}
				value={internalValue}
				onChange={handleChange}
				onBlur={handleBlur}
				onFocus={onFocus}
				disabled={disabled}
				label={label}
				required={required}
				variant={variant}
				size={size}
				fullWidth={fullWidth}
				error={hasError}
				helperText={helperText}
				inputProps={inputProps}
				InputProps={{
					startAdornment,
					endAdornment,
				}}
				{...rest}
			/>
		</Box>
	);
});

export default Input;
