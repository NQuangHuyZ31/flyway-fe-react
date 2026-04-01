// src/components/common/NotFound.jsx
// 404 Not Found component

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NotFound = ({
	message = 'The page you are looking for was not found.',
	showHome = true,
	showBack = true,
}) => {
	return (
		<div className="not-found-container">
			<div className="not-found-content">
				<div className="not-found-icon">404</div>
				<h1 className="not-found-title">Page Not Found</h1>
				<p className="not-found-message">{message}</p>

				<div className="not-found-actions">
					{showBack && (
						<button
							className="not-found-btn"
							onClick={() => window.history.back()}
						>
							Go Back
						</button>
					)}
					{showHome && (
						<Link to="/" className="not-found-link">
							Go to Home
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

NotFound.propTypes = {
	message: PropTypes.string,
	showHome: PropTypes.bool,
	showBack: PropTypes.bool,
};

export default NotFound;
