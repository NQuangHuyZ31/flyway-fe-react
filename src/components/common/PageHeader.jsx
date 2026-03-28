import React from 'react';
import {
	Box,
	Typography,
	Button,
	useTheme,
	Breadcrumbs,
	Link,
	Card,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';

const PageHeader = ({
	title,
	subtitle,
	actionButton,
	onActionClick,
	breadcrumbs,
}) => {
	const theme = useTheme();

	return (
		<Box sx={{ mb: 4 }}>
			{/* Breadcrumbs */}
			{breadcrumbs && (
				<Breadcrumbs sx={{ mb: 3, opacity: 0.7 }}>
					{breadcrumbs.map((item, index) => (
						<Link
							key={index}
							color={
								index === breadcrumbs.length - 1
									? 'textPrimary'
									: 'inherit'
							}
							sx={{
								textDecoration:
									index === breadcrumbs.length - 1
										? 'none'
										: 'inherit',
								fontWeight:
									index === breadcrumbs.length - 1
										? 600
										: 400,
								cursor: 'pointer',
								'&:hover': {
									textDecoration: 'underline',
								},
							}}
						>
							{item.label}
						</Link>
					))}
				</Breadcrumbs>
			)}

			{/* Header with Title and Action Button */}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					gap: 2,
					flexWrap: 'wrap',
				}}
			>
				<Box>
					<Typography
						variant="h4"
						sx={{
							fontWeight: 700,
							mb: 0.5,
							color: theme.palette.text.primary,
						}}
					>
						{title}
					</Typography>
					{subtitle && (
						<Typography
							variant="body2"
							color="textSecondary"
							sx={{
								fontSize: '0.95rem',
							}}
						>
							{subtitle}
						</Typography>
					)}
				</Box>

				{/* Action Button */}
				{actionButton && (
					<Button
						variant="contained"
						color="primary"
						startIcon={actionButton.icon || <AddIcon />}
						onClick={onActionClick}
						sx={{
							textTransform: 'none',
							fontWeight: 600,
							px: 3,
							py: 1.2,
							borderRadius: 1,
							boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
							'&:hover': {
								boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
								transform: 'translateY(-1px)',
								transition: 'all 0.3s ease',
							},
						}}
					>
						{actionButton.label}
					</Button>
				)}
			</Box>
		</Box>
	);
};

export default PageHeader;
