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
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: 2,
				height: fullHeight ? '100vh' : 'auto',
				p: 4,
			}}
		>
			<CircularProgress size={size} />
			{message && (
				<Typography color="textSecondary" sx={{ mt: 2 }}>
					{message}
				</Typography>
			)}
		</Box>
	);
};

export default LoadingSpinner;
