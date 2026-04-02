import React from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

/**
 * Loading Spinner Component
 * Displays a loading indicator with optional message
 */
const LoadingSpinner = ({
	loading = true,
	message = 'Loading...',
	fullHeight = false,
	size = 40,
}) => {
	const theme = useTheme();

	if (!loading) return null;

	return (
		<Box
			sx={{
				position: 'fixed', // 🔥 quan trọng
				top: 0,
				left: 0,
				width: '100vw',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'rgba(0,0,0,0.3)', // nền mờ
				zIndex: 9999, // nổi lên trên cùng
			}}
		>
			<CircularProgress size={size} color="warning" />
			{message && (
				<Typography color="white" sx={{ mt: 2 }}>
					{message}
				</Typography>
			)}
		</Box>
	);
};

export default LoadingSpinner;
