// src/components/common/MultiSelect.jsx
// Enhanced multiple select component

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './MultiSelect.css';

const MultiSelect = ({
	name,
	label,
	options,
	value = [],
	onChange,
	onBlur,
	placeholder = 'Select options...',
	disabled = false,
	required = false,
	error,
	errorMessage,
	touched,
	searchable = true,
	creatable = false,
	clearable = true,
	maxSelected,
	hint,
	className = '',
	testId,
	renderOption,
	renderValue,
	onCreateOption,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedValues, setSelectedValues] = useState(value || []);
	const wrapperRef = useRef(null);
	const inputRef = useRef(null);

	useEffect(() => {
		setSelectedValues(value || []);
	}, [value]);

	const filteredOptions = options.filter((opt) =>
		opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const selectedOptions = options.filter((opt) =>
		selectedValues.includes(opt.value),
	);

	const handleSelect = (option) => {
		let newValues;

		if (selectedValues.includes(option.value)) {
			newValues = selectedValues.filter((v) => v !== option.value);
		} else {
			if (maxSelected && selectedValues.length >= maxSelected) {
				return;
			}
			newValues = [...selectedValues, option.value];
		}

		setSelectedValues(newValues);
		onChange?.({ target: { name, value: newValues } });
		setSearchTerm('');
	};

	const handleRemove = (value) => {
		const newValues = selectedValues.filter((v) => v !== value);
		setSelectedValues(newValues);
		onChange?.({ target: { name, value: newValues } });
	};

	const handleClear = () => {
		setSelectedValues([]);
		onChange?.({ target: { name, value: [] } });
		setSearchTerm('');
	};

	const handleCreateOption = () => {
		if (!creatable || !searchTerm.trim()) return;

		const newOption = {
			label: searchTerm,
			value: searchTerm.toLowerCase().replace(/\s+/g, '-'),
		};

		onCreateOption?.(newOption);
		setSearchTerm('');
	};

	// Close on outside click
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

	const multiSelectClasses = `
		multi-select
		${isOpen ? 'multi-select-open' : ''}
		${disabled ? 'multi-select-disabled' : ''}
		${(error || errorMessage) && touched ? 'multi-select-error' : ''}
		${className}
	`.trim();

	return (
		<div className={multiSelectClasses} ref={wrapperRef}>
			{label && (
				<label className="multi-select-label">
					{label}
					{required && (
						<span className="multi-select-required">*</span>
					)}
				</label>
			)}

			<div className="multi-select-container">
				<div
					className="multi-select-input"
					onClick={() => !disabled && setIsOpen(!isOpen)}
				>
					{selectedOptions.length > 0 ? (
						<div className="multi-select-values">
							{selectedOptions.map((opt) => (
								<span
									key={opt.value}
									className="multi-select-tag"
								>
									{renderValue ? renderValue(opt) : opt.label}
									{!disabled && (
										<button
											type="button"
											className="multi-select-tag-remove"
											onClick={(e) => {
												e.stopPropagation();
												handleRemove(opt.value);
											}}
										>
											✕
										</button>
									)}
								</span>
							))}
						</div>
					) : (
						<span className="multi-select-placeholder">
							{placeholder}
						</span>
					)}

					{clearable && selectedValues.length > 0 && !disabled && (
						<button
							type="button"
							className="multi-select-clear"
							onClick={(e) => {
								e.stopPropagation();
								handleClear();
							}}
							aria-label="Clear selection"
						>
							✕
						</button>
					)}

					<span className="multi-select-toggle" aria-hidden="true">
						▼
					</span>
				</div>

				{/* Dropdown */}
				{isOpen && (
					<div className="multi-select-dropdown">
						{searchable && (
							<input
								ref={inputRef}
								type="text"
								className="multi-select-search"
								placeholder="Search..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								onClick={(e) => e.stopPropagation()}
							/>
						)}

						<ul className="multi-select-options">
							{filteredOptions.length > 0 ? (
								filteredOptions.map((opt) => (
									<li
										key={opt.value}
										className={`
											multi-select-option
											${selectedValues.includes(opt.value) ? 'multi-select-option-selected' : ''}
											${opt.disabled ? 'multi-select-option-disabled' : ''}
										`.trim()}
										onClick={() =>
											!opt.disabled && handleSelect(opt)
										}
									>
										<input
											type="checkbox"
											checked={selectedValues.includes(
												opt.value,
											)}
											readOnly
										/>
										<span className="multi-select-option-label">
											{renderOption
												? renderOption(opt)
												: opt.label}
										</span>
									</li>
								))
							) : (
								<li className="multi-select-no-options">
									{creatable && searchTerm ? (
										<button
											type="button"
											className="multi-select-create"
											onClick={handleCreateOption}
										>
											Create "{searchTerm}"
										</button>
									) : (
										<span>No options found</span>
									)}
								</li>
							)}
						</ul>

						{maxSelected && (
							<div className="multi-select-info">
								{selectedValues.length} / {maxSelected} selected
							</div>
						)}
					</div>
				)}
			</div>

			{/* Feedback */}
			{hint && !error && !errorMessage && (
				<span className="multi-select-hint">{hint}</span>
			)}
			{(error || errorMessage) && touched && (
				<span className="multi-select-error">
					{errorMessage || error}
				</span>
			)}
		</div>
	);
};

MultiSelect.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
				.isRequired,
			disabled: PropTypes.bool,
		}),
	).isRequired,
	value: PropTypes.arrayOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	error: PropTypes.string,
	errorMessage: PropTypes.string,
	touched: PropTypes.bool,
	searchable: PropTypes.bool,
	creatable: PropTypes.bool,
	clearable: PropTypes.bool,
	maxSelected: PropTypes.number,
	hint: PropTypes.string,
	className: PropTypes.string,
	testId: PropTypes.string,
	renderOption: PropTypes.func,
	renderValue: PropTypes.func,
	onCreateOption: PropTypes.func,
};

export default MultiSelect;
