import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import InboxIcon from '@mui/icons-material/InboxOutlined';

/**
 * Empty State Component
 * Displays when there's no data to show
 */
const EmptyState = ({
	icon: Icon = InboxIcon,
	title = 'No Data',
	message = 'There is no data to display',
	action = null,
	actionLabel = 'Add New',
	onAction = null,
}) => {
	const theme = useTheme();

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: 2,
				p: 4,
				textAlign: 'center',
				color: theme.palette.text.secondary,
			}}
		>
			<Icon sx={{ fontSize: 64, opacity: 0.5 }} />
			<Typography variant="h6" color="textSecondary">
				{title}
			</Typography>
			<Typography variant="body2" color="textSecondary">
				{message}
			</Typography>
			{onAction && (
				<Button
					variant="contained"
					color="primary"
					onClick={onAction}
					sx={{ mt: 2 }}
				>
					{actionLabel}
				</Button>
			)}
		</Box>
	);
};

export default EmptyState;
