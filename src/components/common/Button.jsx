// src/components/common/Button.jsx
// Enhanced Button component with multiple variants, sizes, and accessibility

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

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
	const buttonClasses = useMemo(() => {
		return `
			btn
			btn-${variant}
			btn-${size}
			${fullWidth || block ? 'btn-full-width' : ''}
			${disabled ? 'btn-disabled' : ''}
			${loading ? 'btn-loading' : ''}
			${rounded ? 'btn-rounded' : ''}
			${shadow ? 'btn-shadow' : ''}
			${className}
		`.trim();
	}, [
		variant,
		size,
		fullWidth,
		block,
		disabled,
		loading,
		rounded,
		shadow,
		className,
	]);

	const handleClick = (e) => {
		if (!disabled && !loading && onClick) {
			onClick(e);
		}
	};

	const commonProps = {
		className: buttonClasses,
		disabled: disabled || loading,
		onClick: handleClick,
		'aria-label': ariaLabel,
		'aria-describedby': ariaDescribedBy,
		'aria-busy': loading,
		'data-testid': testId,
		...(tooltip && { title: tooltip }),
		...props,
	};

	// Render as link if asLink prop is true
	if (asLink && href) {
		return (
			<a
				href={href}
				target={target}
				rel={
					rel || (target === '_blank' ? 'noopener noreferrer' : null)
				}
				{...commonProps}
			>
				{loading && <span className="btn-spinner" />}
				{Icon && iconPosition === 'left' && (
					<Icon
						className="btn-icon btn-icon-left"
						aria-hidden="true"
					/>
				)}
				<span className="btn-text">{children}</span>
				{Icon && iconPosition === 'right' && (
					<Icon
						className="btn-icon btn-icon-right"
						aria-hidden="true"
					/>
				)}
			</a>
		);
	}

	return (
		<button type={type} {...commonProps}>
			{loading && <span className="btn-spinner" aria-hidden="true" />}

			{Icon && iconPosition === 'left' && (
				<Icon className="btn-icon btn-icon-left" aria-hidden="true" />
			)}

			<span className="btn-text">{children}</span>

			{Icon && iconPosition === 'right' && (
				<Icon className="btn-icon btn-icon-right" aria-hidden="true" />
			)}
		</button>
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
