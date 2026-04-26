import React, { useState } from 'react';
import {
	Box,
	Container,
	TextField,
	Button,
	Typography,
	Alert,
	Card,
	CardContent,
	Grid,
	useTheme,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import auth from '@/api/services/authService';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const { setCurrentUser } = useAuth();
	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
		type: 'email',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCredentials((prev) => ({ ...prev, [name]: value }));
	};

	const handleLogin = async () => {
		setLoading(true);
		try {
			const res = await auth.login(credentials);

			if (res?.data?.token) {
				localStorage.setItem('token', res.data.token);

				try {
					const user = await auth.getCurrentUser();
					setCurrentUser(user.data);
				} catch (error) {
					console.error(
						'Failed to fetch user info after login:',
						error,
					);
				}

				navigate('/');
			}
			setError('');
		} catch (error) {
			setError(error?.message || 'Đăng nhập thất bại');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
			}}
		>
			<Container maxWidth="sm">
				<Grid container spacing={3} sx={{ mb: 4 }}>
					<Grid
						item
						xs={12}
						sx={{ textAlign: 'center', color: 'white' }}
					></Grid>
				</Grid>

				<Card elevation={24}>
					<CardContent
						sx={{
							p: 4,
							display: 'flex',
							flexDirection: 'column',
							gap: 3,
						}}
					>
						{/* Header */}
						<Box sx={{ textAlign: 'center', mb: 2 }}>
							<Box
								sx={{
									width: 80,
									height: 80,
									margin: '0 auto 16px',
									backgroundColor:
										theme.palette.primary.light,
									borderRadius: '50%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: theme.palette.primary.main,
									fontSize: '2rem',
								}}
							>
								<LoginIcon sx={{ fontSize: '2.5rem' }} />
							</Box>
							<Typography
								variant="h4"
								sx={{ fontWeight: 'bold', mb: 1 }}
							>
								Chào mừng trở lại!
							</Typography>
							<Typography variant="body2" color="textSecondary">
								Đăng nhập để tiếp tục
							</Typography>
						</Box>

						{/* Error Message */}
						{error && (
							<Alert
								severity="error"
								onClose={() => setError('')}
							>
								{error}
							</Alert>
						)}

						{/* Form Fields */}
						<TextField
							fullWidth
							label="Email Address"
							type="email"
							name="email"
							value={credentials.email}
							onChange={handleChange}
							placeholder="admin@example.com"
							variant="outlined"
						/>

						<TextField
							fullWidth
							label="Password"
							type="password"
							name="password"
							value={credentials.password}
							onChange={handleChange}
							placeholder="••••••••"
							variant="outlined"
						/>

						{/* Remember me and Forgot password */}
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						></Box>

						{/* Login Button */}
						<Button
							fullWidth
							variant="contained"
							color="primary"
							size="large"
							onClick={handleLogin}
							sx={{
								py: 1.5,
								fontWeight: 'bold',
								fontSize: '1rem',
							}}
						>
							Đăng nhập
						</Button>
					</CardContent>
				</Card>
				<LoadingSpinner
					loading={loading}
					message="Đang đăng nhập..."
					fullHeight={false}
				/>
				{/* Footer */}
				<Box sx={{ mt: 3, textAlign: 'center', color: 'white' }}>
					<Typography variant="body2">
						© 2024 Warehouse Management System. All rights reserved.
					</Typography>
				</Box>
			</Container>
		</Box>
	);
};

export default LoginPage;
