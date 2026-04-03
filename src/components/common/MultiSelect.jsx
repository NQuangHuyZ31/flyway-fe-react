// src/components/common/MultiSelect.jsx
// Enhanced multiple select component using Material-UI

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Select,
	MenuItem,
	FormControl,
	FormHelperText,
	InputLabel,
	Checkbox,
	ListItemText,
	Chip,
	Box,
	OutlinedInput,
} from '@mui/material';

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
	fullWidth = true,
}) => {
	const [searchTerm, setSearchTerm] = useState('');
	const selectedValues = Array.isArray(value) ? value : [];

	const handleSelect = (event) => {
		const selectedValue = event.target.value;
		const newValues = Array.isArray(selectedValue)
			? selectedValue
			: [selectedValue];

		// Check if maxSelected is exceeded
		if (maxSelected && newValues.length > maxSelected) {
			return;
		}

		onChange?.({
			target: {
				name,
				value: newValues,
			},
		});
	};

	const hasError = (error || errorMessage) && touched;
	const selectedOptions = options.filter((opt) =>
		selectedValues.includes(opt.value),
	);

	const handleDelete = (valueToDelete) => {
		const newValues = selectedValues.filter((v) => v !== valueToDelete);
		onChange?.({
			target: {
				name,
				value: newValues,
			},
		});
	};

	return (
		<Box sx={{ width: fullWidth ? '100%' : 'auto' }}>
			<FormControl
				fullWidth={fullWidth}
				error={hasError}
				disabled={disabled}
				size="small"
			>
				{label && (
					<InputLabel
						id={`${name}-label`}
						required={required}
						error={hasError}
					>
						{label}
					</InputLabel>
				)}

				<Select
					labelId={`${name}-label`}
					id={name}
					name={name}
					multiple
					value={selectedValues}
					onChange={handleSelect}
					onBlur={onBlur}
					input={<OutlinedInput label={label} />}
					renderValue={(selected) => (
						<Box
							sx={{
								display: 'flex',
								flexWrap: 'wrap',
								gap: 0.5,
							}}
						>
							{selected.map((val) => {
								const option = options.find(
									(opt) => opt.value === val,
								);
								return (
									<Chip
										key={val}
										label={
											renderValue
												? renderValue(option)
												: option?.label
										}
										onDelete={() => handleDelete(val)}
										disabled={disabled}
										size="small"
									/>
								);
							})}
						</Box>
					)}
					data-testid={testId}
				>
					{options.map((option) => (
						<MenuItem
							key={option.value}
							value={option.value}
							disabled={option.disabled || false}
						>
							<Checkbox
								checked={selectedValues.includes(option.value)}
							/>
							<ListItemText
								primary={
									renderOption
										? renderOption(option)
										: option.label
								}
							/>
						</MenuItem>
					))}

					{creatable && searchTerm && (
						<MenuItem
							onClick={() => {
								const newOption = {
									label: searchTerm,
									value: searchTerm
										.toLowerCase()
										.replace(/\s+/g, '-'),
								};
								onCreateOption?.(newOption);
								setSearchTerm('');
							}}
						>
							Create "{searchTerm}"
						</MenuItem>
					)}
				</Select>

				{hasError ? (
					<FormHelperText error>
						{errorMessage || error}
					</FormHelperText>
				) : hint ? (
					<FormHelperText>{hint}</FormHelperText>
				) : null}

				{maxSelected && selectedValues.length > 0 && (
					<FormHelperText>
						{selectedValues.length} / {maxSelected} selected
					</FormHelperText>
				)}
			</FormControl>
		</Box>
	);
};

export default MultiSelect;
