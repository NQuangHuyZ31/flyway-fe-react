// src/components/common/Tooltip.jsx
// Advanced Tooltip component with positioning and animations
// Converted to Material-UI

import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip as MUITooltip, Box } from '@mui/material';

const Tooltip = ({
	content,
	children,
	position = 'top',
	trigger = 'hover',
	delay = 200,
	className = '',
	maxWidth = 200,
	theme = 'dark',
	arrow = true,
	disabled = false,
}) => {
	// Map custom position to MUI placement
	const placementMap = {
		top: 'top',
		bottom: 'bottom',
		left: 'left',
		right: 'right',
	};

	const tooltipClasses = {
		'& .MuiTooltip-tooltip': {
			maxWidth: `${maxWidth}px`,
			backgroundColor: theme === 'dark' ? '#333' : '#fff',
			color: theme === 'dark' ? '#fff' : '#333',
			border: theme === 'light' ? '1px solid #ccc' : 'none',
			fontSize: '0.875rem',
			padding: '8px 12px',
			boxShadow:
				theme === 'dark'
					? '0 4px 6px rgba(0, 0, 0, 0.1)'
					: '0 2px 4px rgba(0, 0, 0, 0.1)',
		},
		'& .MuiTooltip-arrow': {
			color: theme === 'dark' ? '#333' : '#fff',
		},
	};

	return (
		<MUITooltip
			title={content}
			placement={placementMap[position]}
			arrow={arrow}
			disableHoverListener={disabled}
			disableFocusListener={disabled}
			disableTouchListener={disabled}
			enterDelay={delay}
			sx={tooltipClasses}
		>
			<Box className={className} component="span">
				{children}
			</Box>
		</MUITooltip>
	);
};

Tooltip.propTypes = {
	content: PropTypes.node.isRequired,
	children: PropTypes.node.isRequired,
	position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
	trigger: PropTypes.oneOf(['hover', 'click', 'focus']),
	delay: PropTypes.number,
	className: PropTypes.string,
	maxWidth: PropTypes.number,
	theme: PropTypes.oneOf(['dark', 'light']),
	arrow: PropTypes.bool,
	disabled: PropTypes.bool,
};

export default Tooltip;
