import React, { useState } from 'react';
import {
	Box,
	Button,
	Grid,
	useTheme,
	Paper,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Card,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Chip,
} from '@mui/material';
import PageHeader from '../../components/common/PageHeader';

const Reports = () => {
	const theme = useTheme();
	const [reportType, setReportType] = useState('inventory');
	const [dateRange, setDateRange] = useState('month');

	// Sample report data
	const reportStats = {
		totalOrders: 156,
		totalRevenue: 45250000, // VND
		totalProducts: 234,
		totalCustomers: 89,
		completedOrders: 142,
		pendingOrders: 14,
	};

	// Sample table data for reports
	const reportData = [
		{
			id: 1,
			product: 'Laptop Dell XPS 13',
			category: 'Điện tử',
			quantity: 45,
			revenue: 22500000,
			status: 'Trending',
		},
		{
			id: 2,
			product: 'Office Chair Pro',
			category: 'Nội thất',
			quantity: 32,
			revenue: 8000000,
			status: 'Normal',
		},
		{
			id: 3,
			product: 'Air Conditioner',
			category: 'Điện gia dụng',
			quantity: 28,
			revenue: 7840000,
			status: 'Trending',
		},
		{
			id: 4,
			product: 'Monitor 4K',
			category: 'Điện tử',
			quantity: 18,
			revenue: 6910000,
			status: 'Normal',
		},
	];

	return (
		<Box sx={{ pb: 5 }}>
			<PageHeader
				title="📊 Báo cáo"
				subtitle="Xem và tạo báo cáo chi tiết hệ thống"
				breadcrumbs={[
					{ label: '🏠 Trang chủ' },
					{ label: '📊 Báo cáo' },
				]}
			/>

			{/* Quick Stats */}
			<Grid container spacing={2.5} sx={{ mt: 1, mb: 3 }}>
				{/* Total Orders */}
				<Grid item xs={12} sm={6} md={3}>
					<Card
						sx={{
							p: 2.5,
							borderRadius: 2,
							background:
								'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
							color: 'white',
							boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
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
							🛒 Tổng đơn hàng
						</Typography>
						<Typography
							variant="h4"
							sx={{ fontWeight: 700, mt: 1, fontSize: '2rem' }}
						>
							{reportStats.totalOrders}
						</Typography>
					</Card>
				</Grid>

				{/* Total Revenue */}
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
								boxShadow: '0 8px 20px rgba(245, 87, 108, 0.5)',
							},
						}}
					>
						<Typography
							variant="caption"
							sx={{ opacity: 0.9, fontWeight: 600 }}
						>
							💰 Doanh số
						</Typography>
						<Typography
							variant="h5"
							sx={{ fontWeight: 700, mt: 1, fontSize: '1.4rem' }}
						>
							{(reportStats.totalRevenue / 1000000).toFixed(1)}M ₫
						</Typography>
					</Card>
				</Grid>

				{/* Total Products */}
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
								boxShadow: '0 8px 20px rgba(79, 172, 254, 0.5)',
							},
						}}
					>
						<Typography
							variant="caption"
							sx={{ opacity: 0.9, fontWeight: 600 }}
						>
							📦 Tổng sản phẩm
						</Typography>
						<Typography
							variant="h4"
							sx={{ fontWeight: 700, mt: 1, fontSize: '2rem' }}
						>
							{reportStats.totalProducts}
						</Typography>
					</Card>
				</Grid>

				{/* Total Customers */}
				<Grid item xs={12} sm={6} md={3}>
					<Card
						sx={{
							p: 2.5,
							borderRadius: 2,
							background:
								'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
							color: 'white',
							boxShadow: '0 4px 12px rgba(250, 112, 154, 0.3)',
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
							👥 Khách hàng
						</Typography>
						<Typography
							variant="h4"
							sx={{ fontWeight: 700, mt: 1, fontSize: '2rem' }}
						>
							{reportStats.totalCustomers}
						</Typography>
					</Card>
				</Grid>
			</Grid>

			{/* Report Filters */}
			<Card
				sx={{
					p: 3,
					mb: 3,
					borderRadius: 2,
					boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
				}}
			>
				<Box sx={{ mb: 2 }}>
					<Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
						⚙️ Tùy chỉnh báo cáo
					</Typography>
				</Box>
				<Grid container spacing={2.5} alignItems="center">
					<Grid item xs={12} sm={6} md={3}>
						<FormControl fullWidth>
							<InputLabel>Loại báo cáo</InputLabel>
							<Select
								value={reportType}
								onChange={(e) => setReportType(e.target.value)}
								label="Loại báo cáo"
								sx={{
									'& .MuiOutlinedInput-root': {
										borderRadius: 1.5,
									},
								}}
							>
								<MenuItem value="inventory">
									📦 Báo cáo kho
								</MenuItem>
								<MenuItem value="sales">
									🛒 Báo cáo bán hàng
								</MenuItem>
								<MenuItem value="orders">
									📋 Báo cáo đơn hàng
								</MenuItem>
								<MenuItem value="revenue">
									💰 Báo cáo doanh số
								</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<FormControl fullWidth>
							<InputLabel>Khoảng thời gian</InputLabel>
							<Select
								value={dateRange}
								onChange={(e) => setDateRange(e.target.value)}
								label="Khoảng thời gian"
								sx={{
									'& .MuiOutlinedInput-root': {
										borderRadius: 1.5,
									},
								}}
							>
								<MenuItem value="week">📅 7 ngày qua</MenuItem>
								<MenuItem value="month">
									📅 30 ngày qua
								</MenuItem>
								<MenuItem value="quarter">
									📅 Quý gần nhất
								</MenuItem>
								<MenuItem value="year">📅 Năm qua</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<TextField
							fullWidth
							label="📅 Từ ngày"
							type="date"
							InputLabelProps={{ shrink: true }}
							sx={{
								'& .MuiOutlinedInput-root': {
									borderRadius: 1.5,
								},
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<TextField
							fullWidth
							label="📅 Đến ngày"
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
						<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
							<Button
								variant="contained"
								sx={{
									background:
										'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
									textTransform: 'none',
									fontWeight: 600,
									borderRadius: 1,
									px: 3,
									boxShadow:
										'0 4px 12px rgba(102, 126, 234, 0.4)',
									'&:hover': {
										boxShadow:
											'0 6px 16px rgba(102, 126, 234, 0.6)',
										transform: 'translateY(-2px)',
									},
									transition: 'all 0.3s ease',
								}}
							>
								📊 Tạo báo cáo
							</Button>
							<Button
								variant="outlined"
								sx={{
									textTransform: 'none',
									fontWeight: 600,
									borderRadius: 1,
									px: 3,
									borderColor: '#667eea',
									color: '#667eea',
									'&:hover': {
										backgroundColor:
											'rgba(102, 126, 234, 0.05)',
										borderColor: '#667eea',
									},
								}}
							>
								📄 Xuất PDF
							</Button>
							<Button
								variant="outlined"
								sx={{
									textTransform: 'none',
									fontWeight: 600,
									borderRadius: 1,
									px: 3,
									borderColor: '#667eea',
									color: '#667eea',
									'&:hover': {
										backgroundColor:
											'rgba(102, 126, 234, 0.05)',
										borderColor: '#667eea',
									},
								}}
							>
								📊 Xuất Excel
							</Button>
						</Box>
					</Grid>
				</Grid>
			</Card>

			{/* Report Content */}
			<Card
				sx={{
					borderRadius: 2,
					boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
					overflow: 'hidden',
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
						📊 Dữ liệu báo cáo
					</Typography>
					<Typography variant="caption" sx={{ color: '#666' }}>
						Danh sách sản phẩm bán chạy trong khoảng thời gian chọn
					</Typography>
				</Box>
				<TableContainer>
					<Table sx={{ minWidth: 700 }}>
						<TableHead>
							<TableRow
								sx={{
									backgroundColor: '#f5f7fa',
									'& th': {
										fontWeight: 700,
										color: '#1a1a1a',
										fontSize: '0.95rem',
									},
								}}
							>
								<TableCell>📦 Sản phẩm</TableCell>
								<TableCell>🏷️ Danh mục</TableCell>
								<TableCell align="center">
									📊 Số lượng
								</TableCell>
								<TableCell align="right">💰 Doanh số</TableCell>
								<TableCell align="center">
									📈 Trạng thái
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{reportData.map((row) => (
								<TableRow
									key={row.id}
									sx={{
										'&:hover': {
											backgroundColor: '#f5f7fa',
										},
										borderBottom: '1px solid #e0e0e0',
										transition:
											'background-color 0.2s ease',
									}}
								>
									<TableCell sx={{ fontWeight: 500 }}>
										{row.product}
									</TableCell>
									<TableCell>{row.category}</TableCell>
									<TableCell
										align="center"
										sx={{ fontWeight: 600 }}
									>
										{row.quantity}
									</TableCell>
									<TableCell
										align="right"
										sx={{
											fontWeight: 600,
											color: '#667eea',
										}}
									>
										{(row.revenue / 1000000).toFixed(1)}M ₫
									</TableCell>
									<TableCell align="center">
										<Chip
											label={
												row.status === 'Trending'
													? '🔥 Bán chạy'
													: '📊 Bình thường'
											}
											color={
												row.status === 'Trending'
													? 'error'
													: 'default'
											}
											size="small"
											sx={{ fontWeight: 600 }}
										/>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Card>
		</Box>
	);
};

export default Reports;
