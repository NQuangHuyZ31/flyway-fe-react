import React, { useState } from 'react';
import { TableCell, TableRow, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import DataTable from '../../common/DataTable';
import { Link, useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../../helpers/formatHelper';
import Button from '../../common/Button';
import DynamicFilter from '../../common/DynamicFilter';
import EntityActionMenu from '../../common/EntityActionMenu';

const ProductTable = ({
	products = [],
	columns = [],
	headerFilters = [],
	pagination = { page: 0, per_page: 15 },
	total = 0,
	filters = {},
	isLoading = false,
	showActions = true,
	onPageChange,
	onDelete,
	onView,
	onSearchfilter,
	onClearFilters,
}) => {
	/**
	 * Handle edit: Navigate to edit page
	 */
	const [tempFilters, setTempFilters] = useState(filters);

	const handleFilterChange = (key, value) => {
		setTempFilters((prev) => ({
			...prev,
			[key]: value,
		}));
	};
	console.log(tempFilters);

	const navigate = useNavigate();
	const handleEdit = (product) => {
		navigate(`/products/${product.id}/edit`);
	};

	/**
	 * Handle view: Navigate to detail page
	 */
	const handleViewProduct = (product) => {
		if (onView) {
			onView(product.id);
		} else {
			navigate(`/products/${product.id}/detail`);
		}
	};

	/**
	 * Handle delete: Call parent handler
	 */
	const handleDeleteProduct = (product) => {
		if (onDelete) {
			onDelete(product);
		}
	};

	// Determine which columns to display (from headerFilters or use defaults)
	const displayColumns =
		headerFilters && headerFilters.length > 0 ? headerFilters : columns;

	return (
		<DataTable
			tableTitle="Danh sách sản phẩm"
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
					<TableCell align="center" sx={{ minWidth: 100 }}>
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
			{products && products.length > 0 ? (
				products.map((product) => (
					<TableRow key={product.id} hover>
						{showActions && (
							<TableCell align="center">
								<EntityActionMenu
									row={product}
									config={{
										onEdit: handleEdit,
										onDelete: handleDeleteProduct,
										onView: handleViewProduct,
										actions: ['view', 'edit', 'delete'],
									}}
								/>
							</TableCell>
						)}

						{/* Product Name */}
						<TableCell align="left">
							<Link
								to={`/products/${product.id}/detail`}
								style={{
									textDecoration: 'none',
									color: '#1976d2',
									fontWeight: 500,
									cursor: 'pointer',
								}}
								onClick={() => handleViewProduct(product)}
							>
								{product.product_name}
							</Link>
						</TableCell>

						{/* Product Code */}
						<TableCell align="left">
							{product.product_code}
						</TableCell>

						{/* SKU */}
						<TableCell align="left">{product.sku}</TableCell>

						{/* Category Name */}
						<TableCell align="left">
							{product.category.name || '-'}
						</TableCell>

						{/* Unit Name */}
						<TableCell align="left">
							{product.unit.name || '-'}
						</TableCell>

						{/* Price */}
						<TableCell align="left">
							{formatCurrency(product.price)}
						</TableCell>

						{/* Cost */}
						<TableCell align="left">
							{formatCurrency(product.cost)}
						</TableCell>

						{/* Minimum Inventory */}
						<TableCell align="left">
							{product.minimum_inventory || '-'}
						</TableCell>

						{/* Total Quantity */}
						<TableCell align="left">
							{product.total_quantity || '-'}
						</TableCell>

						{/* Status */}
						<TableCell align="center">
							{product.is_active === 1 ? (
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
							{product.created_at
								? new Date(
										product.created_at,
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

export default React.memo(ProductTable);
