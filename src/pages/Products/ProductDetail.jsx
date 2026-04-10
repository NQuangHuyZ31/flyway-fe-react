import React, { useEffect, useState, useCallback } from 'react';
import {
	Box,
	Card,
	Typography,
	Button,
	Divider,
	Grid,
	Paper,
	Collapse,
	Avatar,
	Chip,
	Stack,
	IconButton,
	Tooltip,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ProductService from '../../api/services/productService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import PageHeader from '../../components/common/PageHeader';
import { useToast } from '../../contexts/ToastContext';

const DetailRow = ({ label, value, textAlign = 'left' }) => (
	<Grid container sx={{ py: 1.5, borderBottom: '1px solid #eee' }}>
		<Grid item xs={12} sm={4} sx={{ fontWeight: 600, color: '#333' }}>
			{label}
		</Grid>
		<Grid
			item
			xs={12}
			sm={8}
			sx={{ color: '#666', textAlign }}
			component="div"
		>
			{value || '-'}
		</Grid>
	</Grid>
);

const CollapsibleSection = ({ title, children, defaultOpen = true }) => {
	const [open, setOpen] = useState(defaultOpen);
	return (
		<Box
			sx={{
				mb: 2,
				bgcolor: '#f9fafb',
				borderRadius: 1,
				overflow: 'hidden',
			}}
		>
			<Box
				onClick={() => setOpen(!open)}
				sx={{
					p: 2,
					bgcolor: '#f5f7fa',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					cursor: 'pointer',
					userSelect: 'none',
					'&:hover': { bgcolor: '#edf2f7' },
				}}
			>
				<Typography
					variant="h6"
					sx={{ fontWeight: 600, color: '#333' }}
				>
					{title}
				</Typography>
				{open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
			</Box>
			<Collapse in={open}>
				<Box sx={{ p: 2 }}>{children}</Box>
			</Collapse>
		</Box>
	);
};

const ProductDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { showToast } = useToast();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [confirmDelete, setConfirmDelete] = useState(false);

	const fetchProduct = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await ProductService.getProduct(id);
			setProduct(response.data || response);
		} catch (err) {
			const errorMessage =
				err.message || 'Không thể tải thông tin sản phẩm';
			setError(errorMessage);
			showToast(errorMessage, 'error');
		} finally {
			setLoading(false);
		}
	}, [id, showToast]);

	useEffect(() => {
		fetchProduct();
	}, [fetchProduct]);

	const handleEdit = () => {
		navigate(`/products/${id}/edit`, { state: { product } });
	};

	const handleDelete = () => {
		setConfirmDelete(true);
	};

	const handleConfirmDelete = async () => {
		setLoading(true);
		try {
			await ProductService.deleteProduct(id);
			showToast('Xóa sản phẩm thành công', 'success');
			setConfirmDelete(false);
			setTimeout(() => navigate('/products'), 800);
		} catch (err) {
			const errorMessage = err.message || 'Không thể xóa sản phẩm';
			showToast(errorMessage, 'error');
		} finally {
			setLoading(false);
		}
	};

	const handlePrint = () => {
		window.print();
	};

	const formatPrice = (price) => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(price || 0);
	};

	if (loading) {
		return (
			<Box
				sx={{
					bgcolor: '#f5f7fa',
					minHeight: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<LoadingSpinner />
			</Box>
		);
	}

	if (error || !product) {
		return (
			<Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', pb: 4 }}>
				<PageHeader
					title="Chi Tiết Sản Phẩm"
					breadcrumbs={[
						{ label: 'Trang chủ', href: '/' },
						{ label: 'Sản phẩm', href: '/products' },
					]}
				/>
				<Box sx={{ width: '100%', px: { xs: 2, md: 4 }, mt: 3 }}>
					<Card
						sx={{ p: 4, textAlign: 'center', color: 'error.main' }}
					>
						<Typography>
							{error || 'Sản phẩm không tồn tại'}
						</Typography>
						<Button
							onClick={() => navigate('/products')}
							sx={{ mt: 2 }}
						>
							Quay lại danh sách
						</Button>
					</Card>
				</Box>
			</Box>
		);
	}

	return (
		<Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', pb: 4 }}>
			<PageHeader
				title={`Chi Tiết Sản Phẩm: ${product.product_name || ''}`}
				breadcrumbs={[
					{ label: 'Trang chủ', href: '/' },
					{ label: 'Sản phẩm', href: '/products' },
					{ label: product.product_name || '' },
				]}
			>
				<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
					<Button
						variant="outlined"
						startIcon={<ArrowBackIcon />}
						onClick={() => navigate('/products')}
						sx={{ textTransform: 'none' }}
					>
						Quay lại
					</Button>
					<Button
						variant="contained"
						startIcon={<EditIcon />}
						onClick={handleEdit}
						sx={{ textTransform: 'none' }}
					>
						Chỉnh sửa
					</Button>
					<Button
						variant="outlined"
						color="error"
						startIcon={<DeleteIcon />}
						onClick={handleDelete}
						sx={{ textTransform: 'none' }}
					>
						X�a
					</Button>
					<Button
						variant="outlined"
						startIcon={<PrintIcon />}
						onClick={handlePrint}
						sx={{ textTransform: 'none' }}
					>
						In
					</Button>
				</Box>
			</PageHeader>

			<Box sx={{ width: '100%', px: { xs: 2, md: 4 }, mt: 3 }}>
				<Box sx={{ maxWidth: 1400, mx: 'auto' }}>
					<Grid container spacing={3}>
						{/* Left: Image + summary */}
						<Grid item xs={12} md={4}>
							<Card sx={{ p: 2, height: '100%' }}>
								<Box
									sx={{
										display: 'flex',
										gap: 2,
										alignItems: 'center',
									}}
								>
									<Avatar
										variant="square"
										sx={{
											width: 110,
											height: 110,
											bgcolor: '#f1f5f9',
										}}
										alt={product.product_name}
									>
										{(product.product_name || '').charAt(0)}
									</Avatar>
									<Box sx={{ flex: 1 }}>
										<Typography
											variant="h6"
											sx={{ fontWeight: 700 }}
										>
											{product.product_name}
										</Typography>
										<Typography
											sx={{ color: '#6b7280', mt: 0.5 }}
										>
											Mã: {product.product_code || '-'}
										</Typography>
										<Stack
											direction="row"
											spacing={1}
											sx={{ mt: 1 }}
										>
											<Chip
												label={
													product.status
														? 'Hoạt động'
														: 'Không hoạt động'
												}
												color={
													product.status
														? 'success'
														: 'default'
												}
											/>
											<Chip
												label={
													product.category_name || '-'
												}
											/>
										</Stack>
									</Box>
								</Box>
								<Divider sx={{ my: 2 }} />
								<Box
									sx={{
										display: 'flex',
										gap: 1,
										flexWrap: 'wrap',
									}}
								>
									<Typography sx={{ fontWeight: 600 }}>
										Giá bán:
									</Typography>
									<Typography sx={{ color: '#111827' }}>
										{formatPrice(product.price)}
									</Typography>
								</Box>
								<Box sx={{ mt: 2 }}>
									<Button
										variant="contained"
										startIcon={<EditIcon />}
										onClick={handleEdit}
										sx={{ mr: 1, textTransform: 'none' }}
									>
										Chỉnh sửa
									</Button>
									<Button
										variant="outlined"
										color="error"
										startIcon={<DeleteIcon />}
										onClick={handleDelete}
										sx={{ textTransform: 'none' }}
									>
										Xóa
									</Button>
								</Box>
							</Card>
						</Grid>

						{/* Right: Detailed sections */}
						<Grid item xs={12} md={8}>
							{/* Basic Info Card */}
							<Paper sx={{ p: 2, mb: 2 }}>
								<Typography
									variant="subtitle1"
									sx={{ fontWeight: 700, mb: 1 }}
								>
									Thông Tin Cơ Bản
								</Typography>
								<Grid container spacing={1}>
									<Grid item xs={12} sm={6}>
										<Typography sx={{ fontWeight: 600 }}>
											SKU
										</Typography>
										<Typography sx={{ color: '#6b7280' }}>
											{product.sku || '-'}
										</Typography>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Typography sx={{ fontWeight: 600 }}>
											Đơn Vị
										</Typography>
										<Typography sx={{ color: '#6b7280' }}>
											{product.unit_name || '-'}
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography
											sx={{ fontWeight: 600, mt: 1 }}
										>
											Mô Tả
										</Typography>
										<Typography sx={{ color: '#6b7280' }}>
											{product.description || '-'}
										</Typography>
									</Grid>
								</Grid>
							</Paper>

							{/* Price Card */}
							<Paper sx={{ p: 2, mb: 2 }}>
								<Typography
									variant="subtitle1"
									sx={{ fontWeight: 700, mb: 1 }}
								>
									Giá & Lợi Nhuận
								</Typography>
								<Grid container spacing={1}>
									<Grid item xs={12} sm={6}>
										<Typography sx={{ fontWeight: 600 }}>
											Giá Bán
										</Typography>
										<Typography sx={{ color: '#111827' }}>
											{formatPrice(product.price)}
										</Typography>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Typography sx={{ fontWeight: 600 }}>
											Giá Vốn
										</Typography>
										<Typography sx={{ color: '#111827' }}>
											{formatPrice(product.cost)}
										</Typography>
									</Grid>
								</Grid>
							</Paper>

							{/* Inventory Card */}
							<Paper sx={{ p: 2, mb: 2 }}>
								<Typography
									variant="subtitle1"
									sx={{ fontWeight: 700, mb: 1 }}
								>
									Tồn Kho
								</Typography>
								<Grid container spacing={1}>
									<Grid item xs={12} sm={6}>
										<Typography sx={{ fontWeight: 600 }}>
											Tồn Hiện Tại
										</Typography>
										<Typography sx={{ color: '#111827' }}>
											{product.current_inventory || 0}
										</Typography>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Typography sx={{ fontWeight: 600 }}>
											Tồn Tối Thiểu
										</Typography>
										<Typography sx={{ color: '#111827' }}>
											{product.minimum_inventory || 0}
										</Typography>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					</Grid>
				</Box>
			</Box>

			<ConfirmDialog
				open={confirmDelete}
				title="Xóa Sản Phẩm"
				message={`Bạn có chắc chắn muốn xóa sản phẩm "${product.product_name}"? Hành động này không thể hoàn tác.`}
				onConfirm={handleConfirmDelete}
				onCancel={() => setConfirmDelete(false)}
				confirmText="Xóa"
				cancelText="Hủy"
				confirmColor="error"
			/>
		</Box>
	);
};

export default ProductDetail;
