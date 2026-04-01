// src/pages/products/ProductsPage.jsx
// Products list page with CRUD operations

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import ProductList from '../../components/features/products/ProductList';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ProductForm from '../../components/features/products/ProductForm';
import { productService } from '../../api/services/productService';
import { useToast } from '../../contexts/ToastContext';

const ProductsPage = () => {
	const navigate = useNavigate();
	const { showToast } = useToast();

	// State management
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isFormModalOpen, setIsFormModalOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [filters, setFilters] = useState({
		status: 'all',
		category: 'all',
	});

	// Fetch products on mount
	useEffect(() => {
		fetchProducts();
	}, [filters]);

	const fetchProducts = async () => {
		try {
			setIsLoading(true);
			const response = await productService.getProducts({
				search: searchTerm,
				...filters,
			});
			setProducts(response.data || []);
		} catch (error) {
			showToast('Failed to load products', 'error');
			console.error('Error fetching products:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleAddProduct = () => {
		setSelectedProduct(null);
		setIsFormModalOpen(true);
	};

	const handleEditProduct = (product) => {
		setSelectedProduct(product);
		setIsFormModalOpen(true);
	};

	const handleViewProduct = (product) => {
		navigate(`/products/${product.id}`, { state: { product } });
	};

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
			setIsDeleteDialogOpen(false);
		} catch (error) {
			showToast('Failed to delete product', 'error');
			console.error('Error deleting product:', error);
		}
	};

	const handleFormSubmit = async (formData) => {
		// This would call the API to create or update the product
		// For now, just close the modal and show a success message
		showToast(
			selectedProduct
				? 'Product updated successfully'
				: 'Product created successfully',
			'success',
		);
		setIsFormModalOpen(false);
		fetchProducts();
	};

	return (
		<div className="products-page">
			<PageHeader
				title="Products"
				subtitle="Manage your product catalog"
				actions={
					<Button variant="primary" onClick={handleAddProduct}>
						+ Add Product
					</Button>
				}
			/>

			{/* Filters Section */}
			<div className="page-filters">
				<input
					type="search"
					placeholder="Search products..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="filter-input"
				/>
				<select
					value={filters.status}
					onChange={(e) =>
						setFilters({ ...filters, status: e.target.value })
					}
					className="filter-select"
				>
					<option value="all">All Status</option>
					<option value="active">Active</option>
					<option value="inactive">Inactive</option>
				</select>
			</div>

			{/* Products List */}
			{isLoading ? (
				<LoadingSpinner
					loading={true}
					message="Loading products..."
					fullHeight={true}
				/>
			) : (
				<ProductList
					products={products}
					isLoading={isLoading}
					onEdit={handleEditProduct}
					onDelete={handleDeleteProduct}
					onView={handleViewProduct}
				/>
			)}

			{/* Product Form Modal */}
			<Modal
				isOpen={isFormModalOpen}
				onClose={() => setIsFormModalOpen(false)}
				title={selectedProduct ? 'Edit Product' : 'Create New Product'}
				size="lg"
			>
				<ProductForm
					onSubmit={handleFormSubmit}
					initialData={selectedProduct}
					categories={[]}
				/>
			</Modal>

			{/* Delete Confirmation Dialog */}
			<ConfirmDialog
				isOpen={isDeleteDialogOpen}
				onClose={() => setIsDeleteDialogOpen(false)}
				onConfirm={confirmDelete}
				title="Delete Product"
				message={`Are you sure you want to delete "${selectedProduct?.name}"?`}
				isDanger={true}
			/>
		</div>
	);
};

export default ProductsPage;
