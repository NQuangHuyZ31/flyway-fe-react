// src/components/common/Accordion.jsx
// Advanced Accordion component with smooth animations

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './Accordion.css';

const Accordion = ({
	items,
	defaultOpenIndex = null,
	allowMultiple = false,
	onChange,
	className = '',
	variant = 'default',
}) => {
	const [openIndexes, setOpenIndexes] = useState(
		defaultOpenIndex !== null ? [defaultOpenIndex] : [],
	);

	const toggleItem = useCallback(
		(index) => {
			let newIndexes;

			if (allowMultiple) {
				newIndexes = openIndexes.includes(index)
					? openIndexes.filter((i) => i !== index)
					: [...openIndexes, index];
			} else {
				newIndexes = openIndexes.includes(index) ? [] : [index];
			}

			setOpenIndexes(newIndexes);
			onChange?.(index, newIndexes);
		},
		[openIndexes, allowMultiple, onChange],
	);

	return (
		<div className={`accordion accordion-${variant} ${className}`.trim()}>
			{items.map((item, index) => {
				const isOpen = openIndexes.includes(index);

				return (
					<div
						key={item.id || index}
						className={`accordion-item ${
							isOpen ? 'accordion-item-open' : ''
						}`}
					>
						<button
							className="accordion-header"
							onClick={() => toggleItem(index)}
							aria-expanded={isOpen}
							aria-controls={`accordion-panel-${index}`}
							type="button"
						>
							<span className="accordion-header-content">
								{item.icon && (
									<span
										className="accordion-icon-left"
										aria-hidden="true"
									>
										{item.icon}
									</span>
								)}
								<span className="accordion-title">
									{item.title}
								</span>
								{item.subtitle && (
									<span className="accordion-subtitle">
										{item.subtitle}
									</span>
								)}
							</span>
							<span
								className="accordion-toggle-icon"
								aria-hidden="true"
							>
								▼
							</span>
						</button>

						<div
							id={`accordion-panel-${index}`}
							className="accordion-panel"
							role="region"
							aria-labelledby={`accordion-header-${index}`}
						>
							<div className="accordion-panel-content">
								{typeof item.content === 'function'
									? item.content()
									: item.content}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

Accordion.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			title: PropTypes.string.isRequired,
			subtitle: PropTypes.string,
			content: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
				.isRequired,
			icon: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.elementType,
			]),
			disabled: PropTypes.bool,
		}),
	).isRequired,
	defaultOpenIndex: PropTypes.number,
	allowMultiple: PropTypes.bool,
	onChange: PropTypes.func,
	className: PropTypes.string,
	variant: PropTypes.oneOf(['default', 'flush', 'outlined']),
};

export default Accordion;
