// src/components/common/Radio.jsx
// Enhanced Radio component with group support

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './Radio.css';

const Radio = forwardRef(
	(
		{
			id,
			name,
			label,
			value,
			checked = false,
			onChange,
			disabled = false,
			error,
			className = '',
			ariaLabel,
			testId,
		},
		ref,
	) => {
		const radioClasses = `
			radio
			${checked ? 'radio-checked' : ''}
			${disabled ? 'radio-disabled' : ''}
			${error ? 'radio-error' : ''}
			${className}
		`.trim();

		const inputId = id || `${name}-${value}`;

		return (
			<div className={radioClasses}>
				<input
					ref={ref}
					type="radio"
					id={inputId}
					name={name}
					value={value}
					checked={checked}
					onChange={onChange}
					disabled={disabled}
					aria-label={ariaLabel || label}
					data-testid={testId}
					className="radio-input"
				/>
				<label htmlFor={inputId} className="radio-label">
					<span className="radio-icon">
						{checked && <span className="radio-icon-inner" />}
					</span>
					{label && <span className="radio-text">{label}</span>}
				</label>
				{error && <span className="radio-error-message">{error}</span>}
			</div>
		);
	},
);

Radio.displayName = 'Radio';

Radio.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	value: PropTypes.string.isRequired,
	checked: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	error: PropTypes.string,
	className: PropTypes.string,
	ariaLabel: PropTypes.string,
	testId: PropTypes.string,
};

export default Radio;
