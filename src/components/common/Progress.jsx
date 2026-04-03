// src/components/common/Progress.jsx
// Progress bar component with multiple variants
// Converted to Material-UI

import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress, Box, Typography, Stack } from '@mui/material';

const Progress = ({
	value = 0,
	max = 100,
	label,
	showValue = true,
	striped = false,
	animated = false,
	variant = 'primary',
	size = 'md',
	className = '',
	testId,
	formatLabel,
}) => {
	const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

	const variantMap = {
		primary: 'info',
		success: 'success',
		danger: 'error',
		warning: 'warning',
		info: 'info',
	};

	const sizeMap = {
		sm: '4px',
		md: '8px',
		lg: '12px',
	};

	const displayLabel = formatLabel
		? formatLabel(value, max, percentage)
		: `${Math.round(percentage)}%`;

	return (
		<Box className={className} data-testid={testId}>
			{showValue && label && (
				<Typography
					variant="caption"
					sx={{ marginBottom: '4px', display: 'block' }}
				>
					{label}
				</Typography>
			)}

			<Box sx={{ position: 'relative' }}>
				<LinearProgress
					variant="determinate"
					value={percentage}
					color={variantMap[variant] || 'primary'}
					sx={{
						height: sizeMap[size] || '8px',
						borderRadius: '4px',
						backgroundColor: 'action.disabledBackground',
						'& .MuiLinearProgress-bar': {
							borderRadius: '4px',
							animation: animated
								? 'pulse 1.5s ease-in-out infinite'
								: 'none',
							'@keyframes pulse': {
								'0%': { opacity: 1 },
								'50%': { opacity: 0.7 },
								'100%': { opacity: 1 },
							},
							backgroundImage: striped
								? 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.15) 10px, rgba(255, 255, 255, 0.15) 20px)'
								: 'none',
						},
					}}
					role="progressbar"
					aria-valuenow={value}
					aria-valuemin={0}
					aria-valuemax={max}
					aria-label={displayLabel}
				/>
				{showValue && displayLabel && (
					<Typography
						variant="caption"
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							fontWeight: 600,
							color: percentage > 50 ? 'white' : 'inherit',
							textShadow:
								percentage > 50
									? '0 1px 2px rgba(0,0,0,0.2)'
									: 'none',
						}}
					>
						{displayLabel}
					</Typography>
				)}
			</Box>
		</Box>
	);
};

Progress.propTypes = {
	value: PropTypes.number,
	max: PropTypes.number,
	label: PropTypes.string,
	showValue: PropTypes.bool,
	striped: PropTypes.bool,
	animated: PropTypes.bool,
	variant: PropTypes.oneOf([
		'primary',
		'success',
		'danger',
		'warning',
		'info',
	]),
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
	className: PropTypes.string,
	testId: PropTypes.string,
	formatLabel: PropTypes.func,
};

export default Progress;
