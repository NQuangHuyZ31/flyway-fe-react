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
	const navigate = useNavigate();
	const location = useLocation();
	const [expandedMenu, setExpandedMenu] = useState(null);

	const handleMenuClick = (item) => {
		if (item.submenu) {
			// Toggle submenu expansion
			setExpandedMenu(expandedMenu === item.label ? null : item.label);
		} else if (item.path) {
			// Navigate to path
			navigate(item.path);
			onClose();
		}
	};

	const isMenuActive = (item) => {
		if (item.path) {
			return location.pathname === item.path;
		}
		if (item.submenu) {
			return item.submenu.some((sub) => sub.path === location.pathname);
		}
		return false;
	};

	const isSubmenuActive = (path) => {
		return location.pathname === path;
	};

	const renderMenuItems = () => {
		return MenuConfig.map((item) => {
			const IconComponent = item.icon;

			if (item.submenu && item.submenu.length > 0) {
				return (
					<div key={item.label}>
						<ListItem
							disablePadding
							className={`menu-item ${
								isMenuActive(item) ? 'active' : ''
							}`}
						>
							<ListItemButton
								onClick={() => handleMenuClick(item)}
								sx={{
									pl: 2,
									'&:hover': {
										bgcolor: 'rgba(63, 81, 181, 0.1)',
									},
								}}
							>
								<ListItemIcon sx={{ minWidth: 40 }}>
									<IconComponent
										sx={{
											color: isMenuActive(item)
												? '#3f51b5'
												: 'inherit',
										}}
									/>
								</ListItemIcon>
								<ListItemText
									primary={item.label}
									primaryTypographyProps={{
										fontSize: '14px',
										fontWeight: isMenuActive(item)
											? 600
											: 500,
									}}
								/>
								{expandedMenu === item.label ? (
									<ExpandLess fontSize="small" />
								) : (
									<ExpandMore fontSize="small" />
								)}
							</ListItemButton>
						</ListItem>

						{/* Submenu */}
						<Collapse
							in={expandedMenu === item.label}
							timeout="auto"
							unmountOnExit
						>
							<List component="div" disablePadding>
								{item.submenu.map((subitem) => (
									<ListItem
										key={subitem.path}
										disablePadding
										className={`submenu-item ${
											isSubmenuActive(subitem.path)
												? 'active'
												: ''
										}`}
									>
										<ListItemButton
											onClick={() => {
												navigate(subitem.path);
												onClose();
											}}
											sx={{
												pl: 6,
												bgcolor: isSubmenuActive(
													subitem.path,
												)
													? 'rgba(63, 81, 181, 0.15)'
													: 'transparent',
												'&:hover': {
													bgcolor:
														'rgba(63, 81, 181, 0.1)',
												},
												borderLeft: isSubmenuActive(
													subitem.path,
												)
													? '3px solid #3f51b5'
													: 'none',
											}}
										>
											<ListItemText
												primary={subitem.label}
												primaryTypographyProps={{
													fontSize: '13px',
													fontWeight: isSubmenuActive(
														subitem.path,
													)
														? 600
														: 400,
													color: isSubmenuActive(
														subitem.path,
													)
														? '#3f51b5'
														: 'inherit',
												}}
											/>
										</ListItemButton>
									</ListItem>
								))}
							</List>
						</Collapse>
					</div>
				);
			}

			// Regular menu item without submenu
			return (
				<ListItem
					key={item.path}
					disablePadding
					className={`menu-item ${
						isMenuActive(item) ? 'active' : ''
					}`}
				>
					<ListItemButton
						onClick={() => handleMenuClick(item)}
						sx={{
							pl: 2,
							bgcolor: isMenuActive(item)
								? 'rgba(63, 81, 181, 0.1)'
								: 'transparent',
							'&:hover': {
								bgcolor: 'rgba(63, 81, 181, 0.1)',
							},
							borderLeft: isMenuActive(item)
								? '3px solid #3f51b5'
								: 'none',
						}}
					>
						<ListItemIcon sx={{ minWidth: 40 }}>
							<IconComponent
								sx={{
									color: isMenuActive(item)
										? '#3f51b5'
										: 'inherit',
								}}
							/>
						</ListItemIcon>
						<ListItemText
							primary={item.label}
							primaryTypographyProps={{
								fontSize: '14px',
								fontWeight: isMenuActive(item) ? 600 : 500,
								color: isMenuActive(item)
									? '#3f51b5'
									: 'inherit',
							}}
						/>
					</ListItemButton>
				</ListItem>
			);
		});
	};

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
				<List className="sidebar-menu">{renderMenuItems()}</List>
			</Box>
		</Drawer>
	);
};

export default Sidebar;
