import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Collapse,
	Box,
	Typography,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import MenuConfig from '../configs/menuConfig';
import './Sidebar.css';

/**
 * Sidebar Component
 * Navigation sidebar with menu items and submenu support
 */
const Sidebar = ({ isOpen, onClose }) => {
	return (
		<Drawer
			variant="temporary"
			open={isOpen}
			onClose={onClose}
			sx={{
				width: 250,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: 250,
					boxSizing: 'border-box',
					mt: 8,
					bgcolor: '#f7f9fc',
					borderRight: '1px solid #e0e0e0',
				},
			}}
		>
			<Box sx={{ p: 2 }}>
				<Typography
					variant="subtitle2"
					sx={{
						pl: 2,
						color: '#666',
						fontSize: '11px',
						fontWeight: 700,
						textTransform: 'uppercase',
						letterSpacing: 1,
						mb: 2,
					}}
				>
					Menu
				</Typography>
				<List className="sidebar-menu"></List>
			</Box>
		</Drawer>
	);
};

export default Sidebar;
