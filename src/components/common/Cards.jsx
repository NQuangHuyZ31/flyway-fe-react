import React from 'react';
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	useTheme,
	Grid,
} from '@mui/material';

// Reusable Card Component
export const StatsCard = ({
	title,
	value,
	icon,
	trend,
	trendColor = 'success',
	onClick,
}) => {
	const theme = useTheme();

	return (
		<Card
			sx={{
				cursor: onClick ? 'pointer' : 'default',
				'&:hover': {
					boxShadow: onClick
						? '0 8px 16px rgba(0, 0, 0, 0.12)'
						: 'inherit',
				},
				transition: 'all 0.3s ease',
			}}
			onClick={onClick}
		>
			<CardContent>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Box>
						<Typography
							variant="body2"
							color="textSecondary"
							sx={{ mb: 1 }}
						>
							{title}
						</Typography>
						<Typography
							variant="h4"
							sx={{ fontWeight: 'bold', mb: 1 }}
						>
							{value}
						</Typography>
						{trend && (
							<Typography
								variant="caption"
								sx={{
									color: theme.palette[trendColor].main,
									fontWeight: 600,
								}}
							>
								{trend}
							</Typography>
						)}
					</Box>
					{icon && (
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								width: 56,
								height: 56,
								borderRadius: '8px',
								backgroundColor: theme.palette.primary.light,
								color: theme.palette.primary.main,
							}}
						>
							{icon}
						</Box>
					)}
				</Box>
			</CardContent>
		</Card>
	);
};

// Reusable Table Card Component
export const TableCard = ({ title, children, ...props }) => {
	return (
		<Card {...props}>
			{title && <CardHeader title={title} />}
			<CardContent>{children}</CardContent>
		</Card>
	);
};

// Reusable Info Card
export const InfoCard = ({ title, children, icon, elevation = 1 }) => {
	const theme = useTheme();

	return (
		<Card elevation={elevation}>
			<CardHeader
				avatar={icon}
				title={title}
				titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
			/>
			<CardContent>{children}</CardContent>
		</Card>
	);
};

import { Typography } from '@mui/material';
