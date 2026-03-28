import React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Checkbox,
	TablePagination,
	Box,
	IconButton,
	useTheme,
	Menu,
	MenuItem,
} from '@mui/material';
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	MoreVert as MoreVertIcon,
} from '@mui/icons-material';

const DataTable = ({
	columns,
	rows,
	onEdit,
	onDelete,
	selectable = false,
	onSelect,
	loading = false,
	pagination = true,
}) => {
	const theme = useTheme();
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [selectedRow, setSelectedRow] = React.useState(null);

	const handleSelectAll = (event) => {
		if (event.target.checked) {
			setSelected(rows.map((row, index) => index));
			onSelect && onSelect(rows.map((row, index) => index));
		} else {
			setSelected([]);
			onSelect && onSelect([]);
		}
	};

	const handleSelectRow = (index) => {
		const newSelected = selected.includes(index)
			? selected.filter((i) => i !== index)
			: [...selected, index];
		setSelected(newSelected);
		onSelect && onSelect(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleMenuOpen = (event, rowIndex) => {
		setAnchorEl(event.currentTarget);
		setSelectedRow(rowIndex);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		setSelectedRow(null);
	};

	const displayRows = pagination
		? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
		: rows;

	return (
		<Box>
			<TableContainer
				component={Paper}
				sx={{
					boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
					borderRadius: 2,
				}}
			>
				<Table>
					<TableHead>
						<TableRow
							sx={{
								backgroundColor:
									theme.palette.mode === 'light'
										? theme.palette.grey[50]
										: theme.palette.grey[800],
								borderBottom: `2px solid ${theme.palette.divider}`,
							}}
						>
							{selectable && (
								<TableCell padding="checkbox">
									<Checkbox
										indeterminate={
											selected.length > 0 &&
											selected.length < rows.length
										}
										checked={
											rows.length > 0 &&
											selected.length === rows.length
										}
										onChange={handleSelectAll}
									/>
								</TableCell>
							)}
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align || 'left'}
									sx={{
										fontWeight: 'bold',
										fontSize: '0.9rem',
										py: 2,
									}}
								>
									{column.label}
								</TableCell>
							))}
							{(onEdit || onDelete) && (
								<TableCell align="center">Actions</TableCell>
							)}
						</TableRow>
					</TableHead>
					<TableBody>
						{displayRows.map((row, rowIndex) => (
							<TableRow
								key={row.id || rowIndex}
								hover
								sx={{
									backgroundColor: selected.includes(rowIndex)
										? theme.palette.action.selected
										: 'inherit',
									'&:hover': {
										backgroundColor:
											theme.palette.action.hover,
									},
								}}
							>
								{selectable && (
									<TableCell padding="checkbox">
										<Checkbox
											checked={selected.includes(
												rowIndex,
											)}
											onChange={() =>
												handleSelectRow(rowIndex)
											}
										/>
									</TableCell>
								)}
								{columns.map((column) => (
									<TableCell
										key={`${row.id}-${column.id}`}
										align={column.align || 'left'}
										sx={{
											py: 2,
										}}
									>
										{column.render
											? column.render(row[column.id], row)
											: row[column.id]}
									</TableCell>
								))}
								{(onEdit || onDelete) && (
									<TableCell align="center">
										<IconButton
											size="small"
											onClick={(event) =>
												handleMenuOpen(event, rowIndex)
											}
										>
											<MoreVertIcon fontSize="small" />
										</IconButton>
										<Menu
											anchorEl={anchorEl}
											open={
												selectedRow === rowIndex &&
												Boolean(anchorEl)
											}
											onClose={handleMenuClose}
										>
											{onEdit && (
												<MenuItem
													onClick={() => {
														onEdit(row);
														handleMenuClose();
													}}
												>
													<EditIcon
														sx={{ mr: 1 }}
														fontSize="small"
													/>{' '}
													Edit
												</MenuItem>
											)}
											{onDelete && (
												<MenuItem
													onClick={() => {
														onDelete(row);
														handleMenuClose();
													}}
													sx={{
														color: theme.palette
															.error.main,
													}}
												>
													<DeleteIcon
														sx={{ mr: 1 }}
														fontSize="small"
													/>{' '}
													Delete
												</MenuItem>
											)}
										</Menu>
									</TableCell>
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{pagination && (
				<TablePagination
					rowsPerPageOptions={[5, 10, 25, 50]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					sx={{ borderTop: `1px solid ${theme.palette.divider}` }}
				/>
			)}
		</Box>
	);
};

export default DataTable;
