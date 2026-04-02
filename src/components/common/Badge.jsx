// src/components/common/Badge.jsx
// Status Badge component

import React from 'react';
import PropTypes from 'prop-types';
import './Badge.css';

const Badge = ({
	children,
	variant = 'default',
	size = 'md',
	className = '',
}) => {
	const variants = {
		default: 'badge-default',
		success: 'badge-success',
		warning: 'badge-warning',
		danger: 'badge-danger',
		info: 'badge-info',
		primary: 'badge-primary',
		secondary: 'badge-secondary',
	};

	const badgeClasses = `
    badge
    ${variants[variant] || variants.default}
    badge-${size}
    ${className}
  `.trim();

	return <span className={badgeClasses}>{children}</span>;
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
