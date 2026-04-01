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
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Paper,
} from '@mui/material';
import { Save as SaveIcon, ArrowBack as BackIcon } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import {
	createProduct,
	updateProduct,
	fetchProductDetail,
} from '../../store/slices/productSlice';
import { addNotification } from '../../store/slices/uiSlice';

const ProductForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isEditing = !!id;

	const { selectedProduct, loadingDetail } = useSelector(
		(state) => state.products,
	);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});
	const [formData, setFormData] = useState({
		name: '',
		sku: '',
		description: '',
		category: '',
		unit: 'piece',
		cost: '',
		price: '',
		status: 'active',
	});

	useEffect(() => {
		if (isEditing && id) {
			dispatch(fetchProductDetail(id));
		}
	}, [id, isEditing, dispatch]);

	useEffect(() => {
		if (isEditing && selectedProduct) {
			setFormData({
				name: selectedProduct.name || '',
				sku: selectedProduct.sku || '',
				description: selectedProduct.description || '',
				category: selectedProduct.category || '',
				unit: selectedProduct.unit || 'piece',
				cost: selectedProduct.cost || '',
				price: selectedProduct.price || '',
				status: selectedProduct.status || 'active',
			});
		}
	}, [selectedProduct, isEditing]);

	const validateForm = () => {
		const newErrors = {};
		if (!formData.name.trim()) newErrors.name = 'Name is required';
		if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
		if (!formData.category) newErrors.category = 'Category is required';
		if (!formData.cost || formData.cost <= 0)
			newErrors.cost = 'Valid cost is required';
		if (!formData.price || formData.price <= 0)
			newErrors.price = 'Valid price is required';
		if (parseFloat(formData.price) < parseFloat(formData.cost)) {
			newErrors.price = 'Price must be greater than cost';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validateForm()) return;

		setLoading(true);
		try {
			const submitData = {
				...formData,
				cost: parseFloat(formData.cost),
				price: parseFloat(formData.price),
			};

			if (isEditing) {
				dispatch(updateProduct({ id, data: submitData }));
				dispatch(
					addNotification({
						type: 'success',
						message: 'Product updated successfully',
					}),
				);
			} else {
				dispatch(createProduct(submitData));
				dispatch(
					addNotification({
						type: 'success',
						message: 'Product created successfully',
					}),
				);
			}

			setTimeout(() => navigate('/products'), 500);
		} catch (err) {
			dispatch(
				addNotification({
					type: 'error',
					message: 'Failed to save product',
				}),
			);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: '',
			}));
		}
	};

	if (isEditing && loadingDetail) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box sx={{ p: 3 }}>
			<PageHeader
				title={isEditing ? 'Edit Product' : 'Add New Product'}
				subtitle={
					isEditing
						? `Update product information for ${formData.name}`
						: 'Create a new product in the system'
				}
				action={
					<Button
						variant="outlined"
						startIcon={<BackIcon />}
						onClick={() => navigate('/products')}
					>
						Back
					</Button>
				}
			/>

			<Grid container spacing={3} sx={{ mt: 1 }}>
				{/* Main Form */}
				<Grid item xs={12} lg={8}>
					<Card>
						<CardContent>
							<Typography
								variant="h6"
								sx={{ fontWeight: 600, mb: 3 }}
							>
								Product Details
							</Typography>

							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										fullWidth
										label="Product Name *"
										name="name"
										value={formData.name}
										onChange={handleChange}
										error={!!errors.name}
										helperText={errors.name}
										placeholder="Enter product name"
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextField
										fullWidth
										label="SKU *"
										name="sku"
										value={formData.sku}
										onChange={handleChange}
										error={!!errors.sku}
										helperText={errors.sku}
										placeholder="e.g., SKU-001"
									/>
								</Grid>

								<Grid item xs={12}>
									<TextField
										fullWidth
										label="Description"
										name="description"
										value={formData.description}
										onChange={handleChange}
										multiline
										rows={4}
										placeholder="Enter product description"
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<FormControl
										fullWidth
										error={!!errors.category}
									>
										<InputLabel>Category *</InputLabel>
										<Select
											name="category"
											value={formData.category}
											onChange={handleChange}
											label="Category *"
										>
											<MenuItem value="">
												Select Category
											</MenuItem>
											<MenuItem value="Electronics">
												Electronics
											</MenuItem>
											<MenuItem value="Furniture">
												Furniture
											</MenuItem>
											<MenuItem value="Clothing">
												Clothing
											</MenuItem>
											<MenuItem value="Food">
												Food
											</MenuItem>
											<MenuItem value="Other">
												Other
											</MenuItem>
										</Select>
									</FormControl>
								</Grid>

								<Grid item xs={12} sm={6}>
									<FormControl fullWidth>
										<InputLabel>Unit of Measure</InputLabel>
										<Select
											name="unit"
											value={formData.unit}
											onChange={handleChange}
											label="Unit of Measure"
										>
											<MenuItem value="piece">
												Piece
											</MenuItem>
											<MenuItem value="box">Box</MenuItem>
											<MenuItem value="kg">
												Kilogram
											</MenuItem>
											<MenuItem value="liter">
												Liter
											</MenuItem>
											<MenuItem value="meter">
												Meter
											</MenuItem>
										</Select>
									</FormControl>
								</Grid>
							</Grid>

							<Typography
								variant="h6"
								sx={{ fontWeight: 600, mt: 4, mb: 3 }}
							>
								Pricing
							</Typography>

							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										fullWidth
										label="Cost Price ($) *"
										name="cost"
										type="number"
										inputProps={{ step: '0.01', min: '0' }}
										value={formData.cost}
										onChange={handleChange}
										error={!!errors.cost}
										helperText={errors.cost}
										placeholder="0.00"
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextField
										fullWidth
										label="Selling Price ($) *"
										name="price"
										type="number"
										inputProps={{ step: '0.01', min: '0' }}
										value={formData.price}
										onChange={handleChange}
										error={!!errors.price}
										helperText={errors.price}
										placeholder="0.00"
									/>
								</Grid>

								{formData.cost && formData.price && (
									<Grid item xs={12}>
										<Paper
											sx={{
												p: 2,
												backgroundColor: '#f5f7fa',
											}}
										>
											<Typography
												variant="body2"
												color="textSecondary"
											>
												Profit Margin
											</Typography>
											<Typography
												variant="h6"
												sx={{
													fontWeight: 600,
													color: '#388e3c',
												}}
											>
												{(
													(((parseFloat(
														formData.price,
													) || 0) -
														(parseFloat(
															formData.cost,
														) || 0)) /
														(parseFloat(
															formData.cost,
														) || 1)) *
													100
												).toFixed(2)}
												%
											</Typography>
										</Paper>
									</Grid>
								)}
							</Grid>

							<Typography
								variant="h6"
								sx={{ fontWeight: 600, mt: 4, mb: 3 }}
							>
								Status
							</Typography>

							<FormControl fullWidth>
								<InputLabel>Status</InputLabel>
								<Select
									name="status"
									value={formData.status}
									onChange={handleChange}
									label="Status"
								>
									<MenuItem value="active">Active</MenuItem>
									<MenuItem value="inactive">
										Inactive
									</MenuItem>
									<MenuItem value="discontinued">
										Discontinued
									</MenuItem>
								</Select>
							</FormControl>
						</CardContent>
					</Card>
				</Grid>

				{/* Sidebar */}
				<Grid item xs={12} lg={4}>
					<Card>
						<CardContent>
							<Typography
								variant="h6"
								sx={{ fontWeight: 600, mb: 2 }}
							>
								Actions
							</Typography>

							<Button
								fullWidth
								variant="contained"
								color="primary"
								size="large"
								startIcon={<SaveIcon />}
								onClick={handleSubmit}
								disabled={loading}
								sx={{ mb: 1 }}
							>
								{loading ? 'Saving...' : 'Save Product'}
							</Button>

							<Button
								fullWidth
								variant="outlined"
								onClick={() => navigate('/products')}
								disabled={loading}
							>
								Cancel
							</Button>

							<Typography
								variant="caption"
								sx={{
									display: 'block',
									mt: 3,
									color: 'textSecondary',
								}}
							>
								* Required fields
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
};

export default ProductForm;
