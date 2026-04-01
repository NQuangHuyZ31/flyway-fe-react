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
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	InputAdornment,
} from '@mui/material';
import {
	Add as AddIcon,
	Edit as EditIcon,
	Delete as DeleteIcon,
	Search as SearchIcon,
	Visibility as ViewIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import {
	fetchWarehouses,
	setFilters,
	setCurrentPage,
} from '../../store/slices/warehouseSlice';
import { addNotification } from '../../store/slices/uiSlice';

const WarehouseList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		items: warehouses,
		loading,
		error,
		filters,
	} = useSelector((state) => state.warehouse);
	const [searchTerm, setSearchTerm] = useState(filters.search || '');
	const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
	const [selectedWarehouse, setSelectedWarehouse] = useState(null);

	useEffect(() => {
		dispatch(fetchWarehouses({ search: searchTerm }));
	}, [searchTerm, dispatch]);

	const handleSearch = (value) => {
		setSearchTerm(value);
	};

	const handleDeleteClick = (warehouse) => {
		setSelectedWarehouse(warehouse);
		setDeleteConfirmOpen(true);
	};

	const handleConfirmDelete = () => {
		dispatch(
			addNotification({
				type: 'success',
				message: `Warehouse "${selectedWarehouse.name}" deleted`,
			}),
		);
		setDeleteConfirmOpen(false);
	};

	if (loading && warehouses.length === 0) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box sx={{ p: 3 }}>
			<PageHeader
				title="Warehouses"
				subtitle="Manage warehouse locations and sections"
				action={
					<Button
						variant="contained"
						color="primary"
						startIcon={<AddIcon />}
						onClick={() => navigate('/warehouse/create')}
					>
						New Warehouse
					</Button>
				}
			/>

			{error && (
				<Alert severity="error" sx={{ mb: 2 }}>
					{error}
				</Alert>
			)}

			{/* Search */}
			<Card sx={{ mb: 3 }}>
				<CardContent>
					<TextField
						fullWidth
						placeholder="Search warehouses..."
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
				</CardContent>
			</Card>

			{/* Warehouses Grid */}
			<Grid container spacing={3}>
				{warehouses && warehouses.length > 0 ? (
					warehouses.map((warehouse) => (
						<Grid item xs={12} sm={6} md={4} key={warehouse.id}>
							<Card
								sx={{
									cursor: 'pointer',
									transition: 'all 0.3s ease',
									height: '100%',
									'&:hover': {
										boxShadow: 3,
										transform: 'translateY(-4px)',
									},
								}}
								onClick={() =>
									navigate(`/warehouse/${warehouse.id}`)
								}
							>
								<CardContent>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'space-between',
											mb: 2,
										}}
									>
										<Box>
											<Typography
												variant="h6"
												sx={{ fontWeight: 600 }}
											>
												{warehouse.name}
											</Typography>
											<Typography
												variant="caption"
												color="textSecondary"
											>
												{warehouse.code}
											</Typography>
										</Box>
										<Chip
											label={warehouse.status || 'Active'}
											size="small"
											color={
												warehouse.status === 'active'
													? 'success'
													: 'default'
											}
										/>
									</Box>

									<Typography
										variant="body2"
										color="textSecondary"
										sx={{ mb: 1 }}
									>
										{warehouse.address}
									</Typography>

									<Box
										sx={{
											display: 'flex',
											gap: 1,
											mt: 3,
											justifyContent: 'flex-end',
										}}
									>
										<Tooltip title="View">
											<IconButton
												size="small"
												onClick={(e) => {
													e.stopPropagation();
													navigate(
														`/warehouse/${warehouse.id}`,
													);
												}}
											>
												<ViewIcon fontSize="small" />
											</IconButton>
										</Tooltip>
										<Tooltip title="Edit">
											<IconButton
												size="small"
												onClick={(e) => {
													e.stopPropagation();
													navigate(
														`/warehouse/${warehouse.id}/edit`,
													);
												}}
											>
												<EditIcon fontSize="small" />
											</IconButton>
										</Tooltip>
										<Tooltip title="Delete">
											<IconButton
												size="small"
												onClick={(e) => {
													e.stopPropagation();
													handleDeleteClick(
														warehouse,
													);
												}}
											>
												<DeleteIcon fontSize="small" />
											</IconButton>
										</Tooltip>
									</Box>
								</CardContent>
							</Card>
						</Grid>
					))
				) : (
					<Grid item xs={12}>
						<Card>
							<CardContent sx={{ textAlign: 'center', py: 6 }}>
								<Typography color="textSecondary">
									No warehouses found
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				)}
			</Grid>

			{/* Delete Confirmation */}
			<Dialog
				open={deleteConfirmOpen}
				onClose={() => setDeleteConfirmOpen(false)}
			>
				<DialogTitle>Delete Warehouse</DialogTitle>
				<DialogContent>
					Are you sure you want to delete "{selectedWarehouse?.name}"?
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteConfirmOpen(false)}>
						Cancel
					</Button>
					<Button
						onClick={handleConfirmDelete}
						color="error"
						variant="contained"
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default WarehouseList;

// Add import for Typography
import { Typography } from '@mui/material';
