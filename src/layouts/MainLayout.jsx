import React, { useState, useContext } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { ThemeContext } from '../contexts/ThemeContext';
import './MainLayout.css';

/**
 * MainLayout Component
 * Main layout wrapper with header, sidebar, footer, and content area
 * Provides theme context and responsive layout
 * @component
 */
const MainLayout = ({ children }) => {
	const { mode, toggleTheme } = useContext(ThemeContext);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const handleSidebarToggle = () => {
		setSidebarOpen(!sidebarOpen);
	};

	const handleSidebarClose = () => {
		setSidebarOpen(false);
	};

	return (
		<Box className="main-layout">
			{/* Header with theme toggle */}
			<Header 
				onMenuToggle={handleSidebarToggle}
				onThemeToggle={toggleTheme}
				isDarkMode={mode === 'dark'}
			/>

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
