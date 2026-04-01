// src/components/common/Input.jsx
// Enhanced Input component with validation, accessibility, and rich features

import React, { forwardRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './Input.css';

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
			...props
		},
		ref,
	) => {
		const [internalValue, setInternalValue] = useState(value || '');
		const [isPasswordVisible, setIsPasswordVisible] = useState(false);
		const [validationError, setValidationError] = useState(null);
		const [isFocused, setIsFocused] = useState(false);
		const [debounceTimer, setDebounceTimer] = useState(null);

		// Input classes
		const inputClasses = `
			input
			input-${type}
			${error || validationError ? 'input-error' : ''}
			${successMessage && touched ? 'input-success' : ''}
			${disabled ? 'input-disabled' : ''}
			${readOnly ? 'input-readonly' : ''}
			${Icon ? `input-with-icon input-icon-${iconPosition}` : ''}
			${prefix ? 'input-with-prefix' : ''}
			${suffix ? 'input-with-suffix' : ''}
			${isFocused ? 'input-focused' : ''}
			${className}
		`.trim();

		const wrapperClasses = `input-wrapper ${
			disabled ? 'input-wrapper-disabled' : ''
		}`.trim();

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
				setIsFocused(false);
				onBlur?.(e);
				if (validation) {
					validateInput(e.target.value);
				}
			},
			[onBlur, validation, validateInput],
		);

		const handleFocus = useCallback(
			(e) => {
				setIsFocused(true);
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

		return (
			<div className={wrapperClasses}>
				{label && (
					<label className="input-label" htmlFor={name}>
						<span>{label}</span>
						{required && (
							<span
								className="input-required"
								aria-label="required"
							>
								*
							</span>
						)}
					</label>
				)}

				<div className="input-container">
					{Icon && iconPosition === 'left' && (
						<Icon
							className="input-icon input-icon-left"
							aria-hidden="true"
						/>
					)}

					{prefix && <span className="input-prefix">{prefix}</span>}

					<input
						ref={ref}
						id={name}
						className={inputClasses}
						name={name}
						type={effectiveType}
						placeholder={placeholder}
						value={displayValue}
						onChange={handleChange}
						onBlur={handleBlur}
						onFocus={handleFocus}
						disabled={disabled}
						readOnly={readOnly}
						required={required}
						maxLength={maxLength}
						minLength={minLength}
						pattern={pattern}
						aria-label={ariaLabel || label}
						aria-describedby={ariaDescribedBy}
						aria-invalid={!!(error || validationError)}
						data-testid={testId}
						{...props}
					/>

					{suffix && <span className="input-suffix">{suffix}</span>}

					{showPasswordToggle && type === 'password' && (
						<button
							type="button"
							className="input-toggle-password"
							onClick={() =>
								setIsPasswordVisible(!isPasswordVisible)
							}
							aria-label={
								isPasswordVisible
									? 'Hide password'
									: 'Show password'
							}
							tabIndex={-1}
						>
							{isPasswordVisible ? '👁️‍🗨️' : '👁️'}
						</button>
					)}

					{showClearButton && (
						<button
							type="button"
							className="input-clear-btn"
							onClick={handleClear}
							aria-label="Clear input"
							tabIndex={-1}
						>
							✕
						</button>
					)}

					{Icon && iconPosition === 'right' && (
						<Icon
							className="input-icon input-icon-right"
							aria-hidden="true"
						/>
					)}
				</div>

				{/* Helper text, error, or success message */}
				<div className="input-feedback">
					{(error || validationError) && touched && (
						<span className="input-error-message" role="alert">
							{errorMessage || error || validationError}
						</span>
					)}
					{successMessage &&
						touched &&
						!error &&
						!validationError && (
							<span className="input-success-message">
								✓ {successMessage}
							</span>
						)}
					{hint && !error && !validationError && (
						<span className="input-hint">{hint}</span>
					)}
				</div>
			</div>
		);
	},
);

Input.displayName = 'Input';

Input.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	type: PropTypes.oneOf([
		'text',
		'email',
		'password',
		'number',
		'tel',
		'url',
		'search',
		'date',
		'time',
		'datetime-local',
		'month',
		'week',
		'color',
		'file',
	]),
	placeholder: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	onFocus: PropTypes.func,
	error: PropTypes.string,
	errorMessage: PropTypes.string,
	successMessage: PropTypes.string,
	touched: PropTypes.bool,
	disabled: PropTypes.bool,
	readOnly: PropTypes.bool,
	required: PropTypes.bool,
	icon: PropTypes.elementType,
	iconPosition: PropTypes.oneOf(['left', 'right']),
	hint: PropTypes.string,
	className: PropTypes.string,
	maxLength: PropTypes.number,
	minLength: PropTypes.number,
	pattern: PropTypes.string,
	validation: PropTypes.arrayOf(
		PropTypes.shape({
			test: PropTypes.func.isRequired,
			message: PropTypes.string,
		}),
	),
	clearable: PropTypes.bool,
	showPasswordToggle: PropTypes.bool,
	prefix: PropTypes.string,
	suffix: PropTypes.string,
	ariaLabel: PropTypes.string,
	ariaDescribedBy: PropTypes.string,
	testId: PropTypes.string,
	debounceDelay: PropTypes.number,
};

export default Input;
