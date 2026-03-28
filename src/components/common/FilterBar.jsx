import React, { useState } from 'react';
import {
	Box,
	TextField,
	Button,
	Grid,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	useTheme,
	Chip,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

/**
 * Filter Bar Component
 * Provides search and filter functionality for tables/lists
 */
const FilterBar = ({
	filters = [],
	onFilterChange = null,
	onSearch = null,
	searchPlaceholder = 'Search...',
	showAdvanced = true,
}) => {
	const theme = useTheme();
	const [searchValue, setSearchValue] = useState('');
	const [activeFilters, setActiveFilters] = useState({});
	const [expanded, setExpanded] = useState(false);

	const handleSearchChange = (e) => {
		const value = e.target.value;
		setSearchValue(value);
		if (onSearch) {
			onSearch(value);
		}
	};

	const handleFilterChange = (filterKey, value) => {
		const newFilters = { ...activeFilters, [filterKey]: value };
		setActiveFilters(newFilters);
		if (onFilterChange) {
			onFilterChange(newFilters);
		}
	};

	const handleClearFilters = () => {
		setSearchValue('');
		setActiveFilters({});
		if (onFilterChange) {
			onFilterChange({});
		}
		if (onSearch) {
			onSearch('');
		}
	};

	const hasActiveFilters = Object.values(activeFilters).some(
		(v) => v !== '' && v !== null,
	);

	return (
		<Box sx={{ mb: 2 }}>
			{/* Search Bar */}
			<Box sx={{ mb: 2 }}>
				<TextField
					fullWidth
					placeholder={searchPlaceholder}
					value={searchValue}
					onChange={handleSearchChange}
					size="small"
					variant="outlined"
					sx={{
						backgroundColor: theme.palette.background.paper,
					}}
				/>
			</Box>

			{/* Advanced Filters */}
			{showAdvanced && filters.length > 0 && (
				<Accordion
					expanded={expanded}
					onChange={() => setExpanded(!expanded)}
				>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Typography variant="subtitle2">
							Advanced Filters{' '}
							{hasActiveFilters &&
								`(${
									Object.values(activeFilters).filter(
										(v) => v,
									).length
								})`}
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Grid container spacing={2}>
							{filters.map((filter) => (
								<Grid
									item
									xs={12}
									sm={6}
									md={4}
									key={filter.key}
								>
									{filter.type === 'select' ? (
										<TextField
											select
											fullWidth
											label={filter.label}
											value={
												activeFilters[filter.key] || ''
											}
											onChange={(e) =>
												handleFilterChange(
													filter.key,
													e.target.value,
												)
											}
											size="small"
											SelectProps={{
												native: false,
											}}
										>
											<option value="">-- All --</option>
											{filter.options?.map((option) => (
												<option
													key={option.value}
													value={option.value}
												>
													{option.label}
												</option>
											))}
										</TextField>
									) : (
										<TextField
											fullWidth
											label={filter.label}
											value={
												activeFilters[filter.key] || ''
											}
											onChange={(e) =>
												handleFilterChange(
													filter.key,
													e.target.value,
												)
											}
											type={filter.type}
											size="small"
										/>
									)}
								</Grid>
							))}
							<Grid item xs={12} sx={{ display: 'flex', gap: 1 }}>
								<Button
									variant="contained"
									color="primary"
									size="small"
								>
									Apply Filters
								</Button>
								{hasActiveFilters && (
									<Button
										variant="outlined"
										color="secondary"
										size="small"
										onClick={handleClearFilters}
									>
										Clear All
									</Button>
								)}
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>
			)}

			{/* Active Filter Chips */}
			{hasActiveFilters && (
				<Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
					{Object.entries(activeFilters).map(
						([key, value]) =>
							value && (
								<Chip
									key={key}
									label={`${key}: ${value}`}
									onDelete={() => handleFilterChange(key, '')}
									size="small"
									color="primary"
									variant="outlined"
								/>
							),
					)}
				</Box>
			)}
		</Box>
	);
};

export default FilterBar;
