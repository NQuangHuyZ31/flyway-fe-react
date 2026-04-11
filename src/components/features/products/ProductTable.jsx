import React, { use, useEffect, useState } from 'react';
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
import SearchIcon from '@mui/icons-material/Search';
import DataTable from '../../common/DataTable';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../helpers/formatHelper';
import ProductFilter from './ProductFilter';
import Button from '../../common/Button';

const ProductTable = ({
	columns = [],
	rows = [],
	pagination = { page: 0, per_page: 15 },
	total = 0,
	onPageChange,
	onDelete,
	onEdit,
	onView,
	onSearch,
	showActions = true,
}) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedRow, setSelectedRow] = useState(null);
	const [filters, setFilters] = useState({});

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
			onDelete(row);
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

	return (
		<>
			<DataTable
				tableTitle="Danh sách sản phẩm"
				columns={columns}
				pagination={pagination}
				total={total}
				onPageChange={onPageChange}
				showActions={showActions}
			>
				<TableRow>
					<TableCell>
						<Button
							onClick={() => onSearch(filters)}
							variant="contained"
							color="primary"
							size="small"
							sx={{ fontSize: 12 }}
						>
							<SearchIcon />
						</Button>
					</TableCell>
					<ProductFilter
						headerFilters={columns}
						onChange={(key, value) => {
							setFilters((prev) => ({ ...prev, [key]: value }));
						}}
					/>
				</TableRow>

				{rows.map((row) => (
					<TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
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
							{row.category_id || '-'}
						</TableCell>

						{/* Unit Name */}
						<TableCell align="left">{row.unit_id || '-'}</TableCell>

						{/* Price */}
						<TableCell align="left">
							{formatCurrency(row.price)}
						</TableCell>

						{/* Cost */}
						<TableCell align="left">
							{formatCurrency(row.cost)}
						</TableCell>

						{/* inventory_mimimux */}
						<TableCell align="left">
							{row.minimum_inventory || '-'}
						</TableCell>

						{/* inventory */}
						<TableCell align="left">
							{row.total_quantity || '-'}
						</TableCell>

						{/* Status */}
						<TableCell align="center">
							{row.is_active === 1 ? (
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

export default React.memo(ProductTable);
