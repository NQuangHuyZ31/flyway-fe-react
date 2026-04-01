// src/components/common/Progress.jsx
// Progress bar component with multiple variants

import React from 'react';
import PropTypes from 'prop-types';
import './Progress.css';

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

	const progressClasses = `
		progress
		progress-${size}
		${className}
	`.trim();

	const barClasses = `
		progress-bar
		progress-bar-${variant}
		${striped ? 'progress-bar-striped' : ''}
		${animated ? 'progress-bar-animated' : ''}
	`.trim();

	const displayLabel = formatLabel
		? formatLabel(value, max, percentage)
		: label || `${Math.round(percentage)}%`;

	return (
		<div className={progressClasses} data-testid={testId}>
			{showValue && label && (
				<span className="progress-label">{label}</span>
			)}

			<div className="progress-container">
				<div
					className={barClasses}
					role="progressbar"
					aria-valuenow={value}
					aria-valuemin={0}
					aria-valuemax={max}
					aria-label={displayLabel}
					style={{ width: `${percentage}%` }}
				>
					{showValue && displayLabel && (
						<span className="progress-text">{displayLabel}</span>
					)}
				</div>
			</div>
		</div>
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
