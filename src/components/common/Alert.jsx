// src/components/common/Alert.jsx
// Alert/notification component with variants and actions

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Alert.css';

const Alert = ({
	type = 'info',
	title,
	message,
	children,
	closable = true,
	dismissible = false,
	dismissTimeout,
	onClose,
	onDismiss,
	icon: Icon,
	actions,
	className = '',
	testId,
	variant = 'filled',
}) => {
	const [isVisible, setIsVisible] = useState(true);
	const [dismissTimer, setDismissTimer] = useState(null);

	useEffect(() => {
		if (dismissible && dismissTimeout && isVisible) {
			const timer = setTimeout(() => {
				handleDismiss();
			}, dismissTimeout);
			setDismissTimer(timer);
		}

		return () => {
			if (dismissTimer) clearTimeout(dismissTimer);
		};
	}, [dismissible, dismissTimeout, isVisible]);

	const handleClose = () => {
		setIsVisible(false);
		onClose?.();
	};

	const handleDismiss = () => {
		setIsVisible(false);
		onDismiss?.();
	};

	if (!isVisible) return null;

	const alertClasses = `
		alert
		alert-${type}
		alert-${variant}
		${className}
	`.trim();

	return (
		<div className={alertClasses} role="alert" data-testid={testId}>
			<div className="alert-content">
				{Icon && (
					<div className="alert-icon" aria-hidden="true">
						<Icon />
					</div>
				)}

				<div className="alert-body">
					{title && <h5 className="alert-title">{title}</h5>}
					{message && <p className="alert-message">{message}</p>}
					{children}
				</div>
			</div>

			{(actions || closable) && (
				<div className="alert-actions">
					{actions}
					{closable && (
						<button
							type="button"
							className="alert-close"
							onClick={handleClose}
							aria-label="Close alert"
						>
							✕
						</button>
					)}
				</div>
			)}
		</div>
	);
};

Alert.propTypes = {
	type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
	title: PropTypes.string,
	message: PropTypes.string,
	children: PropTypes.node,
	closable: PropTypes.bool,
	dismissible: PropTypes.bool,
	dismissTimeout: PropTypes.number,
	onClose: PropTypes.func,
	onDismiss: PropTypes.func,
	icon: PropTypes.elementType,
	actions: PropTypes.node,
	className: PropTypes.string,
	testId: PropTypes.string,
	variant: PropTypes.oneOf(['filled', 'outlined', 'light']),
};

export default Alert;
