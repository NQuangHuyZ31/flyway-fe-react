import React, { useState } from 'react';
import {
	IconButton,
	Menu,
	MenuItem,
	TableCell,
	TableRow,
	Chip,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DataTable from '../../common/DataTable';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductTable = ({
	columns = [],
	rows = [],
	pagination = { page: 0, per_page: 15 },
	total = 0,
	onPageChange = () => {},
	onDelete,
	onEdit,
	onView,
	showActions = true,
}) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedRow, setSelectedRow] = useState(null);
	const open = Boolean(anchorEl);

	const handleOpen = (event, rowId) => {
		setAnchorEl(event.currentTarget);
		setSelectedRow(rowId);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setSelectedRow(null);
	};

	const handleDelete = (row) => {
		if (onDelete) {
			onDelete(row.id, row.product_name);
		}
		handleClose();
	};

	const handleEdit = (row) => {
		if (onEdit) {
			onEdit(row);
		}
		handleClose();
	};

	const handleView = (row) => {
		if (onView) {
			onView(row.id);
		}
		handleClose();
	};

	// Helper function to format price
	const formatPrice = (price) => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(price || 0);
	};

	// Helper function to get status badge color
	const getStatusColor = (status) => {
		return status === 1 || status === '1' ? 'success' : 'default';
	};

	// Helper function to get status label
	const getStatusLabel = (status) => {
		return status === 1 || status === '1'
			? 'Hoạt động'
			: 'Không hoạt động';
	};

	return (
		<>
			<DataTable
				columns={columns}
				pagination={pagination}
				total={total}
				onPageChange={onPageChange}
				showActions={showActions}
			>
				{rows.map((row) => (
					<TableRow
						key={row.id}
						hover
						role="checkbox"
						tabIndex={-1}
					>
						{showActions && (
							<TableCell align="center">
								<IconButton
									size="small"
									onClick={(e) => handleOpen(e, row.id)}
									aria-label="actions"
								>
									<MoreVertIcon fontSize="small" />
								</IconButton>
							</TableCell>
						)}

						{/* Product Name */}
						<TableCell align="left">
							<Link
								to={`/products/${row.id}/detail`}
								style={{
									textDecoration: 'none',
									color: '#1976d2',
									fontWeight: 500,
									cursor: 'pointer',
									'&:hover': {
										textDecoration: 'underline',
									},
								}}
								onClick={() => handleView(row)}
							>
								{row.product_name}
							</Link>
						</TableCell>

						{/* Product Code */}
						<TableCell align="left">{row.product_code}</TableCell>

						{/* SKU */}
						<TableCell align="left">{row.sku}</TableCell>

						{/* Category Name */}
						<TableCell align="left">
							{row.category_name || '-'}
						</TableCell>

						{/* Unit Name */}
						<TableCell align="left">
							{row.unit_name || '-'}
						</TableCell>

						{/* Price */}
						<TableCell align="right">
							{formatPrice(row.price)}
						</TableCell>

						{/* Cost */}
						<TableCell align="right">
							{formatPrice(row.cost)}
						</TableCell>

						{/* Status */}
						<TableCell align="center">
							<Chip
								label={getStatusLabel(row.status)}
								color={getStatusColor(row.status)}
								size="small"
								variant="outlined"
							/>
						</TableCell>

						{/* Created At */}
						<TableCell align="left">
							{row.created_at
								? new Date(row.created_at).toLocaleDateString(
										'vi-VN',
								  )
								: '-'}
						</TableCell>
					</TableRow>
				))}
			</DataTable>

			{/* Action Menu */}
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				slotProps={{
					paper: {
						elevation: 2,
						sx: { minWidth: 150 },
					},
					list: {
						'aria-labelledby': 'basic-button',
					},
				}}
			>
				<MenuItem
					onClick={() => {
						const row = rows.find((r) => r.id === selectedRow);
						if (row) handleView(row);
					}}
				>
					<VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
					Xem chi tiết
				</MenuItem>
				<MenuItem
					onClick={() => {
						const row = rows.find((r) => r.id === selectedRow);
						if (row) handleEdit(row);
					}}
				>
					<EditIcon fontSize="small" sx={{ mr: 1 }} />
					Chỉnh sửa
				</MenuItem>
				<MenuItem
					onClick={() => {
						const row = rows.find((r) => r.id === selectedRow);
						if (row) handleDelete(row);
					}}
					sx={{ color: 'error.main' }}
				>
					<DeleteIcon fontSize="small" sx={{ mr: 1 }} />
					Xóa
				</MenuItem>
			</Menu>
		</>
	);
};

ProductTable.propTypes = {
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			minWidth: PropTypes.number,
			align: PropTypes.string,
		}),
	).isRequired,
	rows: PropTypes.arrayOf(PropTypes.object),
	pagination: PropTypes.shape({
		page: PropTypes.number,
		per_page: PropTypes.number,
	}),
	total: PropTypes.number,
	onPageChange: PropTypes.func,
	onDelete: PropTypes.func,
	onEdit: PropTypes.func,
	onView: PropTypes.func,
	showActions: PropTypes.bool,
};

export default React.memo(ProductTable);
