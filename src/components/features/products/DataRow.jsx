import { Box, Typography } from '@mui/material';

// Data Row Component (Horizontal layout: label value)
const DataRow = ({ label, value, fullWidth = false }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				gap: 4,
				alignItems: 'center',
				mb: 1.5,
				pb: 1.5,
			}}
		>
			<Typography
				variant="body2"
				sx={{
					fontWeight: 600,
					color: '#666',
					minWidth: 150,
				}}
			>
				{label}
			</Typography>
			<Typography
				variant="body2"
				sx={{
					fontWeight: 500,
					color: '#1a1a1a',
					textAlign: 'right',
				}}
			>
				{value || 'N/A'}
			</Typography>
		</Box>
	);
};

export default DataRow;
