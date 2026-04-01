// src/components/common/Card.jsx
// Reusable Card component with multiple variants

import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({
	children,
	title,
	subtitle,
	className = '',
	hoverable = false,
	clickable = false,
	onClick,
	noPadding = false,
	footer,
	actions,
	status,
}) => {
	const cardClasses = `
    card
    ${hoverable ? 'card-hoverable' : ''}
    ${clickable ? 'card-clickable' : ''}
    ${noPadding ? 'card-no-padding' : ''}
    ${className}
  `.trim();

	return (
		<div
			className={cardClasses}
			onClick={clickable ? onClick : undefined}
			role={clickable ? 'button' : 'article'}
			tabIndex={clickable ? 0 : -1}
		>
			{(title || subtitle || actions || status) && (
				<div className="card-header">
					<div className="card-header-content">
						{title && <h3 className="card-title">{title}</h3>}
						{subtitle && (
							<p className="card-subtitle">{subtitle}</p>
						)}
					</div>
					{status && (
						<span className={`card-status card-status-${status}`}>
							{status}
						</span>
					)}
					{actions && <div className="card-actions">{actions}</div>}
				</div>
			)}

			<div className="card-body">{children}</div>

			{footer && <div className="card-footer">{footer}</div>}
		</div>
	);
};

Card.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string,
	subtitle: PropTypes.string,
	className: PropTypes.string,
	hoverable: PropTypes.bool,
	clickable: PropTypes.bool,
	onClick: PropTypes.func,
	noPadding: PropTypes.bool,
	footer: PropTypes.node,
	actions: PropTypes.node,
	status: PropTypes.oneOf(['success', 'warning', 'danger', 'info']),
};

export default Card;
