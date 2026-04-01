import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	TextField,
	InputAdornment,
	Chip,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
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
} from '@mui/material';
import {
	Add as AddIcon,
	Edit as EditIcon,
	Delete as DeleteIcon,
	Search as SearchIcon,
	Visibility as ViewIcon,
	Download as DownloadIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import {
	fetchProducts,
	setFilters,
	setCurrentPage,
	deleteProduct,
	clearError,
} from '../../store/slices/productSlice';
import { addNotification } from '../../store/slices/uiSlice';

const ProductList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		items: products,
		loading,
		error,
		pagination,
		filters,
	} = useSelector((state) => state.products);
	const [searchTerm, setSearchTerm] = useState(filters.search || '');
	const [categoryFilter, setCategoryFilter] = useState(
		filters.category || '',
	);
	const [statusFilter, setStatusFilter] = useState(
		filters.status || 'active',
	);
	const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);

	useEffect(() => {
		dispatch(
			fetchProducts({
				page: pagination.page,
				per_page: pagination.per_page,
				search: searchTerm,
				category: categoryFilter,
				status: statusFilter,
			}),
		);
	}, [pagination.page, searchTerm, categoryFilter, statusFilter, dispatch]);

	const handleSearch = (value) => {
		setSearchTerm(value);
		dispatch(setCurrentPage(1));
	};

	const handleCategoryChange = (value) => {
		setCategoryFilter(value);
		dispatch(setCurrentPage(1));
	};

	const handleStatusChange = (value) => {
		setStatusFilter(value);
		dispatch(setCurrentPage(1));
	};

	const handleDeleteClick = (product) => {
		setSelectedProduct(product);
		setDeleteConfirmOpen(true);
	};

	const handleConfirmDelete = async () => {
		try {
			dispatch(deleteProduct(selectedProduct.id));
			dispatch(
				addNotification({
					type: 'success',
					message: `Product "${selectedProduct.name}" deleted successfully`,
				}),
			);
			setDeleteConfirmOpen(false);
			setSelectedProduct(null);
		} catch (err) {
			dispatch(
				addNotification({
					type: 'error',
					message: 'Failed to delete product',
				}),
			);
		}
	};

	const handlePageChange = (event, newPage) => {
		dispatch(setCurrentPage(newPage));
	};

	const getCategoryColor = (category) => {
		const colors = {
			Electronics: 'info',
			Furniture: 'warning',
			Appliances: 'success',
			Other: 'default',
		};
		return colors[category] || 'default';
	};

	const handleAddClick = () => {
		navigate('/products/create');
	};

	const handleEdit = (product) => {
		navigate(`/products/${product.id}/edit`);
	};

	const handleDelete = (product) => {
		handleDeleteClick(product);
	};

	return (
		<Box sx={{ backgroundColor: 'white' }}>
			<Box sx={{ p: 1 }}>
				{/* Product Table */}
				<Card
					sx={{
						borderRadius: 2,
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
						overflow: 'hidden',
						transition: 'boxShadow 0.3s ease',
						'&:hover': {
							boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
						},
					}}
				>
					<Box
						sx={{
							p: 2,
							backgroundColor: '#f5f7fa',
							borderBottom: '1px solid #e0e0e0',
						}}
					>
						<Typography
							variant="h6"
							sx={{ fontWeight: 700, color: '#1a1a1a' }}
						>
							Danh sách sản phẩm
						</Typography>
						<Typography variant="caption" sx={{ color: '#666' }}>
							Quản lý và cập nhật thông tin sản phẩm trong hệ
							thống
						</Typography>
					</Box>
					<Box sx={{ p: 0 }}>
						<DataTable
							columns={[]}
							rows={products}
							onEdit={handleEdit}
							onDelete={handleDelete}
							selectable={true}
						/>
					</Box>
				</Card>
			</Box>

			{/* Add/Edit Product Dialog */}
			<Dialog
				open={openDialog}
				onClose={handleCloseDialog}
				maxWidth="sm"
				fullWidth
				PaperProps={{
					sx: {
						borderRadius: 3,
						boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
					},
				}}
			>
				<DialogTitle
					sx={{
						background:
							'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
						color: 'white',
						fontWeight: 700,
						fontSize: '1.3rem',
						py: 2.5,
					}}
				>
					{editingId
						? '✏️ Sửa thông tin sản phẩm'
						: '➕ Thêm sản phẩm mới'}
				</DialogTitle>
				<DialogContent sx={{ pt: 3 }}>
					<Grid container spacing={2.5}>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label="🔢 Mã SKU"
								value={formData.sku}
								onChange={(e) =>
									setFormData({
										...formData,
										sku: e.target.value,
									})
								}
								placeholder="e.g., SKU001"
								sx={{
									'& .MuiOutlinedInput-root': {
										borderRadius: 1.5,
									},
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label="🏷️ Danh mục"
								value={formData.category}
								onChange={(e) =>
									setFormData({
										...formData,
										category: e.target.value,
									})
								}
								placeholder="e.g., Electronics"
								sx={{
									'& .MuiOutlinedInput-root': {
										borderRadius: 1.5,
									},
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="📦 Tên sản phẩm"
								value={formData.name}
								onChange={(e) =>
									setFormData({
										...formData,
										name: e.target.value,
									})
								}
								placeholder="Enter product name"
								sx={{
									'& .MuiOutlinedInput-root': {
										borderRadius: 1.5,
									},
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label="📊 Số lượng"
								type="number"
								value={formData.quantity}
								onChange={(e) =>
									setFormData({
										...formData,
										quantity: e.target.value,
									})
								}
								placeholder="0"
								sx={{
									'& .MuiOutlinedInput-root': {
										borderRadius: 1.5,
									},
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label="💰 Giá"
								value={formData.price}
								onChange={(e) =>
									setFormData({
										...formData,
										price: e.target.value,
									})
								}
								placeholder="$0.00"
								sx={{
									'& .MuiOutlinedInput-root': {
										borderRadius: 1.5,
									},
								}}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions sx={{ p: 2.5, gap: 1 }}>
					<Button
						onClick={handleCloseDialog}
						sx={{
							borderRadius: 1,
							px: 3,
							textTransform: 'none',
							fontWeight: 600,
						}}
					>
						❌ Hủy
					</Button>
					<Button
						onClick={handleAddProduct}
						variant="contained"
						sx={{
							background:
								'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
							borderRadius: 1,
							px: 3,
							textTransform: 'none',
							fontWeight: 600,
							boxShadow: '0 4px 12px rgba(79, 172, 254, 0.4)',
							'&:hover': {
								boxShadow: '0 6px 16px rgba(79, 172, 254, 0.6)',
								transform: 'translateY(-2px)',
							},
							transition: 'all 0.3s ease',
						}}
					>
						{editingId ? '💾 Lưu' : '➕ Thêm'}
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default ProductList;
