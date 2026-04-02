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
			sx={{
				borderTop: '1px solid #e0e0e0',
				p: 2,
				position: 'fixed',
				bottom: 0,
				left: 0,
				right: 0,
				width: '100%',
				backgroundColor: '#fff',
				zIndex: 10,
			}}
		>
			{/* Copyright */}
			<Typography variant="body2" color="textSecondary" align="center">
				© {currentYear} Flyway Inventory Management. Tất cả quyền được
				bảo lưu.
			</Typography>
		</Box>
	);
};

export default Footer;
