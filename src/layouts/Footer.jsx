import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';
import './Footer.css';

/**
 * Footer Component
 * Application footer with links and information
 */
const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<Box
			component="footer"
			className="footer"
			sx={{
				bgcolor: '#f5f5f5',
				py: 4,
				mt: 'auto',
				borderTop: '1px solid #e0e0e0',
			}}
		>
			<Container maxWidth="lg">
				<Grid container spacing={4} sx={{ mb: 4 }}>
					{/* About Section */}
					<Grid item xs={12} sm={6} md={3}>
						<Typography
							variant="h6"
							sx={{ fontWeight: 600, mb: 2 }}
						>
							Flyway Inventory
						</Typography>
						<Typography variant="body2" color="textSecondary">
							Hệ thống quản lý kho hàng hiện đại và hiệu quả cho
							doanh nghiệp của bạn.
						</Typography>
					</Grid>

					{/* Quick Links */}
					<Grid item xs={12} sm={6} md={3}>
						<Typography
							variant="subtitle2"
							sx={{ fontWeight: 600, mb: 2 }}
						>
							Liên kết nhanh
						</Typography>
						<Box component="nav">
							<Link
								href="/dashboard"
								underline="none"
								display="block"
								sx={{ mb: 1, color: '#666' }}
							>
								Dashboard
							</Link>
							<Link
								href="/products"
								underline="none"
								display="block"
								sx={{ mb: 1, color: '#666' }}
							>
								Sản phẩm
							</Link>
							<Link
								href="/inventory"
								underline="none"
								display="block"
								color="textSecondary"
							>
								Kho hàng
							</Link>
						</Box>
					</Grid>

					{/* Support */}
					<Grid item xs={12} sm={6} md={3}>
						<Typography
							variant="subtitle2"
							sx={{ fontWeight: 600, mb: 2 }}
						>
							Hỗ trợ
						</Typography>
						<Box component="nav">
							<Link
								href="mailto:support@flyway.com"
								underline="none"
								display="block"
								sx={{ mb: 1, color: '#666' }}
							>
								Email: support@flyway.com
							</Link>
							<Link
								href="tel:+84123456789"
								underline="none"
								display="block"
								color="textSecondary"
							>
								Hotline: +84 (0) 123 456 789
							</Link>
						</Box>
					</Grid>

					{/* Legal */}
					<Grid item xs={12} sm={6} md={3}>
						<Typography
							variant="subtitle2"
							sx={{ fontWeight: 600, mb: 2 }}
						>
							Pháp lý
						</Typography>
						<Box component="nav">
							<Link
								href="/privacy"
								underline="none"
								display="block"
								sx={{ mb: 1, color: '#666' }}
							>
								Chính sách bảo mật
							</Link>
							<Link
								href="/terms"
								underline="none"
								display="block"
								color="textSecondary"
							>
								Điều khoản sử dụng
							</Link>
						</Box>
					</Grid>
				</Grid>

				{/* Divider */}
				<Box sx={{ borderTop: '1px solid #e0e0e0', pt: 3 }}>
					{/* Copyright */}
					<Typography
						variant="body2"
						color="textSecondary"
						align="center"
					>
						© {currentYear} Flyway Inventory Management. Tất cả
						quyền được bảo lưu.
					</Typography>
				</Box>
			</Container>
		</Box>
	);
};

export default Footer;
