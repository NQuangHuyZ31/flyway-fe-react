// src/components/common/Badge.jsx
// Status Badge component
// Converted to Material-UI

import React from 'react';
import PropTypes from 'prop-types';
import { Chip as MUIChip } from '@mui/material';

const Badge = ({
	children,
	variant = 'default',
	size = 'md',
	className = '',
}) => {
	// Map custom variant to MUI variant
	const variantMap = {
		default: 'filled',
		success: 'filled',
		warning: 'filled',
		danger: 'filled',
		info: 'filled',
		primary: 'filled',
		secondary: 'filled',
	};

	// Map custom variant to MUI color
	const colorMap = {
		default: 'default',
		success: 'success',
		warning: 'warning',
		danger: 'error',
		info: 'info',
		primary: 'primary',
		secondary: 'secondary',
	};

	// Map size to MUI size
	const sizeMap = {
		sm: 'small',
		md: 'medium',
		lg: 'default',
	};

	return (
		<MUIChip
			label={children}
			variant={variantMap[variant] || 'filled'}
			color={colorMap[variant] || 'default'}
			size={sizeMap[size] || 'medium'}
		/>
	);
};

Badge.propTypes = {
	children: PropTypes.node.isRequired,
	variant: PropTypes.oneOf([
		'default',
		'success',
		'warning',
		'danger',
		'info',
		'primary',
		'secondary',
	]),
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
	className: PropTypes.string,
};

export default Badge;
