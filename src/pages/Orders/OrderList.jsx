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
	Chip,
	Card,
	Typography,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const OrderList = () => {
	const theme = useTheme();
	const [openDialog, setOpenDialog] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [orders, setOrders] = useState([
		{
			id: 1,
			orderNo: 'ORD-001',
			customer: 'John Doe',
			date: '2024-01-15',
			amount: '$1,500',
			status: 'Processing',
		},
		{
			id: 2,
			orderNo: 'ORD-002',
			customer: 'Jane Smith',
			date: '2024-01-14',
			amount: '$2,300',
			status: 'Completed',
		},
		{
			id: 3,
			orderNo: 'ORD-003',
			customer: 'Bob Johnson',
			date: '2024-01-13',
			amount: '$950',
			status: 'Pending',
		},
		{
			id: 4,
			orderNo: 'ORD-004',
			customer: 'Alice Brown',
			date: '2024-01-12',
			amount: '$3,200',
			status: 'Completed',
		},
	]);

	const [formData, setFormData] = useState({
		orderNo: '',
		customer: '',
		amount: '',
	});

	const getStatusColor = (status) => {
		switch (status) {
			case 'Completed':
				return 'success';
			case 'Processing':
				return 'warning';
			case 'Pending':
				return 'info';
			default:
				return 'default';
		}
	};

	const getStatusLabel = (status) => {
		const labels = {
			Completed: '✅ Hoàn thành',
			Processing: '⏳ Đang xử lý',
			Pending: '⏸️ Chờ xử lý',
		};
		return labels[status] || status;
	};

	const columns = [
		{ id: 'orderNo', label: '🛒 Mã đơn hàng', align: 'left', width: '18%' },
		{ id: 'customer', label: '👤 Khách hàng', align: 'left', width: '25%' },
		{ id: 'date', label: '📅 Ngày đặt', align: 'center', width: '18%' },
		{ id: 'amount', label: '💰 Giá trị', align: 'right', width: '18%' },
		{
			id: 'status',
			label: '📊 Trạng thái',
			align: 'center',
			width: '18%',
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

	const handleAddClick = () => {
		setEditingId(null);
		setFormData({ orderNo: '', customer: '', amount: '' });
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
		setEditingId(null);
		setFormData({ orderNo: '', customer: '', amount: '' });
	};

	const handleAddOrder = () => {
		if (editingId) {
			setOrders(
				orders.map((o) =>
					o.id === editingId ? { ...o, ...formData } : o,
				),
			);
		} else {
			const newOrder = {
				id: orders.length + 1,
				...formData,
				date: new Date().toISOString().split('T')[0],
				status: 'Pending',
			};
			setOrders([...orders, newOrder]);
		}
		handleCloseDialog();
	};

	const handleEdit = (order) => {
		setEditingId(order.id);
		setFormData({
			orderNo: order.orderNo,
			customer: order.customer,
			amount: order.amount,
		});
		setOpenDialog(true);
	};

	const handleDelete = (order) => {
		setOrders(orders.filter((o) => o.id !== order.id));
	};

	return (
		<Box sx={{ pb: 5 }}>
			<PageHeader
				title="🛒 Quản lý đơn hàng"
				subtitle="Theo dõi và quản lý các đơn hàng khách hàng"
				actionButton={{ label: '➕ Tạo đơn hàng', icon: <AddIcon /> }}
				onActionClick={handleAddClick}
				breadcrumbs={[
					{ label: '🏠 Trang chủ' },
					{ label: '🛒 Đơn hàng' },
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
								{orders.length}
							</Typography>
							<Typography variant="body2" sx={{ opacity: 0.9 }}>
								🛒 Tổng đơn hàng
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
								{
									orders.filter(
										(o) => o.status === 'Completed',
									).length
								}
							</Typography>
							<Typography variant="body2" sx={{ opacity: 0.9 }}>
								✅ Hoàn thành
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
									orders.filter(
										(o) => o.status === 'Processing',
									).length
								}
							</Typography>
							<Typography variant="body2" sx={{ opacity: 0.9 }}>
								⏳ Đang xử lý
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
								$
								{orders
									.reduce(
										(sum, o) =>
											sum +
											parseInt(
												o.amount.replace(/[$,]/g, '') ||
													0,
											),
										0,
									)
									.toLocaleString()}
							</Typography>
							<Typography variant="body2" sx={{ opacity: 0.9 }}>
								💰 Tổng giá trị
							</Typography>
						</Card>
					</Grid>
				</Grid>

				{/* Order Table */}
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
							📋 Danh sách đơn hàng
						</Typography>
						<Typography variant="caption" sx={{ color: '#666' }}>
							Quản lý trạng thái và theo dõi các đơn hàng
						</Typography>
					</Box>
					<Box sx={{ p: 0 }}>
						<DataTable
							columns={columns}
							rows={orders}
							onEdit={handleEdit}
							onDelete={handleDelete}
							selectable={true}
						/>
					</Box>
				</Card>
			</Box>

			{/* Create/Edit Order Dialog */}
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
							'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
						color: 'white',
						fontWeight: 700,
						fontSize: '1.3rem',
						py: 2.5,
					}}
				>
					{editingId ? '✏️ Cập nhật đơn hàng' : '➕ Tạo đơn hàng mới'}
				</DialogTitle>
				<DialogContent sx={{ pt: 3 }}>
					<Grid container spacing={2.5}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="🛒 Mã đơn hàng"
								value={formData.orderNo}
								onChange={(e) =>
									setFormData({
										...formData,
										orderNo: e.target.value,
									})
								}
								placeholder="e.g., ORD-001"
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
								label="👤 Tên khách hàng"
								value={formData.customer}
								onChange={(e) =>
									setFormData({
										...formData,
										customer: e.target.value,
									})
								}
								placeholder="Chọn hoặc nhập tên khách hàng"
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
								label="💰 Giá trị đơn hàng"
								value={formData.amount}
								onChange={(e) =>
									setFormData({
										...formData,
										amount: e.target.value,
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
						onClick={handleAddOrder}
						variant="contained"
						sx={{
							background:
								'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
							borderRadius: 1,
							px: 3,
							textTransform: 'none',
							fontWeight: 600,
							boxShadow: '0 4px 12px rgba(250, 112, 154, 0.4)',
							'&:hover': {
								boxShadow:
									'0 6px 16px rgba(250, 112, 154, 0.6)',
								transform: 'translateY(-2px)',
							},
							transition: 'all 0.3s ease',
						}}
					>
						{editingId ? '💾 Lưu' : '➕ Tạo'}
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default OrderList;
