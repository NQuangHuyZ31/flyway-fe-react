import React, { useContext } from 'react';
import {
	AppBar,
	Toolbar,
	Badge,
	IconButton,
	Menu,
	MenuItem,
	Box,
	Avatar,
	Typography,
	useTheme,
} from '@mui/material';
import {
	Notifications as NotificationsIcon,
	Settings as SettingsIcon,
	Logout as LogoutIcon,
	LightMode as LightModeIcon,
	DarkMode as DarkModeIcon,
} from '@mui/icons-material';
import { ThemeContext } from '../contexts/ThemeContext';

const Header = () => {
	const theme = useTheme();
	const { mode, toggleTheme } = useContext(ThemeContext);
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		// Handle logout logic
		handleMenuClose();
	};

	return (
		<AppBar
			position="fixed"
			sx={{
				zIndex: theme.zIndex.drawer + 1,
				boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
			}}
		>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography variant="h6" sx={{ fontWeight: 'bold', flex: 1 }}>
					Warehouse Management System
				</Typography>

				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
					{/* Notifications */}
					<IconButton color="inherit" size="large">
						<Badge badgeContent={4} color="error">
							<NotificationsIcon />
						</Badge>
					</IconButton>

					{/* Theme Toggle */}
					<IconButton
						color="inherit"
						onClick={toggleTheme}
						size="large"
					>
						{mode === 'light' ? (
							<DarkModeIcon />
						) : (
							<LightModeIcon />
						)}
					</IconButton>

					{/* Settings */}
					<IconButton color="inherit" size="large">
						<SettingsIcon />
					</IconButton>

					{/* Profile Menu */}
					<IconButton
						onClick={handleProfileMenuOpen}
						size="small"
						sx={{ ml: 2 }}
					>
						<Avatar
							sx={{
								width: 32,
								height: 32,
								bgcolor: theme.palette.secondary.main,
								fontWeight: 'bold',
							}}
						>
							JD
						</Avatar>
					</IconButton>

					<Menu
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={Boolean(anchorEl)}
						onClose={handleMenuClose}
					>
						<MenuItem disabled>
							<Avatar sx={{ mr: 2, width: 32, height: 32 }}>
								JD
							</Avatar>
							John Doe
						</MenuItem>
						<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
						<MenuItem onClick={handleMenuClose}>Settings</MenuItem>
						<MenuItem onClick={handleLogout}>
							<LogoutIcon sx={{ mr: 1 }} fontSize="small" />
							Logout
						</MenuItem>
					</Menu>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
