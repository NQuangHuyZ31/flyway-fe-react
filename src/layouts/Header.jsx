import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';
import AuthService from '../api/services/AuthService';
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
	Breadcrumbs,
	useTheme,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import './Header.css';

/**
 * Header Component
 * Main navigation header with breadcrumbs, theme toggle, and user menu
 * @component
 * @example
 * return <Header onMenuToggle={handleToggle} onThemeToggle={handleThemeToggle} />
 */
const Header = ({ onMenuToggle, onThemeToggle, isDarkMode }) => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const theme = useTheme();
	const [anchorEl, setAnchorEl] = useState(null);

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = async () => {
		handleMenuClose();
		try {
			await AuthService.logout();
			logout();
		} catch (error) {
			console.error('Logout failed:', error);
		}
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

	/**
	 * Generate breadcrumb items based on current route
	 * Maps route paths to human-readable labels
	 */
	const generateBreadcrumbs = () => {
		const pathnames = location.pathname.split('/').filter((x) => x);

		const breadcrumbMap = {
			products: 'Sản phẩm',
			create: 'Tạo mới',
			edit: 'Chỉnh sửa',
			detail: 'Chi tiết',
			inventory: 'Tồn kho',
			customers: 'Khách hàng',
			orders: 'Đơn hàng',
			quotations: 'Báo giá',
			warehouse: 'Kho',
			reports: 'Báo cáo',
			system: 'Hệ thống',
		};

		let breadcrumbs = [
			{ label: 'Trang chủ', path: '/', icon: <HomeIcon /> },
		];

		let currentPath = '';
		pathnames.forEach((name, index) => {
			currentPath += `/${name}`;
			const label = breadcrumbMap[name] || name;
			const isLast = index === pathnames.length - 1;

			if (!isLast) {
				breadcrumbs.push({ label, path: currentPath });
			} else {
				breadcrumbs.push({ label, path: null }); // Last item, no click
			}
		});

		return breadcrumbs;
	};

	const breadcrumbs = generateBreadcrumbs();

	return (
		<>
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

					{/* Theme Toggle Button */}
					<Tooltip title={isDarkMode ? 'Light mode' : 'Dark mode'}>
						<IconButton
							color="inherit"
							onClick={onThemeToggle}
							sx={{ mr: 2 }}
							aria-label="toggle theme"
						>
							{isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
						</IconButton>
					</Tooltip>

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
											boxShadow:
												'0 2px 8px rgba(0,0,0,0.2)',
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

				{/* Breadcrumb Navigation */}
				{location.pathname !== '/' && (
					<Box
						sx={{
							px: 2,
							py: 1,
							bgcolor:
								theme.palette.mode === 'dark'
									? 'rgba(0,0,0,0.2)'
									: 'rgba(255,255,255,0.1)',
							borderTop: `1px solid ${theme.palette.divider}`,
						}}
					>
						<Breadcrumbs
							separator={<NavigateNextIcon fontSize="small" />}
							aria-label="breadcrumb"
							sx={{ fontSize: '0.875rem' }}
						>
							{breadcrumbs.map((breadcrumb, index) => (
								<Box
									key={index}
									sx={{
										display: 'flex',
										alignItems: 'center',
										cursor: breadcrumb.path
											? 'pointer'
											: 'default',
										color: breadcrumb.path
											? 'inherit'
											: theme.palette.text.secondary,
										'&:hover': breadcrumb.path
											? {
													textDecoration: 'underline',
											  }
											: {},
									}}
									onClick={() => {
										if (breadcrumb.path) {
											navigate(breadcrumb.path);
										}
									}}
								>
									{breadcrumb.icon}
									<Typography
										sx={{ ml: breadcrumb.icon ? 1 : 0 }}
										variant="body2"
									>
										{breadcrumb.label}
									</Typography>
								</Box>
							))}
						</Breadcrumbs>
					</Box>
				)}
			</AppBar>
			{/* Spacer for fixed AppBar - accounting for both toolbar and breadcrumb */}
			<Box sx={{ height: 64 }} /> {/* Header toolbar height */}
			{location.pathname !== '/' && <Box sx={{ height: 40 }} />}{' '}
			{/* Breadcrumb height */}
		</>
	);
};

Header.propTypes = {
	onMenuToggle: PropTypes.func.isRequired,
	onThemeToggle: PropTypes.func,
	isDarkMode: PropTypes.bool,
};

Header.defaultProps = {
	onThemeToggle: () => {},
	isDarkMode: false,
};

export default Header;
