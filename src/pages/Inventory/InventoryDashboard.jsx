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
	Alert,
	LinearProgress,
	Card,
	Typography,
	Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const InventoryDashboard = () => {
	const theme = useTheme();
	const [openDialog, setOpenDialog] = useState(false);
	const [inventory, setInventory] = useState([
		{
			id: 1,
			sku: 'SKU-001',
			product: 'Laptop Dell XPS',
			quantity: 100,
			minStock: 20,
			maxStock: 200,
			status: 'Normal',
		},
		{
			id: 2,
			sku: 'SKU-002',
			product: 'Office Chair',
			quantity: 15,
			minStock: 50,
			maxStock: 300,
			status: 'Low',
		},
		{
			id: 3,
			sku: 'SKU-003',
			product: 'Monitor 4K',
			quantity: 250,
			minStock: 10,
			maxStock: 100,
			status: 'Excess',
		},
		{
			id: 4,
			sku: 'SKU-004',
			product: 'Keyboard Gaming',
			quantity: 45,
			minStock: 30,
			maxStock: 150,
			status: 'Normal',
		},
	]);

	const [formData, setFormData] = useState({
		sku: '',
		quantity: '',
	});

	const getStatusColor = (status) => {
		switch (status) {
			case 'Normal':
				return 'success';
			case 'Low':
				return 'warning';
			case 'Excess':
				return 'error';
			default:
				return 'default';
		}
	};

	const getStatusLabel = (status) => {
		const labels = {
			Normal: '✅ Bình thường',
			Low: '⚠️ Cần đặt hàng',
			Excess: '❌ Vượt quá',
		};
		return labels[status] || status;
	};

	const columns = [
		{ id: 'sku', label: '🔢 Mã SKU', align: 'left', width: '18%' },
		{
			id: 'product',
			label: '📦 Tên sản phẩm',
			align: 'left',
			width: '25%',
		},
		{ id: 'quantity', label: '📊 Hiện tại', align: 'center', width: '15%' },
		{
			id: 'minStock',
			label: '📉 Tối thiểu',
			align: 'center',
			width: '15%',
		},
		{ id: 'maxStock', label: '📈 Tối đa', align: 'center', width: '15%' },
		{
			id: 'status',
			label: '⚡ Trạng thái',
			align: 'center',
			width: '12%',
			render: (value) => (
				<Chip
					label={getStatusLabel(value)}
					color={getStatusColor(value)}
					size="small"
					sx={{ fontWeight: 600 }}
				/>
			),
		},
	];

	const lowStockCount = inventory.filter((i) => i.status === 'Low').length;
	const excessStockCount = inventory.filter(
		(i) => i.status === 'Excess',
	).length;
	const totalInventoryValue = inventory.reduce(
		(sum, i) => sum + i.quantity,
		0,
	);

	const handleAddClick = () => {
		setFormData({ sku: '', quantity: '' });
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
		setFormData({ sku: '', quantity: '' });
	};

	const handleUpdateStock = () => {
		// Handle stock update logic
		handleCloseDialog();
	};

	return (
		<Box sx={{ pb: 5 }}>
			<PageHeader
				title="📦 Quản lý tồn kho"
				subtitle="Theo dõi mức tồn kho và quản lý hàng trong kho"
				actionButton={{
					label: '🔄 Điều chỉnh tồn kho',
					icon: <AddIcon />,
				}}
				onActionClick={handleAddClick}
				breadcrumbs={[
					{ label: '🏠 Trang chủ' },
					{ label: '📦 Kho hàng' },
				]}
			/>

			{/* Alerts & Stats */}
			<Box sx={{ mt: 3 }}>
				{/* Alert */}
				{lowStockCount > 0 && (
					<Grid container spacing={2} sx={{ mb: 3 }}>
						<Grid item xs={12}>
							<Alert
								severity="warning"
								sx={{
									borderRadius: 2,
									boxShadow:
										'0 4px 12px rgba(245, 152, 0, 0.15)',
									backgroundColor: '#fff8e1',
									border: '1px solid #ffc107',
								}}
							>
								⚠️ <strong>{lowStockCount} sản phẩm</strong>{' '}
								dưới mức tối thiểu. Cần đặt hàng ngay để tránh
								hết hàng!
							</Alert>
						</Grid>
					</Grid>
				)}

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
								{totalInventoryValue}
							</Typography>
							<Typography variant="body2" sx={{ opacity: 0.9 }}>
								📦 Tổng tồn kho
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
								{lowStockCount}
							</Typography>
							<Typography variant="body2" sx={{ opacity: 0.9 }}>
								⚠️ Cần đặt hàng
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
								{
									inventory.filter(
										(i) => i.status === 'Normal',
									).length
								}
							</Typography>
							<Typography variant="body2" sx={{ opacity: 0.9 }}>
								✅ Bình thường
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
								{excessStockCount}
							</Typography>
							<Typography variant="body2" sx={{ opacity: 0.9 }}>
								❌ Vượt quá
							</Typography>
						</Card>
					</Grid>
				</Grid>

				{/* Inventory Table */}
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
							📋 Danh sách hàng hóa
						</Typography>
						<Typography variant="caption" sx={{ color: '#666' }}>
							Chi tiết tồn kho từng sản phẩm và mức cảnh báo
						</Typography>
					</Box>
					<Box sx={{ p: 0 }}>
						<DataTable
							columns={columns}
							rows={inventory}
							selectable={true}
						/>
					</Box>
				</Card>
			</Box>

			{/* Stock Adjustment Dialog */}
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
					🔄 Điều chỉnh tồn kho
				</DialogTitle>
				<DialogContent sx={{ pt: 3 }}>
					<Grid container spacing={2.5}>
						<Grid item xs={12}>
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
								placeholder="e.g., SKU-001"
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
								label="📊 Điều chỉnh số lượng"
								type="number"
								value={formData.quantity}
								onChange={(e) =>
									setFormData({
										...formData,
										quantity: e.target.value,
									})
								}
								placeholder="Nhập số dương hoặc âm"
								helperText="Dương = Nhập, Âm = Xuất"
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
						onClick={handleUpdateStock}
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
						✅ Cập nhật
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default InventoryDashboard;
