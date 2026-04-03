// src/components/common/Table.jsx
// Advanced Data Table component with sorting, filtering, pagination
// Converted to Material-UI

import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
	Table as MUITable,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
	Checkbox,
	Box,
	TablePagination,
	CircularProgress,
	Typography,
	IconButton,
	Menu,
	MenuItem,
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

const Table = ({
	columns,
	data,
	loading = false,
	sortable = true,
	selectable = false,
	pagination = true,
	rowsPerPage = 10,
	onRowSelect,
	onActionClick,
	className = '',
	emptyMessage = 'No data found',
}) => {
	const [sortConfig, setSortConfig] = useState({
		key: null,
		direction: 'asc',
	});
	const [currentPage, setCurrentPage] = useState(0);
	const [selectedRows, setSelectedRows] = useState(new Set());
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedRowForMenu, setSelectedRowForMenu] = useState(null);

	// Sort data
	const sortedData = useMemo(() => {
		if (!sortable || !sortConfig.key) return data;

		const sorted = [...data].sort((a, b) => {
			const aVal = a[sortConfig.key];
			const bVal = b[sortConfig.key];

			if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
			if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
			return 0;
		});

		return sorted;
	}, [data, sortConfig, sortable]);

	// Paginate data
	const paginatedData = useMemo(() => {
		if (!pagination) return sortedData;

		const startIdx = currentPage * rowsPerPage;
		return sortedData.slice(startIdx, startIdx + rowsPerPage);
	}, [sortedData, currentPage, rowsPerPage, pagination]);

	const totalPages = Math.ceil(sortedData.length / rowsPerPage);

	const handleSort = (key) => {
		if (!sortable) return;

		if (sortConfig.key === key) {
			setSortConfig({
				key,
				direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
			});
		} else {
			setSortConfig({ key, direction: 'asc' });
		}
	};

	const handleSelectAll = (e) => {
		if (e.target.checked) {
			setSelectedRows(new Set(paginatedData.map((_, idx) => idx)));
		} else {
			setSelectedRows(new Set());
		}
	};

	const handleSelectRow = (idx) => {
		const newSelected = new Set(selectedRows);
		if (newSelected.has(idx)) {
			newSelected.delete(idx);
		} else {
			newSelected.add(idx);
		}
		setSelectedRows(newSelected);
		onRowSelect?.(Array.from(newSelected).map((i) => paginatedData[i]));
	};

	const handleMenuOpen = (e, row) => {
		setAnchorEl(e.currentTarget);
		setSelectedRowForMenu(row);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		setSelectedRowForMenu(null);
	};

	const handleActionClick = () => {
		if (selectedRowForMenu) {
			onActionClick?.(selectedRowForMenu);
		}
		handleMenuClose();
	};

	if (loading) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '200px',
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	if (sortedData.length === 0) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '200px',
					textAlign: 'center',
				}}
			>
				<Typography color="textSecondary">{emptyMessage}</Typography>
			</Box>
		);
	}

	return (
		<Box>
			<TableContainer>
				<MUITable>
					<TableHead>
						<TableRow sx={{ backgroundColor: 'action.hover' }}>
							{selectable && (
								<TableCell padding="checkbox">
									<Checkbox
										onChange={handleSelectAll}
										checked={
											selectedRows.size ===
												paginatedData.length &&
											paginatedData.length > 0
										}
										indeterminate={
											selectedRows.size > 0 &&
											selectedRows.size <
												paginatedData.length
										}
									/>
								</TableCell>
							)}
							{columns.map((col) => (
								<TableCell
									key={col.key}
									align={col.align || 'left'}
									sortDirection={
										sortConfig.key === col.key
											? sortConfig.direction
											: false
									}
								>
									{sortable && col.sortable !== false ? (
										<TableSortLabel
											active={
												sortConfig.key === col.key
											}
											direction={
												sortConfig.key === col.key
													? sortConfig.direction
													: 'asc'
											}
											onClick={() =>
												handleSort(col.key)
											}
										>
											{col.label}
										</TableSortLabel>
									) : (
										col.label
									)}
								</TableCell>
							))}
							{onActionClick && (
								<TableCell align="center">Actions</TableCell>
							)}
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedData.map((row, rowIdx) => (
							<TableRow
								key={rowIdx}
								selected={
									selectable && selectedRows.has(rowIdx)
								}
								hover
							>
								{selectable && (
									<TableCell padding="checkbox">
										<Checkbox
											checked={selectedRows.has(
												rowIdx,
											)}
											onChange={() =>
												handleSelectRow(rowIdx)
											}
										/>
									</TableCell>
								)}
								{columns.map((col) => (
									<TableCell
										key={`${rowIdx}-${col.key}`}
										align={col.align || 'left'}
									>
										{col.render
											? col.render(
													row[col.key],
													row,
											  )
											: row[col.key]}
									</TableCell>
								))}
								{onActionClick && (
									<TableCell align="center">
										<IconButton
											size="small"
											onClick={(e) =>
												handleMenuOpen(e, row)
											}
										>
											<MoreVertIcon fontSize="small" />
										</IconButton>
										<Menu
											anchorEl={anchorEl}
											open={Boolean(anchorEl)}
											onClose={handleMenuClose}
										>
											<MenuItem
												onClick={
													handleActionClick
												}
											>
												Action
											</MenuItem>
										</Menu>
									</TableCell>
								)}
							</TableRow>
						))}
					</TableBody>
				</MUITable>
			</TableContainer>

			{pagination && totalPages > 1 && (
				<TablePagination
					component="div"
					count={sortedData.length}
					page={currentPage}
					onPageChange={(e, newPage) => setCurrentPage(newPage)}
					rowsPerPage={rowsPerPage}
					onRowsPerPageChange={(e) => {
						// Keep default behavior, not implementing full rowsPerPage change
					}}
					rowsPerPageOptions={[rowsPerPage]}
				/>
			)}
		</Box>
	);
};

Table.propTypes = {
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			sortable: PropTypes.bool,
			align: PropTypes.oneOf(['left', 'center', 'right']),
			render: PropTypes.func,
		}),
	).isRequired,
	data: PropTypes.array.isRequired,
	loading: PropTypes.bool,
	sortable: PropTypes.bool,
	selectable: PropTypes.bool,
	pagination: PropTypes.bool,
	rowsPerPage: PropTypes.number,
	onRowSelect: PropTypes.func,
	onActionClick: PropTypes.func,
	className: PropTypes.string,
	emptyMessage: PropTypes.string,
};

export default Table;
								<input
									type="checkbox"
									onChange={handleSelectAll}
									checked={
										selectedRows.size ===
											paginatedData.length &&
										paginatedData.length > 0
									}
								/>
							</th>
						)}
						{columns.map((col) => (
							<th
								key={col.key}
								onClick={() => handleSort(col.key)}
								className={`table-header ${
									sortable && col.sortable !== false
										? 'table-sortable'
										: ''
								}`}
							>
								<div className="table-header-content">
									<span>{col.label}</span>
									{sortable &&
										col.sortable !== false &&
										sortConfig.key === col.key && (
											<span
												className={`table-sort-icon ${sortConfig.direction}`}
											>
												{sortConfig.direction === 'asc'
													? '↑'
													: '↓'}
											</span>
										)}
								</div>
							</th>
						))}
						{onActionClick && (
							<th className="table-actions-col">Actions</th>
						)}
					</tr>
				</thead>
				<tbody>
					{paginatedData.map((row, rowIdx) => (
						<tr
							key={rowIdx}
							className={
								selectable && selectedRows.has(rowIdx)
									? 'table-row-selected'
									: ''
							}
						>
							{selectable && (
								<td className="table-checkbox-col">
									<input
										type="checkbox"
										checked={selectedRows.has(rowIdx)}
										onChange={() => handleSelectRow(rowIdx)}
									/>
								</td>
							)}
							{columns.map((col) => (
								<td
									key={`${rowIdx}-${col.key}`}
									className={`table-cell ${
										col.align || 'left'
									}`}
								>
									{col.render
										? col.render(row[col.key], row)
										: row[col.key]}
								</td>
							))}
							{onActionClick && (
								<td className="table-actions-col">
									<button
										className="table-action-btn"
										onClick={() => onActionClick(row)}
									>
										⋯
									</button>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>

			{pagination && totalPages > 1 && (
				<div className="table-pagination">
					<button
						disabled={currentPage === 1}
						onClick={() => setCurrentPage(currentPage - 1)}
					>
						Previous
					</button>
					<span className="pagination-info">
						Page {currentPage} of {totalPages}
					</span>
					<button
						disabled={currentPage === totalPages}
						onClick={() => setCurrentPage(currentPage + 1)}
					>
						Next
					</button>
				</div>
			)}
		</div>
	);
};

Table.propTypes = {
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			sortable: PropTypes.bool,
			align: PropTypes.oneOf(['left', 'center', 'right']),
			render: PropTypes.func,
		}),
	).isRequired,
	data: PropTypes.array.isRequired,
	loading: PropTypes.bool,
	sortable: PropTypes.bool,
	selectable: PropTypes.bool,
	pagination: PropTypes.bool,
	rowsPerPage: PropTypes.number,
	onRowSelect: PropTypes.func,
	onActionClick: PropTypes.func,
	className: PropTypes.string,
	emptyMessage: PropTypes.string,
};

export default Table;
