// src/components/common/Table.jsx
// Advanced Data Table component with sorting, filtering, pagination

import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import './Table.css';

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
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedRows, setSelectedRows] = useState(new Set());

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

		const startIdx = (currentPage - 1) * rowsPerPage;
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

	if (loading) {
		return <div className="table-loading">Loading...</div>;
	}

	if (sortedData.length === 0) {
		return <div className="table-empty">{emptyMessage}</div>;
	}

	return (
		<div className={`table-container ${className}`}>
			<table className="table">
				<thead>
					<tr>
						{selectable && (
							<th className="table-checkbox-col">
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
