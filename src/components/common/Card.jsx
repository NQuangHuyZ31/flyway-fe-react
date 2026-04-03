// src/components/common/Card.jsx
// Reusable Card component with multiple variants
// Converted to Material-UI

import React from 'react';
import PropTypes from 'prop-types';
import {
	Card as MUICard,
	CardHeader,
	CardContent,
	CardActions,
	CardMedia,
	Box,
	Chip,
	Typography,
} from '@mui/material';

const Card = ({
	children,
	title,
	subtitle,
	className = '',
	hoverable = false,
	clickable = false,
	onClick,
	noPadding = false,
	footer,
	actions,
	status,
}) => {
	const cardSx = {
		cursor: clickable ? 'pointer' : 'default',
		transition: hoverable ? 'all 0.3s ease' : 'none',
		'&:hover': hoverable
			? {
					boxShadow: 3,
					transform: 'translateY(-2px)',
			  }
			: {},
	};

	const statusColorMap = {
		success: 'success',
		warning: 'warning',
		danger: 'error',
		info: 'info',
	};

	return (
		<MUICard
			sx={cardSx}
			onClick={clickable ? onClick : undefined}
			role={clickable ? 'button' : 'article'}
			tabIndex={clickable ? 0 : -1}
		>
			{(title || subtitle || actions || status) && (
				<CardHeader
					title={title}
					subheader={subtitle}
					action={
						status ? (
							<Chip
								label={status}
								color={statusColorMap[status] || 'default'}
								size="small"
								variant="outlined"
							/>
						) : (
							actions
						)
					}
					sx={{
						'& .MuiCardHeader-action': {
							marginTop: 0,
							marginRight: 0,
						},
					}}
				/>
			)}

			<CardContent sx={!noPadding ? {} : { padding: 0 }}>
				{children}
			</CardContent>

			{footer && (
				<CardActions sx={{ padding: '16px' }}>{footer}</CardActions>
			)}
		</MUICard>
	);
};

Card.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string,
	subtitle: PropTypes.string,
	className: PropTypes.string,
	hoverable: PropTypes.bool,
	clickable: PropTypes.bool,
	onClick: PropTypes.func,
	noPadding: PropTypes.bool,
	footer: PropTypes.node,
	actions: PropTypes.node,
	status: PropTypes.oneOf(['success', 'warning', 'danger', 'info']),
};

export default Card;
