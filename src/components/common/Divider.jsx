// src/components/common/Divider.jsx
// Divider/Separator component

import React from 'react';
import PropTypes from 'prop-types';
import './Divider.css';

const Divider = ({
	orientation = 'horizontal',
	variant = 'solid',
	margin = 'md',
	label,
	className = '',
	testId,
}) => {
	const dividerClasses = `
		divider
		divider-${orientation}
		divider-${variant}
		divider-margin-${margin}
		${className}
	`.trim();

	if (orientation === 'vertical') {
		return (
			<div
				className={dividerClasses}
				role="separator"
				aria-orientation="vertical"
				data-testid={testId}
			/>
		);
	}

	return (
		<div
			className={dividerClasses}
			role="separator"
			aria-orientation="horizontal"
			data-testid={testId}
		>
			{label && <span className="divider-label">{label}</span>}
		</div>
	);
};

Divider.propTypes = {
	orientation: PropTypes.oneOf(['horizontal', 'vertical']),
	variant: PropTypes.oneOf(['solid', 'dashed', 'dotted']),
	margin: PropTypes.oneOf(['sm', 'md', 'lg']),
	label: PropTypes.string,
	className: PropTypes.string,
	testId: PropTypes.string,
};

export default Divider;
