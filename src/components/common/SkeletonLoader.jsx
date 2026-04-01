// src/components/common/SkeletonLoader.jsx
// Skeleton loading component for better loading UX

import React from 'react';
import PropTypes from 'prop-types';

const SkeletonLoader = ({
	type = 'text',
	count = 1,
	width = '100%',
	height = '1rem',
	circle = false,
}) => {
	const items = Array(count).fill(0);

	if (type === 'card') {
		return (
			<div className="skeleton-card">
				<div className="skeleton-image"></div>
				<div className="skeleton-content">
					<div
						className="skeleton-text"
						style={{ width: '80%' }}
					></div>
					<div
						className="skeleton-text"
						style={{ width: '60%' }}
					></div>
					<div
						className="skeleton-text"
						style={{ width: '40%' }}
					></div>
				</div>
			</div>
		);
	}

	if (type === 'table') {
		return (
			<div className="skeleton-table">
				{items.map((_, idx) => (
					<div key={idx} className="skeleton-table-row">
						<div className="skeleton-table-cell"></div>
						<div className="skeleton-table-cell"></div>
						<div className="skeleton-table-cell"></div>
						<div className="skeleton-table-cell"></div>
					</div>
				))}
			</div>
		);
	}

	return (
		<div className="skeleton-container">
			{items.map((_, idx) => (
				<div
					key={idx}
					className={`skeleton-loader ${
						circle ? 'skeleton-circle' : ''
					}`}
					style={{
						width: circle ? height : width,
						height,
						borderRadius: circle ? '50%' : '4px',
						marginBottom: idx < count - 1 ? '0.5rem' : 0,
					}}
				></div>
			))}
		</div>
	);
};

SkeletonLoader.propTypes = {
	type: PropTypes.oneOf(['text', 'card', 'table']),
	count: PropTypes.number,
	width: PropTypes.string,
	height: PropTypes.string,
	circle: PropTypes.bool,
};

export default SkeletonLoader;
