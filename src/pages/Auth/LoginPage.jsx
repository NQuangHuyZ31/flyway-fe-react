import React, { useState } from 'react';
import {
	Box,
	Container,
	Paper,
	TextField,
	Button,
	Typography,
	Alert,
	useTheme,
	Card,
	CardContent,
	Grid,
} from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';

const LoginPage = () => {
	const theme = useTheme();
	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCredentials((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleLogin = () => {
		if (!credentials.email || !credentials.password) {
			setError('Please fill in all fields');
			return;
		}
		// Handle login logic
		console.log('Login attempt with:', credentials);
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
								Welcome Back
							</Typography>
							<Typography variant="body2" color="textSecondary">
								Sign in to your account to continue
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
						>
							<Typography
								variant="body2"
								sx={{
									cursor: 'pointer',
									color: theme.palette.primary.main,
									'&:hover': { textDecoration: 'underline' },
								}}
							>
								Remember me
							</Typography>
							<Typography
								variant="body2"
								sx={{
									cursor: 'pointer',
									color: theme.palette.primary.main,
									'&:hover': { textDecoration: 'underline' },
								}}
							>
								Forgot password?
							</Typography>
						</Box>

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
							Sign In
						</Button>

						{/* Demo Credentials */}
						<Paper
							elevation={0}
							sx={{
								p: 2,
								backgroundColor:
									theme.palette.mode === 'light'
										? theme.palette.grey[50]
										: theme.palette.grey[800],
								borderRadius: 1,
							}}
						>
							<Typography
								variant="caption"
								display="block"
								sx={{ fontWeight: 'bold', mb: 1 }}
							>
								Demo Credentials:
							</Typography>
							<Typography variant="caption" display="block">
								Email: admin@example.com
							</Typography>
							<Typography variant="caption" display="block">
								Password: password123
							</Typography>
						</Paper>
					</CardContent>
				</Card>

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
