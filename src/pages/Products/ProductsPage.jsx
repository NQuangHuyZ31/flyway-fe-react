// src/pages/products/ProductsPage.jsx
// Products list page with CRUD operations

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import productService from '../../api/services/productService';
import { useToast } from '../../contexts/ToastContext';
import ProductTable from '../../components/features/products/ProductTable';

const ProductsPage = () => {
	const navigate = useNavigate();
	const theme = useTheme();
	const { showToast } = useToast();

	// State management
	const [products, setProducts] = useState([]);
	const [headerTable, setHeaderTable] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [total, setTotal] = useState(0);
	const [filters, setFilters] = useState({
		per_page: 25,
		page: 1,
		filter: {},
	});
	console.log('Filters changed:', filters);
	// Fetch products on mount
	useEffect(() => {
		fetchProducts();
	}, [filters]);

	const fetchProducts = useCallback(async () => {
		try {
			setIsLoading(true);
			const response = await productService.getProducts({
				...filters,
			});
			setProducts(response.data || []);
			setHeaderTable(response.header_filter || []);
			setTotal(response.pagination.total || 0);
		} catch (error) {
			showToast('Failed to load products', 'error');
			console.error('Error fetching products:', error);
		} finally {
			setIsLoading(false);
		}
	}, [filters]);

	const handleDeleteProduct = (product) => {
		setSelectedProduct(product);
		setIsDeleteDialogOpen(true);
	};

	const confirmDelete = async () => {
		if (!selectedProduct) return;
		try {
			await productService.deleteProduct(selectedProduct.id);
			setProducts(products.filter((p) => p.id !== selectedProduct.id));
			showToast('Product deleted successfully', 'success');

			setTotal((prevTotal) => prevTotal - 1);
			setIsDeleteDialogOpen(false);
		} catch (error) {
			showToast('Failed to delete product', 'error');
		}
	};

	/**
	 * Handle exporting products to CSV
	 */
	const handleExport = useCallback(async () => {
		try {
			showToast('Exporting products...', 'info');
			// TODO: Implement actual export functionality
			// For now, show a placeholder
			const csv = products.map((p) => ({
				'Tên sản phẩm': p.product_name,
				'Mã sản phẩm': p.product_code,
				SKU: p.sku,
				'Danh mục': p.category_name,
				'Giá bán': p.price,
			}));
			console.log('Export data:', csv);
			showToast('Products exported successfully', 'success');
		} catch (error) {
			showToast('Failed to export products', 'error');
		}
	}, [products, showToast]);

	/**
	 * Handle importing products from file
	 */
	const handleImport = useCallback(() => {
		// TODO: Open import modal or trigger file input
		showToast('Import functionality coming soon', 'info');
	}, [showToast]);

	// Handle clearing filters
	const handleClearFilters = useCallback(() => {
		setFilters({
			per_page: 25,
			page: 1,
			filter: {},
		});
	}, []);

	return (
		<Container maxWidth="xl" sx={{ py: 3 }}>
			{/* Page Header */}
			<Box sx={{ mb: 4 }}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						mb: 3,
					}}
				>
					<Box>
						<Typography
							variant="body2"
							sx={{ color: 'text.secondary', mt: 0.5 }}
						>
							Tổng cộng: <strong>{total} sản phẩm</strong>
						</Typography>
					</Box>
					<Box sx={{ display: 'flex', gap: 1 }}>
						<Button
							variant="contained"
							color="primary"
							startIcon={<AddIcon />}
							onClick={() => navigate('/products/create')}
							size="large"
							sx={{ textTransform: 'none' }}
						>
							Thêm Sản Phẩm
						</Button>
						<Button
							variant="outlined"
							size="small"
							startIcon={<DownloadIcon />}
							onClick={handleExport}
							disabled={products.length === 0 || isLoading}
							sx={{ textTransform: 'none' }}
						>
							Xuất
						</Button>

						<Button
							variant="outlined"
							size="small"
							startIcon={<UploadIcon />}
							onClick={handleImport}
							sx={{ textTransform: 'none' }}
						>
							Nhập
						</Button>
					</Box>
				</Box>
			</Box>

			{/* Products Table */}
			<ProductTable
				rows={products}
				columns={headerTable}
				isLoading={isLoading}
				pagination={{
					per_page: filters.per_page,
					page: filters.page,
				}}
				total={total}
				onDelete={handleDeleteProduct}
				onView={(id) => navigate(`/products/${id}/detail`)}
				onSearch={(filters) =>
					setFilters((prev) => ({
						...prev,
						filter: {
							...prev.filter,
							...filters,
						},
						page: 1,
					}))
				}
				onClear={handleClearFilters}
				prodFilters={filters.filter}
			/>

			{/* Delete Confirmation Dialog */}
			<ConfirmDialog
				open={isDeleteDialogOpen}
				onClose={() => setIsDeleteDialogOpen(false)}
				onConfirm={confirmDelete}
				title="Xác nhận xóa"
				message={`Bạn có chắc chắn muốn xóa sản phẩm "${selectedProduct?.product_name}"?`}
				isDanger={true}
			/>
		</Container>
	);
};

export default ProductsPage;
