// src/components/common/Tooltip.jsx
// Advanced Tooltip component with positioning and animations

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Tooltip.css';

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
	const [isVisible, setIsVisible] = useState(false);
	const [delayTimer, setDelayTimer] = useState(null);
	const wrapperRef = useRef(null);
	const tooltipRef = useRef(null);

	const showTooltip = () => {
		if (disabled) return;
		const timer = setTimeout(() => setIsVisible(true), delay);
		setDelayTimer(timer);
	};

	const hideTooltip = () => {
		if (delayTimer) clearTimeout(delayTimer);
		setIsVisible(false);
	};

	const handleClick = () => {
		if (disabled) return;
		if (trigger === 'click') {
			setIsVisible(!isVisible);
		}
	};

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
				hideTooltip();
			}
		};

		if (isVisible && trigger === 'click') {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isVisible, trigger]);

	const tooltipClasses = `
		tooltip-content
		tooltip-${theme}
		tooltip-${position}
		${isVisible ? 'tooltip-visible' : ''}
		${arrow ? 'tooltip-arrow' : ''}
	`.trim();

	const triggerProps = {
		...(trigger === 'hover' && {
			onMouseEnter: showTooltip,
			onMouseLeave: hideTooltip,
		}),
		...(trigger === 'click' && {
			onClick: handleClick,
		}),
		...(trigger === 'focus' && {
			onFocus: showTooltip,
			onBlur: hideTooltip,
		}),
	};

	return (
		<div
			ref={wrapperRef}
			className={`tooltip-wrapper ${className}`.trim()}
			{...triggerProps}
		>
			{children}

			{isVisible && (
				<div
					ref={tooltipRef}
					className={tooltipClasses}
					style={{ maxWidth: `${maxWidth}px` }}
					role="tooltip"
				>
					<div className="tooltip-content-inner">{content}</div>
				</div>
			)}
		</div>
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
