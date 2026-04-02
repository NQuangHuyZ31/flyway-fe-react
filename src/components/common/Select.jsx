// src/components/common/Select.jsx
// Reusable Select/Dropdown component

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Select.css';

const Select = ({
	label,
	name,
	value,
	onChange,
	options,
	placeholder = 'Select an option',
	error,
	touched,
	disabled = false,
	required = false,
	searchable = true,
	multi = false,
	className = '',
	onBlur,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const wrapperRef = useRef(null);

	const filteredOptions = options.filter((opt) =>
		opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const selectedOption = options.find((opt) => opt.value === value);

	const handleSelect = (option) => {
		onChange({ target: { name, value: option.value } });
		setIsOpen(false);
		setSearchTerm('');
	};

	return (
		<div className="select-wrapper" ref={wrapperRef}>
			{label && (
				<label className="select-label">
					{label}
					{required && <span className="select-required">*</span>}
				</label>
			)}

			<div
				className={`select-input ${isOpen ? 'select-open' : ''} ${
					error && touched ? 'select-error' : ''
				}`.trim()}
				onClick={() => !disabled && setIsOpen(!isOpen)}
			>
				<div className="select-value">
					{selectedOption ? selectedOption.label : placeholder}
				</div>
				<div className="select-arrow">▼</div>
			</div>

			{isOpen && (
				<div className="select-dropdown">
					{searchable && (
						<input
							type="text"
							className="select-search"
							placeholder="Search..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							onClick={(e) => e.stopPropagation()}
						/>
					)}

					<div className="select-options">
						{filteredOptions.length > 0 ? (
							filteredOptions.map((option) => (
								<div
									key={option.value}
									className={`select-option ${
										selectedOption?.value === option.value
											? 'select-option-selected'
											: ''
									}`.trim()}
									onClick={() => handleSelect(option)}
								>
									{option.label}
								</div>
							))
						) : (
							<div className="select-no-options">
								No options found
							</div>
						)}
					</div>
				</div>
			)}

			{error && touched && (
				<span className="select-error-text">{error}</span>
			)}
		</div>
	);
};

Select.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
				.isRequired,
			label: PropTypes.string.isRequired,
		}),
	).isRequired,
	placeholder: PropTypes.string,
	error: PropTypes.string,
	touched: PropTypes.bool,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	searchable: PropTypes.bool,
	multi: PropTypes.bool,
	className: PropTypes.string,
	onBlur: PropTypes.func,
};

export default Select;
