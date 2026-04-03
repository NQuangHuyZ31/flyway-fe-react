// src/components/common/Button.jsx
// Enhanced Button component with multiple variants, sizes, and accessibility
// Converted to Material-UI

import React from 'react';
import PropTypes from 'prop-types';
import { Button as MUIButton, CircularProgress, Box } from '@mui/material';

const Button = ({
	children,
	variant = 'primary',
	size = 'md',
	disabled = false,
	loading = false,
	fullWidth = false,
	className = '',
	icon: Icon = null,
	iconPosition = 'left',
	onClick,
	type = 'button',
	tooltip = null,
	ariaLabel = null,
	ariaDescribedBy = null,
	testId = null,
	block = false,
	rounded = false,
	shadow = false,
	href = null,
	target = null,
	rel = null,
	asLink = false,
	...props
}) => {
	// Map variant to MUI variant and color
	const variantMap = {
		primary: { muiVariant: 'contained', color: 'primary' },
		secondary: { muiVariant: 'contained', color: 'secondary' },
		success: { muiVariant: 'contained', color: 'success' },
		danger: { muiVariant: 'contained', color: 'error' },
		warning: { muiVariant: 'contained', color: 'warning' },
		info: { muiVariant: 'contained', color: 'info' },
		light: { muiVariant: 'outlined', color: 'inherit' },
		dark: { muiVariant: 'contained', color: 'inherit' },
		outline: { muiVariant: 'outlined', color: 'primary' },
		ghost: { muiVariant: 'text', color: 'primary' },
	};

	const { muiVariant, color } = variantMap[variant] || variantMap.primary;

	// Map size to MUI size
	const sizeMap = {
		xs: 'small',
		sm: 'small',
		md: 'medium',
		lg: 'large',
		xl: 'large',
	};

	const muiSize = sizeMap[size] || 'medium';

	const handleClick = (e) => {
		if (!disabled && !loading && onClick) {
			onClick(e);
		}
	};

	const buttonSx = {
		borderRadius: rounded ? '50px' : undefined,
		boxShadow: shadow ? 2 : undefined,
		width: fullWidth || block ? '100%' : undefined,
		textTransform: 'none',
	};

	const startIcon = Icon && iconPosition === 'left' ? <Icon /> : undefined;
	const endIcon = Icon && iconPosition === 'right' ? <Icon /> : undefined;

	// Render as link if asLink prop is true
	if (asLink && href) {
		return (
			<MUIButton
				component="a"
				href={href}
				target={target}
				rel={
					rel ||
					(target === '_blank' ? 'noopener noreferrer' : undefined)
				}
				variant={muiVariant}
				color={color}
				size={muiSize}
				disabled={disabled || loading}
				fullWidth={fullWidth || block}
				startIcon={loading ? <CircularProgress size={20} /> : startIcon}
				endIcon={endIcon}
				onClick={handleClick}
				aria-label={ariaLabel}
				aria-describedby={ariaDescribedBy}
				aria-busy={loading}
				data-testid={testId}
				title={tooltip}
				sx={buttonSx}
				{...props}
			>
				{children}
			</MUIButton>
		);
	}

	return (
		<MUIButton
			type={type}
			variant={muiVariant}
			color={color}
			size={muiSize}
			disabled={disabled || loading}
			fullWidth={fullWidth || block}
			startIcon={loading ? <CircularProgress size={20} /> : startIcon}
			endIcon={endIcon}
			onClick={handleClick}
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedBy}
			aria-busy={loading}
			data-testid={testId}
			title={tooltip}
			sx={buttonSx}
			{...props}
		>
			{children}
		</MUIButton>
	);
};

Button.propTypes = {
	children: PropTypes.node.isRequired,
	variant: PropTypes.oneOf([
		'primary',
		'secondary',
		'success',
		'danger',
		'warning',
		'info',
		'light',
		'dark',
		'outline',
		'ghost',
	]),
	size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
	disabled: PropTypes.bool,
	loading: PropTypes.bool,
	fullWidth: PropTypes.bool,
	block: PropTypes.bool,
	rounded: PropTypes.bool,
	shadow: PropTypes.bool,
	className: PropTypes.string,
	icon: PropTypes.elementType,
	iconPosition: PropTypes.oneOf(['left', 'right']),
	onClick: PropTypes.func,
	type: PropTypes.oneOf(['button', 'submit', 'reset']),
	tooltip: PropTypes.string,
	ariaLabel: PropTypes.string,
	ariaDescribedBy: PropTypes.string,
	testId: PropTypes.string,
	asLink: PropTypes.bool,
	href: PropTypes.string,
	target: PropTypes.string,
	rel: PropTypes.string,
};

export default Button;
