import React, { useCallback, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';

function DataTable({
	columns,
	rows,
	pagination,
	total,
	onPageChange,
	onView,
	onDelete,
	showActions = true,
	to = '',
	linkLabel = '',
}) {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedRowId, setSelectedRowId] = useState(null);

	const handleMenuOpen = (event, rowId) => {
		setAnchorEl(event.currentTarget);
		setSelectedRowId(rowId);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		setSelectedRowId(null);
	};

	const handleView = () => {
		if (onView) {
			onView(selectedRowId);
		}
		handleMenuClose();
	};

	const handleDelete = () => {
		if (onDelete) {
			onDelete(selectedRowId);
		}
		handleMenuClose();
	};

	const handleChangePage = useCallback(
		(event, newPage) => {
			onPageChange(newPage);
		},
		[onPageChange],
	);

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer
				sx={{
					maxHeight: 420,
					'&::-webkit-scrollbar': {
						height: '6px',
					},
					'&::-webkit-scrollbar-track': {
						background: '#f1f1f1',
					},
					'&::-webkit-scrollbar-thumb': {
						background: '#888',
						borderRadius: '3px',
					},
					'&::-webkit-scrollbar-thumb:hover': {
						background: '#555',
					},
				}}
			>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{showActions && (
								<TableCell
									align="center"
									sx={{
										minWidth: 56,
										fontWeight: 'bold',
									}}
								></TableCell>
							)}
							{columns.map((column) => (
								<TableCell
									key={column.key}
									align={column.align}
									style={{
										minWidth: column.minWidth ?? 170,
										fontWeight: 'bold',
									}}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => {
							return (
								<TableRow
									hover
									role="checkbox"
									tabIndex={-1}
									key={row.id}
								>
									{showActions && (
										<TableCell align="center">
											<IconButton
												size="small"
												onClick={(e) =>
													handleMenuOpen(e, row.id)
												}
												aria-label="actions"
											>
												<MoreVertIcon fontSize="small" />
											</IconButton>
										</TableCell>
									)}
									{columns.map((column) => {
										const value = row[column.key];
										return column.key == linkLabel && to ? (
											<TableCell
												key={column.key}
												align={column.align}
											>
												<Link
													key={row.id}
													to={`${to}/${row.id}/detail`}
													style={{
														textDecoration: 'none',
														color: 'blue',
													}}
												>
													{column.format &&
													typeof value === 'number'
														? column.format(value)
														: value}
												</Link>
											</TableCell>
										) : (
											<TableCell
												key={column.key}
												align={column.align}
											>
												{column.format &&
												typeof value === 'number'
													? column.format(value)
													: value}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Action Menu */}
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
			>
				<MenuItem onClick={handleView}>Xem chi tiết</MenuItem>
				<MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
					Xóa
				</MenuItem>
			</Menu>

			<TablePagination
				rowsPerPageOptions={[]}
				component="div"
				count={total}
				rowsPerPage={pagination.per_page}
				page={pagination.page - 1}
				onPageChange={handleChangePage}
			/>
		</Paper>
	);
}

export default React.memo(DataTable);
