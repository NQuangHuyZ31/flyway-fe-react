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

const CustomerList = () => {
	const theme = useTheme();
	const [openDialog, setOpenDialog] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [customers, setCustomers] = useState([
		{
			id: 1,
			name: 'John Doe',
			email: 'john@example.com',
			phone: '(+1) 123-456-7890',
			address: '123 Main St, New York, NY 10001',
			status: 'Active',
		},
		{
			id: 2,
			name: 'Jane Smith',
			email: 'jane@example.com',
			phone: '(+1) 098-765-4321',
			address: '456 Oak Ave, Los Angeles, CA 90001',
			status: 'Active',
		},
		{
			id: 3,
			name: 'Bob Johnson',
			email: 'bob@example.com',
			phone: '(+1) 555-867-5309',
			address: '789 Pine Rd, Chicago, IL 60601',
			status: 'Inactive',
		},
		{
			id: 4,
			name: 'Alice Brown',
			email: 'alice@example.com',
			phone: '(+1) 555-123-4567',
			address: '321 Elm St, Houston, TX 77001',
			status: 'Active',
		},
	]);

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		address: '',
	});

	const columns = [
		{ id: 'name', label: '👤 Tên khách hàng', align: 'left', width: '25%' },
		{ id: 'email', label: '📧 Email', align: 'left', width: '25%' },
		{
			id: 'phone',
			label: '📞 Số điện thoại',
			align: 'center',
			width: '20%',
		},
		{ id: 'address', label: '📍 Địa chỉ', align: 'left', width: '30%' },
	];

	const handleAddClick = () => {
		setEditingId(null);
		setFormData({ name: '', email: '', phone: '', address: '' });
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
		setEditingId(null);
		setFormData({ name: '', email: '', phone: '', address: '' });
	};

	const handleAddCustomer = () => {
		if (editingId) {
			setCustomers(
				customers.map((c) =>
					c.id === editingId ? { ...c, ...formData } : c,
				),
			);
		} else {
			const newCustomer = {
				id: customers.length + 1,
				...formData,
				status: 'Active',
			};
			setCustomers([...customers, newCustomer]);
		}
		handleCloseDialog();
	};

	const handleEdit = (customer) => {
		setEditingId(customer.id);
		setFormData({
			name: customer.name,
			email: customer.email,
			phone: customer.phone,
			address: customer.address,
		});
		setOpenDialog(true);
	};

	const handleDelete = (customer) => {
		setCustomers(customers.filter((c) => c.id !== customer.id));
	};

	return (
		<Box sx={{ pb: 5 }}>
			<PageHeader
				title="👥 Quản lý khách hàng"
				subtitle="Quản lý thông tin và giao dịch khách hàng"
				actionButton={{
					label: '➕ Thêm khách hàng',
					icon: <AddIcon />,
				}}
				onActionClick={handleAddClick}
				breadcrumbs={[
					{ label: '🏠 Trang chủ' },
					{ label: '👥 Khách hàng' },
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
								{customers.length}
							</Typography>
							<Typography variant="body2" sx={{ opacity: 0.9 }}>
								👥 Tổng khách hàng
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
									customers.filter(
										(c) => c.status === 'Active',
									).length
								}
							</Typography>
							<Typography variant="body2" sx={{ opacity: 0.9 }}>
								✅ Đang hoạt động
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
									customers.filter(
										(c) => c.status === 'Inactive',
									).length
								}
							</Typography>
							<Typography variant="body2" sx={{ opacity: 0.9 }}>
								❌ Không hoạt động
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
								{Math.round(Math.random() * 1000)}
							</Typography>
							<Typography variant="body2" sx={{ opacity: 0.9 }}>
								💰 Tổng doanh số
							</Typography>
						</Card>
					</Grid>
				</Grid>

				{/* Customer Table */}
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
							📋 Danh sách khách hàng
						</Typography>
						<Typography variant="caption" sx={{ color: '#666' }}>
							Quản lý và cập nhật thông tin khách hàng
						</Typography>
					</Box>
					<Box sx={{ p: 0 }}>
						<DataTable
							columns={columns}
							rows={customers}
							onEdit={handleEdit}
							onDelete={handleDelete}
							selectable={true}
						/>
					</Box>
				</Card>
			</Box>

			{/* Add/Edit Customer Dialog */}
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
					{editingId
						? '✏️ Sửa thông tin khách hàng'
						: '➕ Thêm khách hàng mới'}
				</DialogTitle>
				<DialogContent sx={{ pt: 3 }}>
					<Grid container spacing={2.5}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="👤 Tên đầy đủ"
								value={formData.name}
								onChange={(e) =>
									setFormData({
										...formData,
										name: e.target.value,
									})
								}
								placeholder="Nhập tên khách hàng"
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
								label="📧 Địa chỉ email"
								type="email"
								value={formData.email}
								onChange={(e) =>
									setFormData({
										...formData,
										email: e.target.value,
									})
								}
								placeholder="customer@example.com"
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
								label="📞 Số điện thoại"
								value={formData.phone}
								onChange={(e) =>
									setFormData({
										...formData,
										phone: e.target.value,
									})
								}
								placeholder="(+1) 123-456-7890"
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
								label="📍 Địa chỉ"
								value={formData.address}
								onChange={(e) =>
									setFormData({
										...formData,
										address: e.target.value,
									})
								}
								placeholder="Nhập địa chỉ đầy đủ"
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
						onClick={handleAddCustomer}
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
						{editingId ? '💾 Lưu' : '➕ Thêm'}
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default CustomerList;
