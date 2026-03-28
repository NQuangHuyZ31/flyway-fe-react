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
	Tabs,
	Tab,
	Card,
	Typography,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const OutboundWarehouseList = () => {
	const theme = useTheme();
	const [openDialog, setOpenDialog] = useState(false);
	const [activeTab, setActiveTab] = useState(0);
	const [outboundOrders, setOutboundOrders] = useState([
		{
			id: 1,
			shipmentNo: 'SHIP-001',
			customer: 'Công Ty ABC',
			date: '2024-01-15',
			shippedDate: '2024-01-15',
			items: 5,
			status: 'Shipped',
		},
		{
			id: 2,
			shipmentNo: 'SHIP-002',
			customer: 'Siêu Thị Xanh',
			date: '2024-01-14',
			shippedDate: null,
			items: 3,
			status: 'Ready to Ship',
		},
		{
			id: 3,
			shipmentNo: 'SHIP-003',
			customer: 'Bán Lẻ Hà Nội',
			date: '2024-01-13',
			shippedDate: null,
			items: 8,
			status: 'Picking',
		},
		{
			id: 4,
			shipmentNo: 'SHIP-004',
			customer: 'Cửa Hàng Bốn Lá',
			date: '2024-01-12',
			shippedDate: '2024-01-13',
			items: 12,
			status: 'Shipped',
		},
	]);

	const getStatusLabel = (status) => {
		const labels = {
			Shipped: '✅ Hoàn thành',
			'Ready to Ship': '⏳ Sẵn sàng giao',
			Picking: '⏸️ Đang chọn hàng',
		};
		return labels[status] || status;
	};

	const columns = [
		{ id: 'shipmentNo', label: '📋 Mã vận chuyển', align: 'left' },
		{ id: 'customer', label: '🏪 Khách hàng', align: 'left' },
		{ id: 'date', label: '📅 Ngày đơn', align: 'left' },
		{
			id: 'shippedDate',
			label: '📤 Ngày giao',
			align: 'left',
			render: (value) => value || '-',
		},
		{ id: 'items', label: '📦 Số lượng', align: 'center' },
		{
			id: 'status',
			label: '📊 Trạng thái',
			align: 'center',
			render: (value) => {
				const colors = {
					Shipped: 'success',
					'Ready to Ship': 'warning',
					Picking: 'info',
				};
				return (
					<Chip
						label={getStatusLabel(value)}
						color={colors[value] || 'default'}
						size="small"
						sx={{ fontWeight: 600 }}
					/>
				);
			},
		},
	];

	const handleAddClick = () => {
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const handleAddOutbound = () => {
		handleCloseDialog();
	};

	const handleDelete = (item) => {
		setOutboundOrders(outboundOrders.filter((o) => o.id !== item.id));
	};

	return (
		<Box sx={{ pb: 5 }}>
			<PageHeader
				title="📤 Xuất kho"
				subtitle="Quản lý hàng giao cho khách hàng"
				actionButton={{ label: '➕ Phiếu xuất', icon: <AddIcon /> }}
				onActionClick={handleAddClick}
				breadcrumbs={[
					{ label: '🏠 Trang chủ' },
					{ label: '🏢 Kho' },
					{ label: '📤 Xuất kho' },
				]}
			/>

			<Box sx={{ mt: 3 }}>
				{/* Stat Cards */}
				<Grid container spacing={2.5} sx={{ mb: 3 }}>
					{/* Total Shipments */}
					<Grid item xs={12} sm={6} md={3}>
						<Card
							sx={{
								p: 2.5,
								borderRadius: 2,
								background:
									'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
								color: 'white',
								boxShadow: '0 4px 12px rgba(245, 87, 108, 0.3)',
								transition: 'all 0.3s ease',
								cursor: 'pointer',
								'&:hover': {
									transform: 'translateY(-4px)',
									boxShadow:
										'0 8px 20px rgba(245, 87, 108, 0.5)',
								},
							}}
						>
							<Typography
								variant="caption"
								sx={{ opacity: 0.9, fontWeight: 600 }}
							>
								📤 Tổng phiếu xuất
							</Typography>
							<Typography
								variant="h4"
								sx={{
									fontWeight: 700,
									mt: 1,
									fontSize: '2rem',
								}}
							>
								{outboundOrders.length}
							</Typography>
						</Card>
					</Grid>

					{/* Picking */}
					<Grid item xs={12} sm={6} md={3}>
						<Card
							sx={{
								p: 2.5,
								borderRadius: 2,
								background:
									'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
								color: 'white',
								boxShadow: '0 4px 12px rgba(79, 172, 254, 0.3)',
								transition: 'all 0.3s ease',
								cursor: 'pointer',
								'&:hover': {
									transform: 'translateY(-4px)',
									boxShadow:
										'0 8px 20px rgba(79, 172, 254, 0.5)',
								},
							}}
						>
							<Typography
								variant="caption"
								sx={{ opacity: 0.9, fontWeight: 600 }}
							>
								⏸️ Đang chọn hàng
							</Typography>
							<Typography
								variant="h4"
								sx={{
									fontWeight: 700,
									mt: 1,
									fontSize: '2rem',
								}}
							>
								{
									outboundOrders.filter(
										(o) => o.status === 'Picking',
									).length
								}
							</Typography>
						</Card>
					</Grid>

					{/* Ready to Ship */}
					<Grid item xs={12} sm={6} md={3}>
						<Card
							sx={{
								p: 2.5,
								borderRadius: 2,
								background:
									'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
								color: 'white',
								boxShadow:
									'0 4px 12px rgba(250, 112, 154, 0.3)',
								transition: 'all 0.3s ease',
								cursor: 'pointer',
								'&:hover': {
									transform: 'translateY(-4px)',
									boxShadow:
										'0 8px 20px rgba(250, 112, 154, 0.5)',
								},
							}}
						>
							<Typography
								variant="caption"
								sx={{ opacity: 0.9, fontWeight: 600 }}
							>
								⏳ Sẵn sàng giao
							</Typography>
							<Typography
								variant="h4"
								sx={{
									fontWeight: 700,
									mt: 1,
									fontSize: '2rem',
								}}
							>
								{
									outboundOrders.filter(
										(o) => o.status === 'Ready to Ship',
									).length
								}
							</Typography>
						</Card>
					</Grid>

					{/* Shipped */}
					<Grid item xs={12} sm={6} md={3}>
						<Card
							sx={{
								p: 2.5,
								borderRadius: 2,
								background:
									'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
								color: 'white',
								boxShadow:
									'0 4px 12px rgba(102, 126, 234, 0.3)',
								transition: 'all 0.3s ease',
								cursor: 'pointer',
								'&:hover': {
									transform: 'translateY(-4px)',
									boxShadow:
										'0 8px 20px rgba(102, 126, 234, 0.5)',
								},
							}}
						>
							<Typography
								variant="caption"
								sx={{ opacity: 0.9, fontWeight: 600 }}
							>
								✅ Hoàn thành
							</Typography>
							<Typography
								variant="h4"
								sx={{
									fontWeight: 700,
									mt: 1,
									fontSize: '2rem',
								}}
							>
								{
									outboundOrders.filter(
										(o) => o.status === 'Shipped',
									).length
								}
							</Typography>
						</Card>
					</Grid>
				</Grid>

				{/* Tabs with better styling */}
				<Card
					sx={{
						mb: 3,
						borderRadius: 2,
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
						overflow: 'hidden',
					}}
				>
					<Box
						sx={{
							backgroundColor: '#f5f7fa',
							borderBottom: '2px solid #e0e0e0',
						}}
					>
						<Tabs
							value={activeTab}
							onChange={(e, newValue) => setActiveTab(newValue)}
							sx={{
								'& .MuiTab-root': {
									textTransform: 'none',
									fontSize: '1rem',
									fontWeight: 600,
									color: '#666',
									'&.Mui-selected': {
										color: '#f5576c',
										borderBottom: '3px solid #f5576c',
									},
								},
							}}
						>
							<Tab label="📋 Tất cả" />
							<Tab label="⏸️ Đang chọn hàng" />
							<Tab label="⏳ Sẵn sàng giao" />
							<Tab label="✅ Hoàn thành" />
						</Tabs>
					</Box>
				</Card>

				{/* Outbound Table */}
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
							📋 Danh sách phiếu xuất
						</Typography>
						<Typography variant="caption" sx={{ color: '#666' }}>
							Theo dõi tình trạng giao hàng cho khách hàng
						</Typography>
					</Box>
					<Box sx={{ p: 0 }}>
						<DataTable
							columns={columns}
							rows={outboundOrders}
							onDelete={handleDelete}
							selectable={true}
						/>
					</Box>
				</Card>
			</Box>

			{/* Create Outbound Dialog */}
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
							'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
						color: 'white',
						fontWeight: 700,
						fontSize: '1.3rem',
						py: 2.5,
					}}
				>
					➕ Tạo phiếu xuất kho
				</DialogTitle>
				<DialogContent sx={{ pt: 3 }}>
					<Grid container spacing={2.5}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="🏪 Khách hàng"
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
								label="📍 Địa chỉ giao"
								placeholder="Nhập địa chỉ giao hàng"
								multiline
								rows={2}
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
								label="🚚 Công ty vận chuyển"
								placeholder="e.g., GHN, Viettel Post"
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
								label="📝 Mã theo dõi"
								placeholder="Nhập mã vận đơn"
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
								label="💬 Ghi chú"
								placeholder="Hướng dẫn giao hàng đặc biệt"
								multiline
								rows={3}
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
						onClick={handleAddOutbound}
						variant="contained"
						sx={{
							background:
								'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
							borderRadius: 1,
							px: 3,
							textTransform: 'none',
							fontWeight: 600,
							boxShadow: '0 4px 12px rgba(245, 87, 108, 0.4)',
							'&:hover': {
								boxShadow: '0 6px 16px rgba(245, 87, 108, 0.6)',
								transform: 'translateY(-2px)',
							},
							transition: 'all 0.3s ease',
						}}
					>
						✅ Tạo
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default OutboundWarehouseList;
