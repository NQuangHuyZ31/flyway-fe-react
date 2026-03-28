import React, { useState } from 'react';
import {
	Box,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Grid,
	useTheme,
	Card,
	Typography,
	Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const ProductList = () => {
	const theme = useTheme();
	const [openDialog, setOpenDialog] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [products, setProducts] = useState([
		{
			id: 1,
			sku: 'SKU001',
			name: 'Laptop Dell XPS 13',
			quantity: 100,
			price: '$1,200.00',
			category: 'Electronics',
		},
		{
			id: 2,
			sku: 'SKU002',
			name: 'Office Chair Pro',
			quantity: 250,
			price: '$350.00',
			category: 'Furniture',
		},
		{
			id: 3,
			sku: 'SKU003',
			name: 'Air Conditioner',
			quantity: 50,
			price: '$800.00',
			category: 'Appliances',
		},
		{
			id: 4,
			sku: 'SKU004',
			name: 'Monitor 4K 27"',
			quantity: 75,
			price: '$599.00',
			category: 'Electronics',
		},
	]);

	const [formData, setFormData] = useState({
		sku: '',
		name: '',
		quantity: '',
		price: '',
		category: '',
	});

	const getCategoryColor = (category) => {
		const colors = {
			Electronics: 'info',
			Furniture: 'warning',
			Appliances: 'success',
			Other: 'default',
		};
		return colors[category] || 'default';
	};

	const getCategoryEmoji = (category) => {
		const emojis = {
			Electronics: '💻',
			Furniture: '🛋️',
			Appliances: '🔌',
			Other: '📦',
		};
		return emojis[category] || '📦';
	};

	const columns = [
		{ id: 'sku', label: '🔢 Mã SKU', align: 'left', width: '15%' },
		{ id: 'name', label: '📦 Tên sản phẩm', align: 'left', width: '30%' },
		{
			id: 'category',
			label: '🏷️ Danh mục',
			align: 'center',
			width: '20%',
			render: (value) => (
				<Chip
					label={`${getCategoryEmoji(value)} ${value}`}
					color={getCategoryColor(value)}
					size="small"
					sx={{ fontWeight: 600 }}
				/>
			),
		},
		{ id: 'quantity', label: '📊 Số lượng', align: 'center', width: '15%' },
		{ id: 'price', label: '💰 Giá', align: 'right', width: '15%' },
	];

	const handleAddClick = () => {
		setEditingId(null);
		setFormData({
			sku: '',
			name: '',
			quantity: '',
			price: '',
			category: '',
		});
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
		setEditingId(null);
		setFormData({
			sku: '',
			name: '',
			quantity: '',
			price: '',
			category: '',
		});
	};

	const handleAddProduct = () => {
		if (editingId) {
			setProducts(
				products.map((p) =>
					p.id === editingId ? { ...p, ...formData } : p,
				),
			);
		} else {
			const newProduct = {
				id: products.length + 1,
				...formData,
			};
			setProducts([...products, newProduct]);
		}
		handleCloseDialog();
	};

	const handleEdit = (product) => {
		setEditingId(product.id);
		setFormData({
			sku: product.sku,
			name: product.name,
			quantity: product.quantity,
			price: product.price,
			category: product.category,
		});
		setOpenDialog(true);
	};

	const handleDelete = (product) => {
		setProducts(products.filter((p) => p.id !== product.id));
	};

	return (
		<Box sx={{ pb: 5 }}>
			<PageHeader
				title="📦 Quản lý sản phẩm"
				subtitle="Quản lý danh mục sản phẩm trong kho"
				actionButton={{ label: '➕ Thêm sản phẩm', icon: <AddIcon /> }}
				onActionClick={handleAddClick}
				breadcrumbs={[
					{ label: '🏠 Trang chủ' },
					{ label: '📦 Sản phẩm' },
				]}
			/>

			<Box sx={{ mt: 3 }}>
				{/* Stats Cards */}
				<Grid container spacing={2} sx={{ mb: 3 }}>
					<Grid item xs={12} sm={6} md={3}>
						<Card
							sx={{
								p: 2.5,
								background:
									'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
								color: 'white',
								borderRadius: 2,
								boxShadow:
									'0 8px 16px rgba(102, 126, 234, 0.4)',
								transition:
									'transform 0.3s ease, boxShadow 0.3s ease',
								'&:hover': {
									transform: 'translateY(-4px)',
									boxShadow:
										'0 12px 24px rgba(102, 126, 234, 0.6)',
								},
							}}
						>
							<Typography
								variant="h6"
								sx={{ fontWeight: 600, mb: 0.5 }}
							>
								{products.length}
							</Typography>
							<Typography variant="body2" sx={{ opacity: 0.9 }}>
								📦 Tổng sản phẩm
							</Typography>
						</Card>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<Card
							sx={{
								p: 2.5,
								background:
									'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
								color: 'white',
								borderRadius: 2,
								boxShadow: '0 8px 16px rgba(245, 87, 108, 0.4)',
								transition:
									'transform 0.3s ease, boxShadow 0.3s ease',
								'&:hover': {
									transform: 'translateY(-4px)',
									boxShadow:
										'0 12px 24px rgba(245, 87, 108, 0.6)',
								},
							}}
						>
							<Typography
								variant="h6"
								sx={{ fontWeight: 600, mb: 0.5 }}
							>
								{products.reduce(
									(sum, p) => sum + parseInt(p.quantity || 0),
									0,
								)}
							</Typography>
							<Typography variant="body2" sx={{ opacity: 0.9 }}>
								📊 Tổng tồn kho
							</Typography>
						</Card>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<Card
							sx={{
								p: 2.5,
								background:
									'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
								color: 'white',
								borderRadius: 2,
								boxShadow: '0 8px 16px rgba(79, 172, 254, 0.4)',
								transition:
									'transform 0.3s ease, boxShadow 0.3s ease',
								'&:hover': {
									transform: 'translateY(-4px)',
									boxShadow:
										'0 12px 24px rgba(79, 172, 254, 0.6)',
								},
							}}
						>
							<Typography
								variant="h6"
								sx={{ fontWeight: 600, mb: 0.5 }}
							>
								{new Set(products.map((p) => p.category)).size}
							</Typography>
							<Typography variant="body2" sx={{ opacity: 0.9 }}>
								🏷️ Danh mục
							</Typography>
						</Card>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<Card
							sx={{
								p: 2.5,
								background:
									'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
								color: 'white',
								borderRadius: 2,
								boxShadow:
									'0 8px 16px rgba(250, 112, 154, 0.4)',
								transition:
									'transform 0.3s ease, boxShadow 0.3s ease',
								'&:hover': {
									transform: 'translateY(-4px)',
									boxShadow:
										'0 12px 24px rgba(250, 112, 154, 0.6)',
								},
							}}
						>
							<Typography
								variant="h6"
								sx={{ fontWeight: 600, mb: 0.5 }}
							>
								{products.length > 0
									? products
											.reduce(
												(sum, p) =>
													sum +
													parseFloat(
														p.price.replace(
															/[$,]/g,
															'',
														) || 0,
													),
												0,
											)
											.toLocaleString('vi-VN', {
												style: 'currency',
												currency: 'VND',
											})
											.substring(0, 10)
									: '$0'}
							</Typography>
							<Typography variant="body2" sx={{ opacity: 0.9 }}>
								💰 Giá trị
							</Typography>
						</Card>
					</Grid>
				</Grid>

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
							p: 2.5,
							backgroundColor: '#f5f7fa',
							borderBottom: '1px solid #e0e0e0',
						}}
					>
						<Typography
							variant="h6"
							sx={{ fontWeight: 700, color: '#1a1a1a' }}
						>
							📋 Danh sách sản phẩm
						</Typography>
						<Typography variant="caption" sx={{ color: '#666' }}>
							Quản lý và cập nhật thông tin sản phẩm trong hệ
							thống
						</Typography>
					</Box>
					<Box sx={{ p: 0 }}>
						<DataTable
							columns={columns}
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
