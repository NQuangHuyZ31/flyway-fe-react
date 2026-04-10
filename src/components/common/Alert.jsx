// src/components/common/Alert.jsx
// Alert/notification component with variants and actions
// Converted to Material-UI

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert as MUIAlert, AlertTitle, Box, IconButton } from '@mui/material';

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

	// Map custom variant to MUI variant
	const muiVariant = variant === 'light' ? 'outlined' : variant;

	// Map type to MUI severity
	const severityMap = {
		success: 'success',
		error: 'error',
		warning: 'warning',
		info: 'info',
	};

	const severity = severityMap[type] || 'info';

	return (
		<MUIAlert
			severity={severity}
			variant={muiVariant}
			onClose={closable ? handleClose : undefined}
			icon={Icon ? <Icon /> : undefined}
			data-testid={testId}
			action={
				actions ? (
					<Box sx={{ display: 'flex', gap: '8px' }}>{actions}</Box>
				) : undefined
			}
			sx={{
				'& .MuiAlert-action': {
					padding: '0 0 0 16px',
				},
			}}
		>
			{title && <AlertTitle>{title}</AlertTitle>}
			{message && <Box>{message}</Box>}
			{children}
		</MUIAlert>
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
