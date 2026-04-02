import React, { useState } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import './MainLayout.css';

/**
 * MainLayout Component
 * Main layout wrapper with header, sidebar, footer, and content area
 */
const MainLayout = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const handleSidebarToggle = () => {
		setSidebarOpen(!sidebarOpen);
	};

	const handleSidebarClose = () => {
		setSidebarOpen(false);
	};

	return (
		<Box className="main-layout">
			{/* Header */}
			<Header onMenuToggle={handleSidebarToggle} />

			{/* Main Content Area */}
			<Box className="layout-container">
				{/* Sidebar */}
				<Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />

				{/* Content */}
				<Box className="layout-content">{children}</Box>
			</Box>

			{/* Footer */}
			<Footer />
		</Box>
	);
};

export default MainLayout;
