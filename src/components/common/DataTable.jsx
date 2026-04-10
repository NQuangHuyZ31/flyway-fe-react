import React, { useCallback, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

function DataTable({
	columns = [],
	pagination = { page: 0, per_page: 15 },
	total = 0,
	onPageChange = () => {},
	showActions = true,
	children,
}) {
	const handleChangePage = useCallback(
		(event, newPage) => {
			if (onPageChange) {
				onPageChange(newPage);
			}
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
						{total && total > 0 ? (
							children
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									align="center"
								>
									Không có dữ liệu
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Pagination */}
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
