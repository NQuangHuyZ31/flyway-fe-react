// src/components/common/Breadcrumb.jsx
// Navigation breadcrumb component

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Breadcrumb.css';

const Breadcrumb = ({
	items,
	separator = '/',
	className = '',
	onClick,
	responsive = true,
}) => {
	const breadcrumbClasses = `
		breadcrumb
		${responsive ? 'breadcrumb-responsive' : ''}
		${className}
	`.trim();

	return (
		<nav className={breadcrumbClasses} aria-label="Breadcrumb">
			<ol className="breadcrumb-list">
				{items.map((item, index) => {
					const isLast = index === items.length - 1;

					return (
						<li
							key={item.id || index}
							className={`breadcrumb-item ${
								isLast ? 'breadcrumb-item-active' : ''
							}`}
						>
							{isLast ? (
								<span
									className="breadcrumb-link breadcrumb-link-active"
									aria-current="page"
								>
									{item.label}
								</span>
							) : item.href ? (
								<Link
									to={item.href}
									className="breadcrumb-link"
									onClick={() => onClick?.(item)}
								>
									{item.label}
								</Link>
							) : (
								<span
									className="breadcrumb-link"
									onClick={() => onClick?.(item)}
									role="button"
									tabIndex={0}
								>
									{item.label}
								</span>
							)}

							{!isLast && (
								<span
									className="breadcrumb-separator"
									aria-hidden="true"
								>
									{separator}
								</span>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
};

Breadcrumb.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			label: PropTypes.string.isRequired,
			href: PropTypes.string,
		}),
	).isRequired,
	separator: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	className: PropTypes.string,
	onClick: PropTypes.func,
	responsive: PropTypes.bool,
};

export default Breadcrumb;
