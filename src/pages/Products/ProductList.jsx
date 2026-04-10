import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
	Box,
	Card,
	Typography,
	Button,
	Container,
	useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ProductService from '../../api/services/productService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import ProductTable from '../../components/features/products/ProductTable';
import ProductSearch from '../../components/features/products/ProductSearch';
import ProductFilter from '../../components/features/products/ProductFilter';
import { useToast } from '../../contexts/ToastContext';
import useProducts from '../../hooks/useProducts';

const defaultColumns = [
	{ key: 'product_name', label: 'Tên sản phẩm', minWidth: 200 },
	{ key: 'sku', label: 'Mã SKU', minWidth: 100 },
	{ key: 'price', label: 'Giá', minWidth: 100, align: 'right' },
	{ key: 'stock_quantity', label: 'Tồn kho', minWidth: 100, align: 'center' },
	{ key: 'status', label: 'Trạng thái', minWidth: 100 },
];

const ProductList = ({ columns = defaultColumns }) => {
	const navigate = useNavigate();
	const theme = useTheme();
	const { showToast } = useToast();
	const { products, loading, error, totalCount, updateFilters, refetch } =
		useProducts();
	const [categories, setCategories] = useState([]);
	const [confirmDelete, setConfirmDelete] = useState({
		open: false,
		productId: null,
		productName: '',
	});

	/**
	 * Fetch categories on component mount
	 */
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				// TODO: Replace with actual category API call
				const dummyCategories = [
					{ id: 1, name: 'Electronics' },
					{ id: 2, name: 'Clothing' },
					{ id: 3, name: 'Food' },
				];
				setCategories(dummyCategories);
			} catch (err) {
				console.error('Failed to fetch categories:', err);
			}
		};
		fetchCategories();
	}, []);

	/**
	 * Show error toasts
	 */
	useEffect(() => {
		if (error) {
			showToast(error, 'error');
		}
	}, [error, showToast]);

	/**
	 * Handle product search with filters
	 */
	const handleSearch = useCallback(
		(filters) => {
			updateFilters(filters);
		},
		[updateFilters],
	);

	/**
	 * Handle advanced filter application
	 */
	const handleAdvancedFilter = useCallback(
		(advancedFilters) => {
			updateFilters(advancedFilters);
		},
		[updateFilters],
	);

	const handleCreateProduct = () => {
		navigate('/products/create');
	};

	const handleEditProduct = (product) => {
		navigate(`/products/${product.id}/edit`, { state: { product } });
	};

	const handleViewProduct = (productId) => {
		navigate(`/products/${productId}/detail`);
	};

	const handleDeleteClick = (productId, productName) => {
		setConfirmDelete({ open: true, productId, productName });
	};

	const handleConfirmDelete = async () => {
		if (!confirmDelete.productId) return;
		try {
			await ProductService.deleteProduct(confirmDelete.productId);
			showToast('Xóa sản phẩm thành công', 'success');
			setConfirmDelete({ open: false, productId: null, productName: '' });
			refetch(); // Refetch the product list
		} catch (err) {
			const errorMessage = err.message || 'Không thể xóa sản phẩm';
			showToast(errorMessage, 'error');
		}
	};

	return (
		<Box sx={{ py: 3 }}>
			<Container maxWidth="xl">
				{/* Page Header */}
				<Box sx={{ mb: 4 }}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							mb: 2,
						}}
					>
						<Box>
							<Typography
								variant="h4"
								sx={{ fontWeight: 600, mb: 1 }}
							>
								Quản Lý Sản Phẩm
							</Typography>
							<Typography
								variant="body2"
								sx={{ color: theme.palette.text.secondary }}
							>
								Tổng cộng:{' '}
								<strong>{totalCount} sản phẩm</strong>
							</Typography>
						</Box>
						<Button
							variant="contained"
							startIcon={<AddIcon />}
							onClick={handleCreateProduct}
							sx={{ textTransform: 'none' }}
						>
							Thêm Sản Phẩm
						</Button>
					</Box>
				</Box>

				{/* Search Component */}
				<ProductSearch
					onSearch={handleSearch}
					isLoading={loading}
					categories={categories}
				/>

				{/* Advanced Filter Component */}
				<Box sx={{ mb: 3 }}>
					<ProductFilter
						onFilter={handleAdvancedFilter}
						categories={categories}
						isLoading={loading}
					/>
				</Box>

				{/* Error State */}
				{error && !loading && (
					<Card
						sx={{
							mb: 3,
							p: 2,
							backgroundColor: theme.palette.error.light,
						}}
					>
						<Typography color="error.main">{error}</Typography>
					</Card>
				)}

				{/* Loading State */}
				{loading && <LoadingSpinner />}

				{/* Products Table */}
				{!loading && products.length > 0 && (
					<Card>
						<ProductTable
							columns={columns}
							rows={products}
							onEdit={handleEditProduct}
							onDelete={handleDeleteClick}
							onView={handleViewProduct}
							isLoading={loading}
						/>
					</Card>
				)}

				{/* Empty State */}
				{!loading && products.length === 0 && !error && (
					<Card sx={{ p: 4, textAlign: 'center' }}>
						<Typography color="textSecondary">
							{totalCount === 0
								? 'Không có sản phẩm nào. Hãy tạo sản phẩm mới!'
								: 'Không tìm thấy sản phẩm nào phù hợp với tiêu chí tìm kiếm.'}
						</Typography>
						{totalCount === 0 && (
							<Button
								variant="contained"
								onClick={handleCreateProduct}
								sx={{ mt: 2 }}
								startIcon={<AddIcon />}
							>
								Tạo Sản Phẩm Đầu Tiên
							</Button>
						)}
					</Card>
				)}

				{/* Confirm Delete Dialog */}
				<ConfirmDialog
					open={confirmDelete.open}
					title="Xóa sản phẩm"
					message={`Bạn có chắc chắn muốn xóa sản phẩm "${confirmDelete.productName}"? Hành động này không thể hoàn tác.`}
					onConfirm={handleConfirmDelete}
					onCancel={() =>
						setConfirmDelete({
							open: false,
							productId: null,
							productName: '',
						})
					}
					confirmText="Xóa"
					cancelText="Hủy"
				/>
			</Container>
		</Box>
	);
};

export default ProductList;
