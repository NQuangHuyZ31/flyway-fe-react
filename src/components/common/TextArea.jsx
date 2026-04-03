// src/components/common/TextArea.jsx
// Enhanced TextArea component with counter and validation
// Converted to Material-UI

import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	TextField,
	Box,
	FormHelperText,
	Stack,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const TextArea = forwardRef(
	(
		{
			label,
			name,
			value = '',
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
			...props
		},
		ref,
	) => {
		const [internalValue, setInternalValue] = useState(value);

		useEffect(() => {
			setInternalValue(value);
		}, [value]);

		const handleChange = (e) => {
			const newValue = e.target.value;
			setInternalValue(newValue);
			onChange?.(e);
		};

		const handleClear = () => {
			setInternalValue('');
			onChange?.({
				target: { name, value: '' },
			});
		};

		const charCount = internalValue.length;
		const showClearBtn =
			clearable && internalValue && !disabled && !readOnly;

		const hasError = error && touched;
		const helperText = hasError
			? errorMessage || error
			: hint || '';

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
						readOnly: readOnly,
						endAdornment: showClearBtn ? (
							<CloseIcon
								onClick={handleClear}
								sx={{ cursor: 'pointer', fontSize: '20px' }}
							/>
						) : undefined,
					}}
					inputProps={{
						minLength: minLength,
						maxLength: maxLength,
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
					{...props}
				/>

				{showCounter && maxLength && (
					<Box
						sx={{
							textAlign: 'right',
							fontSize: '0.75rem',
							marginTop: '4px',
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
	},
);

TextArea.displayName = 'TextArea';

TextArea.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	value: PropTypes.string,
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
						name={name}
						value={internalValue}
						onChange={handleChange}
						onBlur={handleBlur}
						onFocus={handleFocus}
						placeholder={placeholder}
						disabled={disabled}
						readOnly={readOnly}
						required={required}
						minLength={minLength}
						maxLength={maxLength}
						rows={rows}
						aria-label={ariaLabel || label}
						aria-describedby={ariaDescribedBy}
						aria-invalid={!!(error && touched)}
						data-testid={testId}
						{...props}
					/>

					{showClearBtn && (
						<button
							type="button"
							className="textarea-clear-btn"
							onClick={handleClear}
							aria-label="Clear textarea"
						>
							✕
						</button>
					)}
				</div>

				{/* Counter and validation feedback */}
				<div className="textarea-footer">
					<div className="textarea-feedback">
						{error && touched && (
							<span
								className="textarea-error-message"
								role="alert"
							>
								{errorMessage || error}
							</span>
						)}
						{successMessage && touched && !error && (
							<span className="textarea-success-message">
								✓ {successMessage}
							</span>
						)}
						{hint && !error && (
							<span className="textarea-hint">{hint}</span>
						)}
					</div>

					{showCounter && maxLength && (
						<span
							className={`textarea-counter ${
								charCount > maxLength * 0.8
									? 'textarea-counter-warning'
									: ''
							}`}
						>
							{charCount}/{maxLength}
						</span>
					)}
				</div>
			</div>
		);
	},
);

TextArea.displayName = 'TextArea';

TextArea.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	value: PropTypes.string,
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
};

export default TextArea;
