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
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Tab,
	Tabs,
	Chip,
	Card,
	Typography,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const InboundWarehouseList = () => {
	const theme = useTheme();
	const [openDialog, setOpenDialog] = useState(false);
	const [activeTab, setActiveTab] = useState(0);
	const [inboundOrders, setInboundOrders] = useState([
		{
			id: 1,
			receiptNo: 'RCV-001',
			supplier: 'Công ty Linh kiện Việt',
			date: '2024-01-15',
			expectedDate: '2024-01-15',
			items: 5,
			status: 'Completed',
		},
		{
			id: 2,
			receiptNo: 'RCV-002',
			supplier: 'CCE Industrial',
			date: '2024-01-14',
			expectedDate: '2024-01-16',
			items: 3,
			status: 'In Progress',
		},
		{
			id: 3,
			receiptNo: 'RCV-003',
			supplier: 'Nhôm Kính Hà Nội',
			date: '2024-01-13',
			expectedDate: '2024-01-20',
			items: 8,
			status: 'Pending',
		},
		{
			id: 4,
			receiptNo: 'RCV-004',
			supplier: 'Thiết bị điện tử Nam Á',
			date: '2024-01-12',
			expectedDate: '2024-01-18',
			items: 12,
			status: 'Completed',
		},
	]);

	const getStatusLabel = (status) => {
		const labels = {
			Completed: '✅ Hoàn thành',
			'In Progress': '⏳ Đang xử lý',
			Pending: '⏸️ Chờ xử lý',
		};
		return labels[status] || status;
	};

	const columns = [
		{ id: 'receiptNo', label: '📋 Mã nhận', align: 'left' },
		{ id: 'supplier', label: '🤝 Nhà cung cấp', align: 'left' },
		{ id: 'date', label: '📅 Ngày nhận', align: 'left' },
		{ id: 'expectedDate', label: '⏰ Ngày dự kiến', align: 'left' },
		{ id: 'items', label: '📦 Số lượng', align: 'center' },
		{
			id: 'status',
			label: '📊 Trạng thái',
			align: 'center',
			render: (value) => {
				const colors = {
					Completed: 'success',
					'In Progress': 'warning',
					Pending: 'info',
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

	const handleAddInbound = () => {
		handleCloseDialog();
	};

	const handleDelete = (item) => {
		setInboundOrders(inboundOrders.filter((o) => o.id !== item.id));
	};

	return (
		<Box sx={{ pb: 5 }}>
			<PageHeader
				title="📥 Nhập kho"
				subtitle="Quản lý hàng nhập từ nhà cung cấp"
				actionButton={{ label: '➕ Phiếu nhập', icon: <AddIcon /> }}
				onActionClick={handleAddClick}
				breadcrumbs={[
					{ label: '🏠 Trang chủ' },
					{ label: '🏢 Kho' },
					{ label: '📥 Nhập kho' },
				]}
			/>

			<Box sx={{ mt: 3 }}>
				{/* Stat Cards */}
				<Grid container spacing={2.5} sx={{ mb: 3 }}>
					{/* Total Inbound */}
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
								📥 Tổng phiếu nhập
							</Typography>
							<Typography
								variant="h4"
								sx={{
									fontWeight: 700,
									mt: 1,
									fontSize: '2rem',
								}}
							>
								{inboundOrders.length}
							</Typography>
						</Card>
					</Grid>

					{/* Pending */}
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
								⏸️ Chờ xử lý
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
									inboundOrders.filter(
										(o) => o.status === 'Pending',
									).length
								}
							</Typography>
						</Card>
					</Grid>

					{/* In Progress */}
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
								⏳ Đang xử lý
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
									inboundOrders.filter(
										(o) => o.status === 'In Progress',
									).length
								}
							</Typography>
						</Card>
					</Grid>

					{/* Completed */}
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
									inboundOrders.filter(
										(o) => o.status === 'Completed',
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
										color: '#667eea',
										borderBottom: '3px solid #667eea',
									},
								},
							}}
						>
							<Tab label="📋 Tất cả" />
							<Tab label="⏸️ Chờ xử lý" />
							<Tab label="⏳ Đang xử lý" />
							<Tab label="✅ Hoàn thành" />
						</Tabs>
					</Box>
				</Card>

				{/* Inbound Table */}
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
							📋 Danh sách phiếu nhập
						</Typography>
						<Typography variant="caption" sx={{ color: '#666' }}>
							Theo dõi tình trạng nhập hàng từ nhà cung cấp
						</Typography>
					</Box>
					<Box sx={{ p: 0 }}>
						<DataTable
							columns={columns}
							rows={inboundOrders}
							onDelete={handleDelete}
							selectable={true}
						/>
					</Box>
				</Card>
			</Box>

			{/* Create Inbound Dialog */}
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
							'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
						color: 'white',
						fontWeight: 700,
						fontSize: '1.3rem',
						py: 2.5,
					}}
				>
					➕ Tạo phiếu nhập kho
				</DialogTitle>
				<DialogContent sx={{ pt: 3 }}>
					<Grid container spacing={2.5}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="🤝 Nhà cung cấp"
								placeholder="Chọn hoặc nhập nhà cung cấp"
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
								label="⏰ Ngày dự kiến giao"
								type="date"
								InputLabelProps={{ shrink: true }}
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
								label="📝 Mã đơn mua"
								placeholder="e.g., PO-001"
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
								placeholder="Nhập hướng dẫn đặc biệt"
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
						onClick={handleAddInbound}
						variant="contained"
						sx={{
							background:
								'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
							borderRadius: 1,
							px: 3,
							textTransform: 'none',
							fontWeight: 600,
							boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
							'&:hover': {
								boxShadow:
									'0 6px 16px rgba(102, 126, 234, 0.6)',
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

export default InboundWarehouseList;
