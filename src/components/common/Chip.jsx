// src/components/common/Chip.jsx
// Tag/Chip component for displaying labels
// Converted to Material-UI

import React from 'react';
import PropTypes from 'prop-types';
import { Chip as MUIChip, Box } from '@mui/material';

const Chip = ({
	label,
	variant = 'default',
	color = 'primary',
	size = 'md',
	removable = false,
	onRemove,
	icon: Icon,
	onClick,
	disabled = false,
	className = '',
	testId,
	as = 'div',
	href,
	...props
}) => {
	// Map custom variant to MUI variant
	const variantMap = {
		default: 'filled',
		outlined: 'outlined',
		filled: 'filled',
	};

	// Map size
	const sizeMap = {
		sm: 'small',
		md: 'medium',
		lg: 'medium',
	};

	// Map custom color to MUI color
	const colorMap = {
		primary: 'primary',
		secondary: 'secondary',
		success: 'success',
		danger: 'error',
		warning: 'warning',
		info: 'info',
	};

	return (
		<MUIChip
			label={label}
			variant={variantMap[variant] || 'filled'}
			color={colorMap[color] || 'primary'}
			size={sizeMap[size] || 'medium'}
			icon={Icon ? <Icon /> : undefined}
			onDelete={removable ? onRemove : undefined}
			onClick={!disabled ? onClick : undefined}
			disabled={disabled}
			component={href ? 'a' : undefined}
			href={href}
			data-testid={testId}
			{...props}
		/>
	);
};

Chip.propTypes = {
	label: PropTypes.string.isRequired,
	variant: PropTypes.oneOf(['default', 'outlined', 'filled']),
	color: PropTypes.oneOf([
		'primary',
		'secondary',
		'success',
		'danger',
		'warning',
		'info',
	]),
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
	removable: PropTypes.bool,
	onRemove: PropTypes.func,
	icon: PropTypes.elementType,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	testId: PropTypes.string,
	as: PropTypes.string,
	href: PropTypes.string,
};

export default Chip;
