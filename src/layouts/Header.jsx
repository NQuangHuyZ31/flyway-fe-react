import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	AppBar,
	Toolbar,
	Typography,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Avatar,
	Tooltip,
} from '@mui/material';
import {
	Logout as LogoutIcon,
	Settings as SettingsIcon,
	Menu as MenuIcon,
} from '@mui/icons-material';
import { useToast } from '../contexts/ToastContext';
import './Header.css';
import { useAuth } from '../contexts/AuthContext';

/**
 * Header Component
 * Main navigation header with user menu
 */
const Header = ({ onMenuToggle }) => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { showToast } = useToast();
	const [anchorEl, setAnchorEl] = useState(null);

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = async () => {
		try {
			dispatch(logout());
			localStorage.removeItem('token');
			showToast('Đã đăng xuất thành công', 'success');
			navigate('/login', { replace: true });
		} catch (error) {
			showToast('Lỗi khi đăng xuất', 'error');
		}
		handleMenuClose();
	};

	const handleSettings = () => {
		navigate('/settings');
		handleMenuClose();
	};

	const getInitials = (name) => {
		if (!name) return 'U';
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	};

	return (
		<AppBar position="fixed" className="header">
			<Toolbar className="header-toolbar">
				{/* Menu Toggle Button */}
				<IconButton
					color="inherit"
					aria-label="toggle menu"
					onClick={onMenuToggle}
					className="menu-toggle-btn"
					sx={{ mr: 2 }}
				>
					<MenuIcon />
				</IconButton>

				{/* App Title */}
				<Typography
					variant="h6"
					component="div"
					sx={{
						flexGrow: 1,
						fontWeight: 600,
						fontSize: '20px',
						letterSpacing: '0.5px',
					}}
				>
					Flyway Inventory
				</Typography>

				{/* User Menu */}
				<Box className="user-menu">
					<Typography variant="body2" sx={{ mr: 2 }}>
						{user?.name || 'Guest'}
					</Typography>

					<Tooltip title="Account settings">
						<IconButton
							onClick={handleMenuOpen}
							size="small"
							sx={{ ml: 2 }}
						>
							<Avatar
								sx={{
									width: 36,
									height: 36,
									bgcolor: '#3f51b5',
									fontSize: '14px',
									fontWeight: 600,
									cursor: 'pointer',
									transition: 'all 0.3s ease',
									'&:hover': {
										boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
									},
								}}
							>
								{getInitials(user?.name)}
							</Avatar>
						</IconButton>
					</Tooltip>

					{/* Dropdown Menu */}
					<Menu
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={handleMenuClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
					>
						<MenuItem onClick={handleSettings}>
							<SettingsIcon fontSize="small" sx={{ mr: 1 }} />
							Cài đặt
						</MenuItem>
						<MenuItem onClick={handleLogout}>
							<LogoutIcon fontSize="small" sx={{ mr: 1 }} />
							Đăng xuất
						</MenuItem>
					</Menu>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
