import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	TextField,
	Typography,
	CircularProgress,
	Alert,
	Paper,
	Divider,
	Chip,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@mui/material';
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	ArrowBack as BackIcon,
	Download as DownloadIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import {
	fetchProductDetail,
	deleteProduct,
	clearError,
} from '../../store/slices/productSlice';
import { addNotification } from '../../store/slices/uiSlice';

const ProductDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		selectedProduct: product,
		loadingDetail: loading,
		error,
	} = useSelector((state) => state.products);
	const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

	useEffect(() => {
		if (id) {
			dispatch(fetchProductDetail(id));
		}
	}, [id, dispatch]);

	const handleDeleteClick = () => {
		setDeleteConfirmOpen(true);
	};

	const handleConfirmDelete = async () => {
		try {
			dispatch(deleteProduct(id));
			dispatch(
				addNotification({
					type: 'success',
					message: `Product deleted successfully`,
				}),
			);
			setDeleteConfirmOpen(false);
			navigate('/products');
		} catch (err) {
			dispatch(
				addNotification({
					type: 'error',
					message: 'Failed to delete product',
				}),
			);
		}
	};

	if (loading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box sx={{ p: 3 }}>
				<Alert severity="error">{error}</Alert>
			</Box>
		);
	}

	if (!product) {
		return (
			<Box sx={{ p: 3 }}>
				<Alert severity="warning">Product not found</Alert>
			</Box>
		);
	}

	return (
		<Box sx={{ p: 3 }}>
			<PageHeader
				title={product.name}
				subtitle={`SKU: ${product.sku}`}
				action={
					<Box sx={{ display: 'flex', gap: 1 }}>
						<Button
							variant="outlined"
							startIcon={<BackIcon />}
							onClick={() => navigate('/products')}
						>
							Back
						</Button>
						<Button
							variant="contained"
							color="primary"
							startIcon={<EditIcon />}
							onClick={() => navigate(`/products/${id}/edit`)}
						>
							Edit
						</Button>
						<Button
							variant="outlined"
							color="error"
							startIcon={<DeleteIcon />}
							onClick={handleDeleteClick}
						>
							Delete
						</Button>
					</Box>
				}
			/>

			<Grid container spacing={3} sx={{ mt: 1 }}>
				{/* Main Information */}
				<Grid item xs={12} md={8}>
					<Card>
						<CardContent>
							<Typography
								variant="h6"
								sx={{ fontWeight: 600, mb: 2 }}
							>
								Product Information
							</Typography>
							<Divider sx={{ mb: 2 }} />

							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<Typography
										color="textSecondary"
										variant="body2"
									>
										Name
									</Typography>
									<Typography
										variant="body1"
										sx={{ fontWeight: 500 }}
									>
										{product.name}
									</Typography>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Typography
										color="textSecondary"
										variant="body2"
									>
										SKU
									</Typography>
									<Typography
										variant="body1"
										sx={{ fontWeight: 500 }}
									>
										{product.sku}
									</Typography>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Typography
										color="textSecondary"
										variant="body2"
									>
										Category
									</Typography>
									<Typography
										variant="body1"
										sx={{ fontWeight: 500 }}
									>
										{product.category}
									</Typography>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Typography
										color="textSecondary"
										variant="body2"
									>
										Status
									</Typography>
									<Chip
										label={product.status || 'Active'}
										color={
											product.status === 'active'
												? 'success'
												: 'default'
										}
										size="small"
									/>
								</Grid>
							</Grid>

							<Divider sx={{ my: 2 }} />
							<Typography
								variant="h6"
								sx={{ fontWeight: 600, mb: 2 }}
							>
								Pricing
							</Typography>

							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<Typography
										color="textSecondary"
										variant="body2"
									>
										Cost Price
									</Typography>
									<Typography
										variant="h6"
										sx={{
											fontWeight: 600,
											color: '#1976d2',
										}}
									>
										${product.cost?.toFixed(2) || '0.00'}
									</Typography>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Typography
										color="textSecondary"
										variant="body2"
									>
										Selling Price
									</Typography>
									<Typography
										variant="h6"
										sx={{
											fontWeight: 600,
											color: '#388e3c',
										}}
									>
										${product.price?.toFixed(2) || '0.00'}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography
										color="textSecondary"
										variant="body2"
									>
										Margin
									</Typography>
									<Typography
										variant="body1"
										sx={{ fontWeight: 500 }}
									>
										{product.price && product.cost
											? (
													((product.price -
														product.cost) /
														product.cost) *
													100
											  ).toFixed(2)
											: '0'}
										%
									</Typography>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>

				{/* Sidebar */}
				<Grid item xs={12} md={4}>
					<Card>
						<CardContent>
							<Typography
								variant="h6"
								sx={{ fontWeight: 600, mb: 2 }}
							>
								Additional Info
							</Typography>
							<Divider sx={{ mb: 2 }} />

							<Box sx={{ mb: 2 }}>
								<Typography
									color="textSecondary"
									variant="caption"
								>
									Created
								</Typography>
								<Typography variant="body2">
									{product.created_at
										? new Date(
												product.created_at,
										  ).toLocaleDateString()
										: '-'}
								</Typography>
							</Box>

							<Box sx={{ mb: 2 }}>
								<Typography
									color="textSecondary"
									variant="caption"
								>
									Last Updated
								</Typography>
								<Typography variant="body2">
									{product.updated_at
										? new Date(
												product.updated_at,
										  ).toLocaleDateString()
										: '-'}
								</Typography>
							</Box>

							<Divider sx={{ my: 2 }} />

							<Button
								fullWidth
								variant="outlined"
								startIcon={<DownloadIcon />}
								sx={{ mt: 2 }}
							>
								Export PDF
							</Button>
						</CardContent>
					</Card>
				</Grid>
			</Grid>

			{/* Delete Confirmation */}
			<Dialog
				open={deleteConfirmOpen}
				onClose={() => setDeleteConfirmOpen(false)}
			>
				<DialogTitle>Delete Product</DialogTitle>
				<DialogContent>
					Are you sure you want to delete "{product.name}"? This
					action cannot be undone.
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

export default ProductDetail;
