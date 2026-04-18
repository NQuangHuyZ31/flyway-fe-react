// src/components/features/categories/CategoriesFeature.jsx
// Categories Feature - Feature Layer
// Handles business logic, local state, and coordinates sub-components

import React, { useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TablePagination,
	Chip,
	Box,
	Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '../../common/Button';
import DynamicFilter from '../../common/DynamicFilter';
import EntityActionMenu from '../../common/EntityActionMenu';
import DataTable from '../../common/DataTable';

/**
 * Categories Feature Component
 * Feature Layer: Renders category list with inline filters
 * State: Filter inputs (tempFilters)
 * Event handlers: Search, Clear, Pagination, Edit, Delete
 */
const CategoriesTable = ({
	categories = [],
	columns = [],
	headerFilters = [],
	pagination = { page: 0, per_page: 15 },
	total = 0,
	filters = {},
	isLoading = false,
	showActions = true,
	onPageChange,
	onEdit,
	onDelete,
	onView,
	onSearchfilter,
	onClearFilters,
}) => {
	const [tempFilters, setTempFilters] = useState({});

	/**
	 * Handle filter input change
	 */
	const handleFilterChange = (key, value) => {
		setTempFilters((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	/**
	 * Handle search with filters
	 */
	const handleSearchFilter = () => {
		onSearchfilter(tempFilters);
	};

	/**
	 * Handle clear filters
	 */
	const handleClearFilters = () => {
		setTempFilters({});
		onClearFilters();
	};

	/**
	 * Handle pagination change
	 */
	const handlePageChange = (event, newPage) => {
		onPaginationChange(newPage);
	};

	const displayColumns =
		headerFilters && headerFilters.length > 0 ? headerFilters : columns;

	return (
		<DataTable
			tableTitle="Danh sách danh mục"
			columns={displayColumns}
			total={total}
			pagination={pagination}
			onPageChange={onPageChange}
			isLoading={isLoading}
			showActions={showActions}
		>
			{/* FILTER ROW */}
			<TableRow>
				{showActions && (
					<TableCell
						align="center"
						sx={{
							minWidth: 100,
							display: 'flex',
							gap: 1,
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Button
							onClick={() => onSearchfilter(tempFilters)}
							variant="contained"
							color="primary"
							size="small"
							sx={{ fontSize: 12, mb: 1 }}
						>
							<SearchIcon />
						</Button>
						<Button
							onClick={() => {
								onClearFilters();
								setTempFilters({});
							}}
							variant="contained"
							color="light"
							size="small"
							sx={{ fontSize: 12 }}
						>
							<ClearIcon />
						</Button>
					</TableCell>
				)}
				<DynamicFilter
					headerFilters={displayColumns}
					filters={tempFilters}
					onChange={handleFilterChange}
				/>
			</TableRow>

			{/* DATA ROWS */}
			{categories && categories.length > 0 ? (
				categories.map((category) => (
					<TableRow key={category.id} hover>
						{showActions && (
							<TableCell align="center">
								<EntityActionMenu
									row={category}
									config={{
										onEdit: () => onEdit(category),
										onDelete: () => onDelete(category),
										actions: ['edit', 'delete'],
									}}
								/>
							</TableCell>
						)}

						{/* Category Name */}
						<TableCell align="left">{category.name}</TableCell>

						{/* Category Slug */}
						<TableCell align="left">
							{category.slug || '-'}
						</TableCell>

						{/* Status */}
						<TableCell align="center">
							{category.is_active === 1 ||
							category.is_active === true ? (
								<Chip
									label="Đang hoạt động"
									color="success"
									size="small"
									variant="outlined"
								/>
							) : (
								<Chip
									label="Không hoạt động"
									color="default"
									size="small"
									variant="outlined"
								/>
							)}
						</TableCell>

						{/* Created At */}
						<TableCell align="left">
							{category.created_at
								? new Date(
										category.created_at,
								  ).toLocaleDateString('vi-VN')
								: '-'}
						</TableCell>
					</TableRow>
				))
			) : (
				<TableRow>
					<TableCell
						align="center"
						colSpan={displayColumns.length + (showActions ? 1 : 0)}
					>
						Không có dữ liệu
					</TableCell>
				</TableRow>
			)}
		</DataTable>
	);
};

export default React.memo(CategoriesTable);
