import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Box,
	Paper,
	TextField,
	Button,
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Chip,
	useTheme,
	CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

/**
 * ProductSearch Component
 * Allows users to search and filter products by name, SKU, category, and status
 * @component
 * @example
 * return (
 *   <ProductSearch 
 *     onSearch={handleSearch}
 *     isLoading={loading}
 *     categories={categories}
 *   />
 * )
 */
export default function ProductSearch({
	onSearch,
	isLoading = false,
	categories = [],
	onReset,
}) {
	const theme = useTheme();
	const [filters, setFilters] = useState({
		search: '',
		category: '',
		status: 'active',
	});

	/**
	 * Handle input field changes
	 */
	const handleFilterChange = (field) => (event) => {
		setFilters((prev) => ({
			...prev,
			[field]: event.target.value,
		}));
	};

	/**
	 * Handle search submission
	 */
	const handleSearchSubmit = () => {
		onSearch(filters);
	};

	/**
	 * Handle reset filters
	 */
	const handleResetFilters = () => {
		const emptyFilters = {
			search: '',
			category: '',
			status: 'active',
		};
		setFilters(emptyFilters);
		if (onReset) {
			onReset(emptyFilters);
		} else {
			onSearch(emptyFilters);
		}
	};

	/**
	 * Check if filters have been applied
	 */
	const hasActiveFilters =
		filters.search || filters.category || filters.status !== 'active';

	return (
		<Paper
			elevation={0}
			sx={{
				p: 3,
				mb: 3,
				border: `1px solid ${theme.palette.divider}`,
				borderRadius: theme.spacing(1),
				backgroundColor: theme.palette.mode === 'dark'
					? theme.palette.background.paper
					: '#fafafa',
			}}
		>
			<Grid container spacing={2} alignItems="flex-end">
				{/* Search Text Field */}
				<Grid item xs={12} sm={6} md={3}>
					<TextField
						fullWidth
						label="Tìm kiếm (Tên/SKU)"
						placeholder="Nhập tên hoặc mã SKU"
						value={filters.search}
						onChange={handleFilterChange('search')}
						variant="outlined"
						size="small"
						disabled={isLoading}
						InputProps={{
							startAdornment: (
								<SearchIcon
									sx={{
										mr: 1,
										color: theme.palette.action.active,
									}}
								/>
							),
						}}
						sx={{
							'& .MuiOutlinedInput-root': {
								'&:hover fieldset': {
									borderColor: theme.palette.primary.main,
								},
							},
						}}
					/>
				</Grid>

				{/* Category Filter */}
				{categories.length > 0 && (
					<Grid item xs={12} sm={6} md={3}>
						<FormControl
							fullWidth
							size="small"
							disabled={isLoading}
						>
							<InputLabel>Danh mục</InputLabel>
							<Select
								value={filters.category}
								onChange={handleFilterChange('category')}
								label="Danh mục"
							>
								<MenuItem value="">Tất cả</MenuItem>
								{categories.map((cat) => (
									<MenuItem key={cat.id} value={cat.id}>
										{cat.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
				)}

				{/* Status Filter */}
				<Grid item xs={12} sm={6} md={3}>
					<FormControl
						fullWidth
						size="small"
						disabled={isLoading}
					>
						<InputLabel>Trạng thái</InputLabel>
						<Select
							value={filters.status}
							onChange={handleFilterChange('status')}
							label="Trạng thái"
						>
							<MenuItem value="">Tất cả</MenuItem>
							<MenuItem value="active">Hoạt động</MenuItem>
							<MenuItem value="inactive">Ngưng hoạt động</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				{/* Action Buttons */}
				<Grid item xs={12} sm={6} md={3}>
					<Box sx={{ display: 'flex', gap: 1 }}>
						<Button
							variant="contained"
							onClick={handleSearchSubmit}
							disabled={isLoading}
							fullWidth
							startIcon={
								isLoading ? (
									<CircularProgress size={20} />
								) : (
									<SearchIcon />
								)
							}
							sx={{
								textTransform: 'none',
								fontWeight: 500,
							}}
						>
							{isLoading ? 'Đang tìm...' : 'Tìm kiếm'}
						</Button>
						{hasActiveFilters && (
							<Button
								variant="outlined"
								onClick={handleResetFilters}
								disabled={isLoading}
								startIcon={<ClearIcon />}
								sx={{
									textTransform: 'none',
									fontWeight: 500,
								}}
							>
								Đặt lại
							</Button>
						)}
					</Box>
				</Grid>
			</Grid>

			{/* Active Filters Display */}
			{hasActiveFilters && (
				<Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
					{filters.search && (
						<Chip
							label={`Tìm kiếm: ${filters.search}`}
							onDelete={() => {
								setFilters((prev) => ({
									...prev,
									search: '',
								}));
								onSearch({
									...filters,
									search: '',
								});
							}}
							variant="outlined"
							size="small"
						/>
					)}
					{filters.category && (
						<Chip
							label={`Danh mục: ${
								categories.find((c) => c.id === filters.category)
									?.name || 'N/A'
							}`}
							onDelete={() => {
								setFilters((prev) => ({
									...prev,
									category: '',
								}));
								onSearch({
									...filters,
									category: '',
								});
							}}
							variant="outlined"
							size="small"
						/>
					)}
					{filters.status && filters.status !== 'active' && (
						<Chip
							label={`Trạng thái: ${
								filters.status === 'active'
									? 'Hoạt động'
									: 'Ngưng hoạt động'
							}`}
							onDelete={() => {
								setFilters((prev) => ({
									...prev,
									status: 'active',
								}));
								onSearch({
									...filters,
									status: 'active',
								});
							}}
							variant="outlined"
							size="small"
						/>
					)}
				</Box>
			)}
		</Paper>
	);
}

ProductSearch.propTypes = {
	onSearch: PropTypes.func.isRequired,
	isLoading: PropTypes.bool,
	categories: PropTypes.array,
	onReset: PropTypes.func,
};
