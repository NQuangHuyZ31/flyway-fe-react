import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Box,
	Paper,
	TextField,
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Collapse,
	IconButton,
	useTheme,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

/**
 * ProductFilter Component
 * Advanced filtering options for product search
 * Can be expanded/collapsed for better UX
 * @component
 */
export default function ProductFilter({
	onFilter,
	categories = [],
	isLoading = false,
}) {
	const theme = useTheme();
	const [expanded, setExpanded] = useState(false);
	const [advancedFilters, setAdvancedFilters] = useState({
		minPrice: '',
		maxPrice: '',
		minStock: '',
		supplier: '',
		unit: '',
	});

	/**
	 * Handle input changes
	 */
	const handleFilterChange = (field) => (event) => {
		setAdvancedFilters((prev) => ({
			...prev,
			[field]: event.target.value,
		}));
	};

	/**
	 * Apply filters
	 */
	const handleApplyFilters = () => {
		// Remove empty filters
		const cleanedFilters = Object.fromEntries(
			Object.entries(advancedFilters).filter(([, value]) => value !== '')
		);
		onFilter(cleanedFilters);
	};

	/**
	 * Reset filters
	 */
	const handleResetFilters = () => {
		const emptyFilters = {
			minPrice: '',
			maxPrice: '',
			minStock: '',
			supplier: '',
			unit: '',
		};
		setAdvancedFilters(emptyFilters);
		onFilter({});
	};

	/**
	 * Check if any filters are applied
	 */
	const hasActiveFilters = Object.values(advancedFilters).some(
		(value) => value !== ''
	);

	return (
		<Paper
			elevation={0}
			sx={{
				border: `1px solid ${theme.palette.divider}`,
				borderRadius: theme.spacing(1),
				backgroundColor: theme.palette.mode === 'dark'
					? theme.palette.background.paper
					: '#fafafa',
			}}
		>
			{/* Filter Toggle Button */}
			<Box
				sx={{
					p: 2,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					cursor: 'pointer',
					backgroundColor: theme.palette.mode === 'dark'
						? 'rgba(255,255,255,0.05)'
						: 'rgba(0,0,0,0.02)',
					'&:hover': {
						backgroundColor: theme.palette.mode === 'dark'
							? 'rgba(255,255,255,0.08)'
							: 'rgba(0,0,0,0.04)',
					},
				}}
				onClick={() => setExpanded(!expanded)}
			>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<FilterListIcon color="primary" />
					<span style={{ fontWeight: 500 }}>
						{hasActiveFilters
							? `Bộ lọc (${
									Object.values(advancedFilters).filter(
										(v) => v !== ''
									).length
								  } đã chọn)`
							: 'Bộ lọc nâng cao'}
					</span>
				</Box>
				<IconButton
					size="small"
					sx={{
						transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
						transition: 'transform 0.3s',
					}}
				>
					{expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
				</IconButton>
			</Box>

			{/* Filter Content */}
			<Collapse in={expanded}>
				<Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
					<Grid container spacing={2} alignItems="flex-end">
						{/* Price Range */}
						<Grid item xs={12} sm={6} md={2}>
							<TextField
								fullWidth
								type="number"
								label="Giá minimum"
								value={advancedFilters.minPrice}
								onChange={handleFilterChange('minPrice')}
								variant="outlined"
								size="small"
								disabled={isLoading}
								inputProps={{ step: '10000', min: '0' }}
							/>
						</Grid>

						<Grid item xs={12} sm={6} md={2}>
							<TextField
								fullWidth
								type="number"
								label="Giá maximum"
								value={advancedFilters.maxPrice}
								onChange={handleFilterChange('maxPrice')}
								variant="outlined"
								size="small"
								disabled={isLoading}
								inputProps={{ step: '10000', min: '0' }}
							/>
						</Grid>

						{/* Minimum Stock */}
						<Grid item xs={12} sm={6} md={2}>
							<TextField
								fullWidth
								type="number"
								label="Tồn kho tối thiểu"
								value={advancedFilters.minStock}
								onChange={handleFilterChange('minStock')}
								variant="outlined"
								size="small"
								disabled={isLoading}
								inputProps={{ step: '1', min: '0' }}
							/>
						</Grid>

						{/* Supplier Filter */}
						<Grid item xs={12} sm={6} md={2}>
							<TextField
								fullWidth
								label="Nhà cung cấp"
								value={advancedFilters.supplier}
								onChange={handleFilterChange('supplier')}
								variant="outlined"
								size="small"
								disabled={isLoading}
								placeholder="Nhập tên nhà cung cấp"
							/>
						</Grid>

						{/* Unit Filter */}
						<Grid item xs={12} sm={6} md={2}>
							<TextField
								fullWidth
								label="Đơn vị"
								value={advancedFilters.unit}
								onChange={handleFilterChange('unit')}
								variant="outlined"
								size="small"
								disabled={isLoading}
								placeholder="Nhập đơn vị"
							/>
						</Grid>

						{/* Action Buttons */}
						<Grid item xs={12} sm={6} md={2}>
							<Box sx={{ display: 'flex', gap: 1 }}>
								<Button
									variant="contained"
									onClick={handleApplyFilters}
									disabled={isLoading}
									fullWidth
									size="small"
									sx={{ textTransform: 'none' }}
								>
									Áp dụng
								</Button>
								{hasActiveFilters && (
									<Button
										variant="outlined"
										onClick={handleResetFilters}
										disabled={isLoading}
										size="small"
										startIcon={<RestartAltIcon />}
										sx={{ textTransform: 'none' }}
									>
										Đặt lại
									</Button>
								)}
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Collapse>
		</Paper>
	);
}

ProductFilter.propTypes = {
	onFilter: PropTypes.func.isRequired,
	categories: PropTypes.array,
	isLoading: PropTypes.bool,
};
