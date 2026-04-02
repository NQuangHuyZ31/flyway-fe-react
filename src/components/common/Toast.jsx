// src/components/common/Toast.jsx
// Toast notification component

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Toast = ({
	id,
	message,
	type = 'info',
	duration = 3000,
	onClose,
	position = 'top-right',
}) => {
	useEffect(() => {
		if (duration && duration > 0) {
			const timer = setTimeout(() => {
				onClose?.(id);
			}, duration);
			return () => clearTimeout(timer);
		}
	}, [duration, id, onClose]);

	const typeIcon = {
		success: '✓',
		error: '✕',
		warning: '⚠',
		info: 'ℹ',
	};

	return (
		<div className={`toast toast-${type} toast-${position}`}>
			<div className="toast-icon">{typeIcon[type]}</div>
			<div className="toast-content">{message}</div>
			<button
				className="toast-close"
				onClick={() => onClose?.(id)}
				aria-label="Close notification"
			>
				×
			</button>
		</div>
	);
};

Toast.propTypes = {
	id: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
	duration: PropTypes.number,
	onClose: PropTypes.func,
	position: PropTypes.oneOf([
		'top-left',
		'top-right',
		'bottom-left',
		'bottom-right',
	]),
};

export default Toast;
