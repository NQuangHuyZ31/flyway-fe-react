// src/components/common/TextArea.jsx
// Enhanced TextArea component with counter and validation

import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './TextArea.css';

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
			...props
		},
		ref,
	) => {
		const [internalValue, setInternalValue] = useState(value);
		const [isFocused, setIsFocused] = useState(false);

		useEffect(() => {
			setInternalValue(value);
		}, [value]);

		const handleChange = (e) => {
			const newValue = e.target.value;
			setInternalValue(newValue);
			onChange?.(e);
		};

		const handleBlur = (e) => {
			setIsFocused(false);
			onBlur?.(e);
		};

		const handleFocus = (e) => {
			setIsFocused(true);
			onFocus?.(e);
		};

		const handleClear = () => {
			setInternalValue('');
			onChange?.({
				target: { name, value: '' },
			});
		};

		const textareaClasses = `
			textarea
			${error && touched ? 'textarea-error' : ''}
			${successMessage && touched ? 'textarea-success' : ''}
			${disabled ? 'textarea-disabled' : ''}
			${readOnly ? 'textarea-readonly' : ''}
			${isFocused ? 'textarea-focused' : ''}
			${!resizable ? 'textarea-no-resize' : ''}
			${className}
		`.trim();

		const charCount = internalValue.length;
		const showClearBtn =
			clearable && internalValue && !disabled && !readOnly;

		return (
			<div className="textarea-wrapper">
				{label && (
					<label className="textarea-label" htmlFor={name}>
						<span>{label}</span>
						{required && (
							<span className="textarea-required">*</span>
						)}
					</label>
				)}

				<div className="textarea-container">
					<textarea
						ref={ref}
						id={name}
						className={textareaClasses}
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
