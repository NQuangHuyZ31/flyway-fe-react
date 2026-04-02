import React from 'react';
import {
	Box,
	Grid,
	useTheme,
	Typography,
	Card,
	CardContent,
} from '@mui/material';
import { StatsCard } from '../../components/common/Cards';
import {
	Inventory2 as InventoryIcon,
	TrendingUp as TrendingUpIcon,
	ShoppingCart as OrdersIcon,
	People as PeopleIcon,
	LocalShipping as ShippingIcon,
} from '@mui/icons-material';

const Dashboard = () => {
	const theme = useTheme();

	return (
		<Box
			sx={{
				width: '100%',
				backgroundColor: 'white',
				p: 3,
				boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
			}}
		>
			<Box
				sx={{
					borderBottom: '1px solid ' + theme.palette.divider,
					mb: 2,
				}}
			>
				<Typography
					variant="h4"
					ant="h4"
					sx={{
						fontWeight: 600,
						color: theme.palette.text.primary,
						mb: 1,
					}}
				>
					Bảng Điều Khiển
				</Typography>
			</Box>
			{/* Stats Cards */}
			<Grid container spacing={2} sx={{ mb: 4 }}>
				<Grid item xs={12} sm={6} md={3}>
					<StatsCard
						title="Tổng Sản Phẩm"
						value="2,548"
						trend="+12% tháng này"
						trendColor="success"
						icon={<InventoryIcon sx={{ fontSize: '2rem' }} />}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<StatsCard
						title="Đơn Hàng Chờ Xử Lý"
						value="284"
						trend="+5% tuần này"
						trendColor="warning"
						icon={<OrdersIcon sx={{ fontSize: '2rem' }} />}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<StatsCard
						title="Khách Hàng Hoạt Động"
						value="1,234"
						trend="+8% tháng này"
						trendColor="success"
						icon={<PeopleIcon sx={{ fontSize: '2rem' }} />}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<StatsCard
						title="Giá Trị Tồn Kho"
						value="$245,680"
						trend="+3% tháng này"
						trendColor="success"
						icon={<TrendingUpIcon sx={{ fontSize: '2rem' }} />}
					/>
				</Grid>
			</Grid>

			{/* Main Content */}
			<Grid container spacing={3}>
				{/* Biểu Đồ */}
				<Grid item xs={12} md={8}>
					<Card
						sx={{
							boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
							borderRadius: 2,
							height: '100%',
						}}
					>
						<CardContent>
							<Typography
								variant="h6"
								sx={{ fontWeight: 600, mb: 2 }}
							>
								📈 Xu Hướng Doanh Thu
							</Typography>
							<Box
								sx={{
									minHeight: 350,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									backgroundColor: '#f9f9f9',
									borderRadius: 1,
									color: theme.palette.text.secondary,
								}}
							>
								<Typography>
									Biểu đồ doanh thu - Chế độ Xem Trước
								</Typography>
							</Box>
						</CardContent>
					</Card>
				</Grid>

				{/* Hoạt Động Gần Đây */}
				<Grid item xs={12} md={4}>
					<Card
						sx={{
							boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
							borderRadius: 2,
							height: '100%',
						}}
					>
						<CardContent>
							<Typography
								variant="h6"
								sx={{ fontWeight: 600, mb: 2 }}
							>
								🔔 Hoạt Động Gần Đây
							</Typography>
							<Box
								sx={{
									minHeight: 350,
									display: 'flex',
									flexDirection: 'column',
									gap: 2,
								}}
							>
								<Box
									sx={{
										p: 2,
										backgroundColor:
											theme.palette.mode === 'dark'
												? '#2a2a2a'
												: '#f5f5f5',
										borderRadius: 1,
										borderLeft: `4px solid ${theme.palette.primary.main}`,
									}}
								>
									<Typography variant="body2">
										✓ Nhập thêm 150 sản phẩm
									</Typography>
									<Typography
										variant="caption"
										color="textSecondary"
									>
										5 phút trước
									</Typography>
								</Box>
								<Box
									sx={{
										p: 2,
										backgroundColor:
											theme.palette.mode === 'dark'
												? '#2a2a2a'
												: '#f5f5f5',
										borderRadius: 1,
										borderLeft: `4px solid ${theme.palette.success.main}`,
									}}
								>
									<Typography variant="body2">
										✓ Đơn hàng #1234 đã giao
									</Typography>
									<Typography
										variant="caption"
										color="textSecondary"
									>
										10 phút trước
									</Typography>
								</Box>
								<Box
									sx={{
										p: 2,
										backgroundColor:
											theme.palette.mode === 'dark'
												? '#2a2a2a'
												: '#f5f5f5',
										borderRadius: 1,
										borderLeft: `4px solid ${theme.palette.warning.main}`,
									}}
								>
									<Typography variant="body2">
										⚠ Cảnh báo: Sản phẩm sắp hết hàng
									</Typography>
									<Typography
										variant="caption"
										color="textSecondary"
									>
										1 giờ trước
									</Typography>
								</Box>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Dashboard;
