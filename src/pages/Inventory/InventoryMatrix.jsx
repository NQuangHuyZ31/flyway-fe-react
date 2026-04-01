import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	TextField,
	Pagination,
	CircularProgress,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	IconButton,
	Tooltip,
	Alert,
	Chip,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	InputAdornment,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@mui/material';
import {
	Add as AddIcon,
	Edit as EditIcon,
	Delete as DeleteIcon,
	Search as SearchIcon,
	Refresh as RefreshIcon,
	Download as DownloadIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import {
	fetchInventory,
	setFilters,
	setCurrentPage,
	clearError,
} from '../../store/slices/inventorySlice';
import { addNotification } from '../../store/slices/uiSlice';

const InventoryDashboard = () => {
	const dispatch = useDispatch();
	const {
		items: inventory,
		loading,
		error,
		pagination,
		filters,
	} = useSelector((state) => state.inventory);
	const [searchTerm, setSearchTerm] = useState(filters.search || '');
	const [warehouseFilter, setWarehouseFilter] = useState(
		filters.warehouse || '',
	);
	const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
	const [adjustmentDialogOpen, setAdjustmentDialogOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [adjustmentQty, setAdjustmentQty] = useState('');
	const [adjustmentReason, setAdjustmentReason] = useState('');

	useEffect(() => {
		dispatch(
			fetchInventory({
				page: pagination.page,
				per_page: pagination.per_page,
				search: searchTerm,
				warehouse: warehouseFilter,
				status: statusFilter,
			}),
		);
	}, [pagination.page, searchTerm, warehouseFilter, statusFilter, dispatch]);

	const handleSearch = (value) => {
		setSearchTerm(value);
		dispatch(setCurrentPage(1));
	};

	const handleAdjustmentClick = (item) => {
		setSelectedItem(item);
		setAdjustmentDialogOpen(true);
	};

	const handleConfirmAdjustment = () => {
		if (!adjustmentQty || !adjustmentReason) {
			dispatch(
				addNotification({
					type: 'warning',
					message: 'Please fill in all fields',
				}),
			);
			return;
		}

		dispatch(
			addNotification({
				type: 'success',
				message: `Inventory adjusted for ${selectedItem.product_name}`,
			}),
		);
		setAdjustmentDialogOpen(false);
		setAdjustmentQty('');
		setAdjustmentReason('');
	};

	const handleRefresh = () => {
		dispatch(
			fetchInventory({
				page: pagination.page,
				per_page: pagination.per_page,
			}),
		);
	};

	const getStockStatus = (quantity) => {
		if (quantity === 0) return { color: 'error', label: 'Out of Stock' };
		if (quantity < 10) return { color: 'warning', label: 'Low Stock' };
		return { color: 'success', label: 'In Stock' };
	};

	if (loading && inventory.length === 0) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box sx={{ p: 3 }}>
			<PageHeader
				title="Inventory Management"
				subtitle="Monitor and manage product stock levels across all warehouses"
				action={
					<Button
						variant="outlined"
						startIcon={<RefreshIcon />}
						onClick={handleRefresh}
					>
						Refresh
					</Button>
				}
			/>

			{error && (
				<Alert
					severity="error"
					sx={{ mb: 2 }}
					onClose={() => dispatch(clearError())}
				>
					{error}
				</Alert>
			)}

			{/* Filters */}
			<Card sx={{ mb: 3 }}>
				<CardContent>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={3}>
							<TextField
								fullWidth
								placeholder="Search products..."
								value={searchTerm}
								onChange={(e) => handleSearch(e.target.value)}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<SearchIcon />
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<FormControl fullWidth>
								<InputLabel>Warehouse</InputLabel>
								<Select
									value={warehouseFilter}
									label="Warehouse"
									onChange={(e) => {
										setWarehouseFilter(e.target.value);
										dispatch(setCurrentPage(1));
									}}
								>
									<MenuItem value="">All Warehouses</MenuItem>
									<MenuItem value="WH001">
										Main Warehouse
									</MenuItem>
									<MenuItem value="WH002">
										Branch Warehouse
									</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<FormControl fullWidth>
								<InputLabel>Status</InputLabel>
								<Select
									value={statusFilter}
									label="Status"
									onChange={(e) => {
										setStatusFilter(e.target.value);
										dispatch(setCurrentPage(1));
									}}
								>
									<MenuItem value="all">All</MenuItem>
									<MenuItem value="in-stock">
										In Stock
									</MenuItem>
									<MenuItem value="low-stock">
										Low Stock
									</MenuItem>
									<MenuItem value="out-of-stock">
										Out of Stock
									</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<Button
								fullWidth
								variant="outlined"
								startIcon={<DownloadIcon />}
							>
								Export
							</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>

			{/* Inventory Table */}
			<TableContainer component={Card}>
				<Table>
					<TableHead sx={{ backgroundColor: '#f5f7fa' }}>
						<TableRow>
							<TableCell>Product</TableCell>
							<TableCell>SKU</TableCell>
							<TableCell>Warehouse</TableCell>
							<TableCell align="right">Current Qty</TableCell>
							<TableCell align="right">Reserved</TableCell>
							<TableCell align="right">Available</TableCell>
							<TableCell>Status</TableCell>
							<TableCell align="center">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{inventory && inventory.length > 0 ? (
							inventory.map((item) => {
								const status = getStockStatus(item.quantity);
								return (
									<TableRow key={item.id} hover>
										<TableCell>
											{item.product_name}
										</TableCell>
										<TableCell>{item.sku}</TableCell>
										<TableCell>
											{item.warehouse_name}
										</TableCell>
										<TableCell align="right">
											{item.quantity}
										</TableCell>
										<TableCell align="right">
											{item.reserved || 0}
										</TableCell>
										<TableCell align="right">
											{item.quantity -
												(item.reserved || 0)}
										</TableCell>
										<TableCell>
											<Chip
												label={status.label}
												color={status.color}
												size="small"
												variant="outlined"
											/>
										</TableCell>
										<TableCell align="center">
											<Tooltip title="Adjust">
												<IconButton
													size="small"
													onClick={() =>
														handleAdjustmentClick(
															item,
														)
													}
												>
													<EditIcon fontSize="small" />
												</IconButton>
											</Tooltip>
										</TableCell>
									</TableRow>
								);
							})
						) : (
							<TableRow>
								<TableCell
									colSpan={8}
									align="center"
									sx={{ py: 3 }}
								>
									No inventory items found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>

				{/* Pagination */}
				{pagination.totalPages > 1 && (
					<Box
						sx={{ display: 'flex', justifyContent: 'center', p: 2 }}
					>
						<Pagination
							count={pagination.totalPages}
							page={pagination.page}
							onChange={(e, newPage) =>
								dispatch(setCurrentPage(newPage))
							}
						/>
					</Box>
				)}
			</TableContainer>

			{/* Adjustment Dialog */}
			<Dialog
				open={adjustmentDialogOpen}
				onClose={() => setAdjustmentDialogOpen(false)}
			>
				<DialogTitle>Adjust Inventory</DialogTitle>
				<DialogContent sx={{ pt: 3 }}>
					{selectedItem && (
						<Box sx={{ mb: 3 }}>
							<Typography variant="body2" color="textSecondary">
								Product:{' '}
								<strong>{selectedItem.product_name}</strong>
							</Typography>
							<Typography variant="body2" color="textSecondary">
								Current Qty:{' '}
								<strong>{selectedItem.quantity}</strong>
							</Typography>
						</Box>
					)}
					<TextField
						fullWidth
						label="Adjustment Quantity"
						type="number"
						value={adjustmentQty}
						onChange={(e) => setAdjustmentQty(e.target.value)}
						placeholder="e.g., +5 or -3"
						sx={{ mb: 2 }}
					/>
					<FormControl fullWidth>
						<InputLabel>Reason</InputLabel>
						<Select
							value={adjustmentReason}
							onChange={(e) =>
								setAdjustmentReason(e.target.value)
							}
							label="Reason"
						>
							<MenuItem value="damage">Damage</MenuItem>
							<MenuItem value="count-variance">
								Count Variance
							</MenuItem>
							<MenuItem value="loss">Loss</MenuItem>
							<MenuItem value="correction">Correction</MenuItem>
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setAdjustmentDialogOpen(false)}>
						Cancel
					</Button>
					<Button
						onClick={handleConfirmAdjustment}
						color="primary"
						variant="contained"
					>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default InventoryDashboard;

import { Typography } from '@mui/material';
