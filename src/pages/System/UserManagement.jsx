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
	Select,
	InputLabel,
	FormControl,
	MenuItem,
} from '@mui/material';
import {
	Add as AddIcon,
	Edit as EditIcon,
	Delete as DeleteIcon,
} from '@mui/icons-material';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const UserManagement = () => {
	const theme = useTheme();
	const [openDialog, setOpenDialog] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [users, setUsers] = useState([
		{
			id: 1,
			name: 'Admin User',
			email: 'admin@example.com',
			role: 'Administrator',
			status: 'Active',
		},
		{
			id: 2,
			name: 'Manager User',
			email: 'manager@example.com',
			role: 'Warehouse Manager',
			status: 'Active',
		},
		{
			id: 3,
			name: 'Staff User',
			email: 'staff@example.com',
			role: 'Staff',
			status: 'Inactive',
		},
		{
			id: 4,
			name: 'John Doe',
			email: 'john@example.com',
			role: 'Staff',
			status: 'Active',
		},
	]);

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		role: 'Staff',
	});

	const getRoleColor = (role) => {
		switch (role) {
			case 'Administrator':
				return 'error';
			case 'Warehouse Manager':
				return 'warning';
			case 'Staff':
				return 'success';
			default:
				return 'default';
		}
	};

	const getRoleLabel = (role) => {
		const labels = {
			Administrator: '👨‍💼 Quản trị viên',
			'Warehouse Manager': '📦 Quản lý kho',
			Staff: '👤 Nhân viên',
		};
		return labels[role] || role;
	};

	const getStatusLabel = (status) => {
		return status === 'Active' ? '✅ Hoạt động' : '❌ Không hoạt động';
	};

	const columns = [
		{ id: 'name', label: '👤 Tên nhân viên', align: 'left', width: '25%' },
		{ id: 'email', label: '📧 Email', align: 'left', width: '30%' },
		{
			id: 'role',
			label: '🔐 Chức vụ',
			align: 'center',
			width: '20%',
			render: (value) => (
				<Chip
					label={getRoleLabel(value)}
					color={getRoleColor(value)}
					size="small"
					sx={{ fontWeight: 600 }}
				/>
			),
		},
		{
			id: 'status',
			label: '📊 Trạng thái',
			align: 'center',
			width: '15%',
			render: (value) => (
				<Chip
					label={getStatusLabel(value)}
					color={value === 'Active' ? 'success' : 'default'}
					size="small"
					sx={{ fontWeight: 600 }}
				/>
			),
		},
	];

	const handleAddClick = () => {
		setEditingId(null);
		setFormData({ name: '', email: '', role: 'Staff' });
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
		setEditingId(null);
		setFormData({ name: '', email: '', role: 'Staff' });
	};

	const handleAddUser = () => {
		if (editingId) {
			setUsers(
				users.map((u) =>
					u.id === editingId ? { ...u, ...formData } : u,
				),
			);
		} else {
			const newUser = {
				id: users.length + 1,
				...formData,
				status: 'Active',
			};
			setUsers([...users, newUser]);
		}
		handleCloseDialog();
	};

	const handleEdit = (user) => {
		setEditingId(user.id);
		setFormData({
			name: user.name,
			email: user.email,
			role: user.role,
		});
		setOpenDialog(true);
	};

	const handleDelete = (user) => {
		setUsers(users.filter((u) => u.id !== user.id));
	};

	return (
		<Box sx={{ pb: 5 }}>
			<PageHeader
				title="👥 Quản lý người dùng"
				subtitle="Quản lý tài khoản và quyền truy cập hệ thống"
				actionButton={{
					label: '➕ Thêm người dùng',
					icon: <AddIcon />,
				}}
				onActionClick={handleAddClick}
				breadcrumbs={[
					{ label: '🏠 Trang chủ' },
					{ label: '⚙️ Hệ thống' },
					{ label: '👥 Người dùng' },
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
								{users.length}
							</Typography>
							<Typography variant="body2" sx={{ opacity: 0.9 }}>
								👥 Tổng người dùng
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
									users.filter((u) => u.status === 'Active')
										.length
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
									users.filter(
										(u) => u.role === 'Administrator',
									).length
								}
							</Typography>
							<Typography variant="body2" sx={{ opacity: 0.9 }}>
								👨‍💼 Quản trị viên
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
								{
									users.filter((u) => u.status === 'Inactive')
										.length
								}
							</Typography>
							<Typography variant="body2" sx={{ opacity: 0.9 }}>
								❌ Không hoạt động
							</Typography>
						</Card>
					</Grid>
				</Grid>

				{/* User Table */}
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
							📋 Danh sách người dùng
						</Typography>
						<Typography variant="caption" sx={{ color: '#666' }}>
							Quản lý và cập nhật thông tin người dùng hệ thống
						</Typography>
					</Box>
					<Box sx={{ p: 0 }}>
						<DataTable
							columns={columns}
							rows={users}
							onDelete={handleDelete}
							onEdit={handleEdit}
							selectable={true}
						/>
					</Box>
				</Card>
			</Box>

			{/* Add/Edit User Dialog */}
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
					{editingId
						? '✏️ Sửa thông tin người dùng'
						: '➕ Thêm người dùng mới'}
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
								placeholder="Nhập tên người dùng"
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
								placeholder="user@example.com"
								sx={{
									'& .MuiOutlinedInput-root': {
										borderRadius: 1.5,
									},
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth>
								<InputLabel>🔐 Chức vụ</InputLabel>
								<Select
									value={formData.role}
									onChange={(e) =>
										setFormData({
											...formData,
											role: e.target.value,
										})
									}
									label="🔐 Chức vụ"
									sx={{
										borderRadius: 1.5,
									}}
								>
									<MenuItem value="Administrator">
										👨‍💼 Quản trị viên
									</MenuItem>
									<MenuItem value="Warehouse Manager">
										📦 Quản lý kho
									</MenuItem>
									<MenuItem value="Staff">
										👤 Nhân viên
									</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						{!editingId && (
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="🔑 Mật khẩu tạm thời"
									type="password"
									value="GeneratedPassword123!"
									disabled
									sx={{
										'& .MuiOutlinedInput-root': {
											borderRadius: 1.5,
										},
									}}
								/>
								<Typography
									variant="caption"
									sx={{
										color: '#666',
										mt: 1,
										display: 'block',
									}}
								>
									Mật khẩu sẽ được gửi cho người dùng qua
									email
								</Typography>
							</Grid>
						)}
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
						onClick={handleAddUser}
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
						{editingId ? '💾 Lưu' : '➕ Thêm'}
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default UserManagement;
