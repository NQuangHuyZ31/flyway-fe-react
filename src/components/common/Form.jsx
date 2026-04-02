// src/components/common/Form.jsx
// Advanced Form component with validation and field management

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const Form = ({
	onSubmit,
	onChange,
	initialValues = {},
	validationSchema = {},
	children,
	className = '',
}) => {
	const [data, setData] = useState(initialValues);
	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});

	const validate = useCallback(
		(values) => {
			const newErrors = {};
			Object.entries(validationSchema).forEach(([field, rules]) => {
				const value = values[field];

				if (
					rules.required &&
					(!value || value.toString().trim() === '')
				) {
					newErrors[field] = `${field} is required`;
				} else if (rules.pattern && !rules.pattern.test(value)) {
					newErrors[field] = rules.message || `Invalid ${field}`;
				} else if (
					rules.minLength &&
					value &&
					value.length < rules.minLength
				) {
					newErrors[field] = `Minimum ${rules.minLength} characters`;
				} else if (
					rules.maxLength &&
					value &&
					value.length > rules.maxLength
				) {
					newErrors[field] = `Maximum ${rules.maxLength} characters`;
				}
			});
			setErrors(newErrors);
			return Object.keys(newErrors).length === 0;
		},
		[validationSchema],
	);

	const handleChange = useCallback(
		(e) => {
			const { name, value, type, checked } = e.target;
			const newData = {
				...data,
				[name]: type === 'checkbox' ? checked : value,
			};
			setData(newData);

			if (touched[name]) {
				validate(newData);
			}

			onChange?.(newData);
		},
		[data, touched, validate, onChange],
	);

	const handleBlur = useCallback(
		(e) => {
			const { name } = e.target;
			setTouched({ ...touched, [name]: true });
		},
		[touched],
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate(data)) {
			onSubmit(data);
		}
	};

	const formContextValue = {
		data,
		setData,
		errors,
		touched,
		handleChange,
		handleBlur,
		isValid: Object.keys(errors).length === 0,
	};

	return (
		<form className={`form ${className}`} onSubmit={handleSubmit}>
			{typeof children === 'function'
				? children(formContextValue)
				: children}
		</form>
	);
};

Form.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func,
	initialValues: PropTypes.object,
	validationSchema: PropTypes.object,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
	className: PropTypes.string,
};

export default Form;
