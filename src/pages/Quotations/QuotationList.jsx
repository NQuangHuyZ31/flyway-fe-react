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
	Card,
	Typography,
	Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const QuotationList = () => {
	const theme = useTheme();
	const [openDialog, setOpenDialog] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [quotations, setQuotations] = useState([
		{
			id: 1,
			quoteNo: 'QT-001',
			customer: 'John Doe',
			date: '2024-01-15',
			amount: '$5,000',
			expiryDate: '2024-02-15',
			status: 'Active',
		},
		{
			id: 2,
			quoteNo: 'QT-002',
			customer: 'Jane Smith',
			date: '2024-01-10',
			amount: '$3,500',
			expiryDate: '2024-02-10',
			status: 'Expired',
		},
		{
			id: 3,
			quoteNo: 'QT-003',
			customer: 'Bob Johnson',
			date: '2024-01-12',
			amount: '$2,200',
			expiryDate: '2024-02-12',
			status: 'Active',
		},
		{
			id: 4,
			quoteNo: 'QT-004',
			customer: 'Alice Brown',
			date: '2024-01-08',
			amount: '$4,800',
			expiryDate: '2024-02-08',
			status: 'Converted',
		},
	]);

	const [formData, setFormData] = useState({
		customer: '',
		amount: '',
		description: '',
	});

	const getStatusColor = (status) => {
		switch (status) {
			case 'Active':
				return 'success';
			case 'Expired':
				return 'error';
			case 'Converted':
				return 'info';
			default:
				return 'default';
		}
	};

	const getStatusLabel = (status) => {
		const labels = {
			Active: '✅ Còn hiệu lực',
			Expired: '❌ Hết hạn',
			Converted: '🎯 Chuyển đơn',
		};
		return labels[status] || status;
	};

	const columns = [
		{ id: 'quoteNo', label: '📄 Mã báo giá', align: 'left', width: '18%' },
		{ id: 'customer', label: '👤 Khách hàng', align: 'left', width: '22%' },
		{ id: 'date', label: '📅 Ngày tạo', align: 'center', width: '18%' },
		{ id: 'amount', label: '💰 Giá trị', align: 'right', width: '18%' },
		{
			id: 'expiryDate',
			label: '⏰ Hết hạn',
			align: 'center',
			width: '18%',
		},
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
		setFormData({ customer: '', amount: '', description: '' });
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
		setEditingId(null);
		setFormData({ customer: '', amount: '', description: '' });
	};

	const handleAddQuotation = () => {
		if (editingId) {
			setQuotations(
				quotations.map((q) =>
					q.id === editingId ? { ...q, ...formData } : q,
				),
			);
		} else {
			const newQuotation = {
				id: quotations.length + 1,
				quoteNo: `QT-${String(quotations.length + 1).padStart(3, '0')}`,
				...formData,
				date: new Date().toISOString().split('T')[0],
				expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
					.toISOString()
					.split('T')[0],
				status: 'Active',
			};
			setQuotations([...quotations, newQuotation]);
		}
		handleCloseDialog();
	};

	const handleEdit = (quotation) => {
		setEditingId(quotation.id);
		setFormData({
			customer: quotation.customer,
			amount: quotation.amount,
			description: '',
		});
		setOpenDialog(true);
	};

	const handleDelete = (quotation) => {
		setQuotations(quotations.filter((q) => q.id !== quotation.id));
	};

	return (
		<Box sx={{ pb: 5 }}>
			<PageHeader
				title="📄 Quản lý báo giá"
				subtitle="Tạo và quản lý báo giá cho khách hàng"
				actionButton={{ label: '➕ Báo giá mới', icon: <AddIcon /> }}
				onActionClick={handleAddClick}
				breadcrumbs={[
					{ label: '🏠 Trang chủ' },
					{ label: '📄 Báo giá' },
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
								{quotations.length}
							</Typography>
							<Typography variant="body2" sx={{ opacity: 0.9 }}>
								📄 Tổng báo giá
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
									quotations.filter(
										(q) => q.status === 'Active',
									).length
								}
							</Typography>
							<Typography variant="body2" sx={{ opacity: 0.9 }}>
								✅ Còn hiệu lực
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
									quotations.filter(
										(q) => q.status === 'Converted',
									).length
								}
							</Typography>
							<Typography variant="body2" sx={{ opacity: 0.9 }}>
								🎯 Chuyển đơn
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
								{quotations
									.reduce(
										(sum, q) =>
											sum +
											parseInt(
												q.amount.replace(/[$,]/g, '') ||
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

				{/* Quotation Table */}
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
							📋 Danh sách báo giá
						</Typography>
						<Typography variant="caption" sx={{ color: '#666' }}>
							Quản lý và theo dõi các báo giá đã gửi
						</Typography>
					</Box>
					<Box sx={{ p: 0 }}>
						<DataTable
							columns={columns}
							rows={quotations}
							onEdit={handleEdit}
							onDelete={handleDelete}
							selectable={true}
						/>
					</Box>
				</Card>
			</Box>

			{/* Create/Edit Quotation Dialog */}
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
					{editingId ? '✏️ Cập nhật báo giá' : '➕ Tạo báo giá mới'}
				</DialogTitle>
				<DialogContent sx={{ pt: 3 }}>
					<Grid container spacing={2.5}>
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
								label="💰 Giá trị báo giá"
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
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="📝 Mô tả chi tiết"
								value={formData.description}
								onChange={(e) =>
									setFormData({
										...formData,
										description: e.target.value,
									})
								}
								placeholder="Nhập chi tiết báo giá"
								multiline
								rows={4}
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
						onClick={handleAddQuotation}
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
						{editingId ? '💾 Lưu' : '➕ Tạo'}
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default QuotationList;
