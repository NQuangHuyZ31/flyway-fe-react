import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
	Drawer,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Collapse,
	Box,
	ListSubheader,
} from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import MenuConfig from '../configs/menuConfig';
import './Sidebar.css';

/**
 * Sidebar Component
 * Navigation sidebar with menu items and submenu support
 */
const Sidebar = ({ isOpen, onClose }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [openSubmenu, setOpenSubmenu] = useState(null);

	const handleSubmenuToggle = (index) => {
		setOpenSubmenu(openSubmenu === index ? null : index);
	};

	const handleItemClick = (path) => {
		if (path) {
			navigate(path);
			onClose();
		}
	};

	const isActive = (path) => location.pathname === path;
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
				<List
					sx={{
						width: '100%',
						maxWidth: 360,
						bgcolor: 'background.paper',
					}}
					component="nav"
					aria-labelledby="nested-list-subheader"
					subheader={
						<ListSubheader
							component="div"
							id="nested-list-subheader"
						>
							Menu
						</ListSubheader>
					}
				>
					{MenuConfig.map((item, index) => (
						<React.Fragment key={index}>
							{/* Item với submenu */}
							{item.submenu ? (
								<>
									<ListItemButton
										onClick={() =>
											handleSubmenuToggle(index)
										}
										sx={{
											bgcolor: isActive(item.path)
												? '#e3f2fd'
												: 'transparent',
										}}
									>
										<ListItemIcon>
											<item.icon />
										</ListItemIcon>
										<ListItemText primary={item.label} />
										{openSubmenu === index ? (
											<ExpandLess />
										) : (
											<ExpandMore />
										)}
									</ListItemButton>

									{/* Submenu */}
									<Collapse
										in={openSubmenu === index}
										timeout="auto"
										unmountOnExit
									>
										<List component="div" disablePadding>
											{item.submenu.map(
												(subitem, subindex) => (
													<ListItemButton
														key={subindex}
														sx={{
															pl: 4,
															bgcolor: isActive(
																subitem.path,
															)
																? '#e3f2fd'
																: 'transparent',
														}}
														onClick={() =>
															handleItemClick(
																subitem.path,
															)
														}
													>
														<ListItemText
															primary={
																subitem.label
															}
														/>
													</ListItemButton>
												),
											)}
										</List>
									</Collapse>
								</>
							) : (
								/* Item đơn giản (không submenu) */
								<ListItemButton
									onClick={() => handleItemClick(item.path)}
									sx={{
										bgcolor: isActive(item.path)
											? '#e3f2fd'
											: 'transparent',
										'&:hover': {
											bgcolor: '#f0f0f0',
										},
									}}
								>
									<ListItemIcon>
										<item.icon />
									</ListItemIcon>
									<ListItemText primary={item.label} />
								</ListItemButton>
							)}
						</React.Fragment>
					))}
				</List>
			</Box>
		</Drawer>
	);
};

export default Sidebar;
