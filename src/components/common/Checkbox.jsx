// src/components/common/Checkbox.jsx
// Enhanced Checkbox component with indeterminate state

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

const Checkbox = forwardRef(
	(
		{
			id,
			name,
			label,
			value,
			checked = false,
			onChange,
			disabled = false,
			indeterminate = false,
			error,
			className = '',
			ariaLabel,
			testId,
		},
		ref,
	) => {
		const checkboxClasses = `
			checkbox
			${checked ? 'checkbox-checked' : ''}
			${indeterminate ? 'checkbox-indeterminate' : ''}
			${disabled ? 'checkbox-disabled' : ''}
			${error ? 'checkbox-error' : ''}
			${className}
		`.trim();

		const inputId = id || name;

		return (
			<div className={checkboxClasses}>
				<input
					ref={ref}
					type="checkbox"
					id={inputId}
					name={name}
					value={value}
					checked={checked}
					onChange={onChange}
					disabled={disabled}
					aria-label={ariaLabel || label}
					aria-checked={indeterminate ? 'mixed' : checked}
					data-testid={testId}
					className="checkbox-input"
				/>
				<label htmlFor={inputId} className="checkbox-label">
					<span className="checkbox-icon">
						{indeterminate ? '−' : checked ? '✓' : ''}
					</span>
					{label && <span className="checkbox-text">{label}</span>}
				</label>
				{error && (
					<span className="checkbox-error-message">{error}</span>
				)}
			</div>
		);
	},
);

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
	checked: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	indeterminate: PropTypes.bool,
	error: PropTypes.string,
	className: PropTypes.string,
	ariaLabel: PropTypes.string,
	testId: PropTypes.string,
};

export default Checkbox;
