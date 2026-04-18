import React from 'react';
import {
	TableCell,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';
import Input from './Input';
import CategorySelect from './CategorySelect';
import UnitMeasureSelect from './UnitMeasureSelect';

/**
 * Generic dynamic filter component for table header rows
 *
 * Replaces hardcoded ProductFilter and can be used for all entity filters.
 * Automatically renders appropriate UI controls based on filter type and configuration.
 *
 * @param {Array} headerFilters - Array of filter config objects from API
 *   Format: [{key: 'name', label: 'Product Name', type: 'text'}, ...]
 * @param {Object} filters - Current filter values {key: value, ...}
 * @param {Function} onChange - Callback when filter changes: (key, value) => void
 * @param {Object} filterRules - Optional custom field type mappings
 *   Format: {category_id: 'CategorySelect', status: 'booleanSelect', ...}
 *
 * @example
 * <DynamicFilter
 *   headerFilters={headerFilters}
 *   filters={filters}
 *   onChange={onFilterChange}
 *   filterRules={{
 *     category_id: 'CategorySelect',
 *     unit_id: 'UnitMeasureSelect',
 *     is_active: 'booleanSelect',
 *   }}
 * />
 */
const DynamicFilter = ({
	headerFilters = [],
	filters = {},
	onChange,
	filterRules = {},
}) => {
	// Default filter type mappings
	const defaultFilterRules = {
		category_id: 'CategorySelect',
		category_name: 'CategorySelect',
		unit_id: 'UnitMeasureSelect',
		unit_name: 'UnitMeasureSelect',
		is_active: 'booleanSelect',
		status: 'booleanSelect',
	};

	/**
	 * Render appropriate filter control based on type
	 */
	const renderFilterControl = (filter) => {
		const { key, label, type } = filter;
		const value = filters[key] ?? '';
		const rule = filterRules[key] || defaultFilterRules[key];

		// Custom component: CategorySelect
		if (rule === 'CategorySelect') {
			return (
				<TableCell key={key}>
					<CategorySelect
						value={value}
						onChange={(val) => onChange(key, val)}
					/>
				</TableCell>
			);
		}

		// Custom component: UnitMeasureSelect
		if (rule === 'UnitMeasureSelect') {
			return (
				<TableCell key={key}>
					<UnitMeasureSelect
						value={value}
						onChange={(val) => onChange(key, val)}
					/>
				</TableCell>
			);
		}

		// Boolean select (is_active, status, etc.)
		if (rule === 'booleanSelect' || type === 'boolean') {
			return (
				<TableCell key={key}>
					<FormControl
						sx={{ minWidth: 100, width: '100%' }}
						size="small"
					>
						<InputLabel id={`filter-${key}-label`}>
							{label}
						</InputLabel>
						<Select
							labelId={`filter-${key}-label`}
							id={`filter-${key}-select`}
							value={value}
							onChange={(e) => onChange(key, e.target.value)}
							label={label}
						>
							<MenuItem value="">Tất cả</MenuItem>
							<MenuItem value="1">Hoạt động</MenuItem>
							<MenuItem value="0">Không hoạt động</MenuItem>
						</Select>
					</FormControl>
				</TableCell>
			);
		}

		// Number input
		if (type === 'number') {
			return (
				<TableCell key={key}>
					<Input
						type="number"
						value={value}
						placeholder={label}
						onChange={(e) => onChange(key, e.target.value)}
						min="1"
						size="small"
					/>
				</TableCell>
			);
		}

		// Date input
		if (type === 'date') {
			return (
				<TableCell key={key}>
					<Input
						type="date"
						value={value}
						onChange={(e) => onChange(key, e.target.value)}
						size="small"
					/>
				</TableCell>
			);
		}

		// Default: text input
		return (
			<TableCell key={key}>
				<Input
					type={type || 'text'}
					value={value}
					placeholder={label}
					onChange={(e) => onChange(key, e.target.value)}
					size="small"
				/>
			</TableCell>
		);
	};

	// Filter out empty header filters and render
	if (!headerFilters || headerFilters.length === 0) {
		return null;
	}

	return headerFilters.map(renderFilterControl);
};

export default DynamicFilter;
