import React, { useState } from 'react';
import {
	Drawer,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Collapse,
	useTheme,
	Box,
	Avatar,
	Typography,
	Divider,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuConfig from '../configs/menuConfig';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const menuItems = MenuConfig;
console.log('MenuConfig:', MenuConfig);

const Sidebar = ({ open = true, onDrawerToggle }) => {
	const theme = useTheme();
	const location = useLocation();
	const [openSubmenus, setOpenSubmenus] = useState(false);

	const handleSubmenuToggle = (label) => {
		setOpenSubmenus((prev) => (prev === label ? false : label));
	};

	const drawerContent = (
		<Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
			{/* Logo/Header Section */}
			<Box
				sx={{
					p: 3,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 2,
					borderBottom: `1px solid ${theme.palette.divider}`,
				}}
			>
				<Avatar
					sx={{
						width: 56,
						height: 56,
						bgcolor: theme.palette.primary.main,
						fontWeight: 'bold',
						fontSize: '1.5rem',
					}}
				>
					<img src="../assets/react.svg" alt="avatar" />
				</Avatar>
				<Typography
					variant="h6"
					sx={{ fontWeight: 'bold', textAlign: 'center' }}
				>
					WMS System
				</Typography>
				<Typography
					variant="caption"
					color="textSecondary"
					sx={{ textAlign: 'center' }}
				>
					Warehouse Management
				</Typography>
			</Box>

			{/* Navigation Items */}
			<List sx={{ flex: 1, py: 2, px: 1 }}>
				{menuItems.map((item) => (
					<React.Fragment key={item.label}>
						<ListItemButton
							component={RouterLink}
							to={item.path}
							onClick={() =>
								item.submenu && handleSubmenuToggle(item.label)
							}
						>
							<ListItemIcon>
								{item.icon && <item.icon />}
							</ListItemIcon>
							<ListItemText primary={item.label} />
							{item.submenu &&
								(openSubmenus === item.label ? (
									<ExpandLess />
								) : (
									<ExpandMore />
								))}
						</ListItemButton>

						{item.submenu && (
							<Collapse
								in={openSubmenus === item.label}
								timeout="auto"
								unmountOnExit
							>
								<List>
									{item.submenu.map((subItem) => (
										<ListItemButton
											key={subItem.label}
											component={RouterLink}
											to={subItem.path}
											sx={{ pl: 4 }}
										>
											<ListItemIcon>
												{subItem.icon && (
													<subItem.icon />
												)}
											</ListItemIcon>
											<ListItemText
												primary={subItem.label}
											/>
										</ListItemButton>
									))}
								</List>
							</Collapse>
						)}
					</React.Fragment>
				))}
			</List>

			{/* Footer Section */}
			<Divider />
			<Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
				<Typography variant="caption" color="textSecondary">
					© 2024 WMS System
				</Typography>
			</Box>
		</Box>
	);

	return (
		<Drawer
			variant="permanent"
			sx={{
				width: 280,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: 280,
					boxSizing: 'border-box',
					top: 64, // Height of AppBar
				},
			}}
		>
			{drawerContent}
		</Drawer>
	);
};

export default Sidebar;
