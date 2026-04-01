// src/components/common/Chip.jsx
// Tag/Chip component for displaying labels

import React from 'react';
import PropTypes from 'prop-types';
import './Chip.css';

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
	const chipClasses = `
		chip
		chip-${variant}
		chip-${color}
		chip-${size}
		${disabled ? 'chip-disabled' : ''}
		${removable ? 'chip-removable' : ''}
		${className}
	`.trim();

	const Component = as || (href ? 'a' : 'div');
	const componentProps = {
		className: chipClasses,
		onClick: !disabled ? onClick : undefined,
		disabled,
		...(href && { href }),
		'data-testid': testId,
		...props,
	};

	return (
		<Component {...componentProps}>
			{Icon && <Icon className="chip-icon" aria-hidden="true" />}
			<span className="chip-label">{label}</span>
			{removable && (
				<button
					type="button"
					className="chip-remove"
					onClick={(e) => {
						e.stopPropagation();
						onRemove?.();
					}}
					aria-label={`Remove ${label}`}
				>
					✕
				</button>
			)}
		</Component>
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
