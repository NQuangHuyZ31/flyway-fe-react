import React, { useState, useCallback } from 'react';
import { Snackbar, Alert, Box } from '@mui/material';

/**
 * Toast Notification Context and Provider
 * Provides toast notification functionality throughout the app
 */

export const ToastContext = React.createContext();

export const ToastProvider = ({ children }) => {
	const [toast, setToast] = useState({
		open: false,
		message: '',
		severity: 'info', // 'success', 'error', 'warning', 'info'
		autoHideDuration: 3000,
	});

	const showToast = useCallback(
		(message, severity = 'info', duration = 3000) => {
			setToast({
				open: true,
				message,
				severity,
				autoHideDuration: duration,
			});
		},
		[],
	);

	const hideToast = useCallback(() => {
		setToast({ ...toast, open: false });
	}, [toast]);

	const value = { showToast, hideToast };

	return (
		<ToastContext.Provider value={value}>
			{children}
			<Snackbar
				open={toast.open}
				autoHideDuration={toast.autoHideDuration}
				onClose={hideToast}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert
					onClose={hideToast}
					severity={toast.severity}
					sx={{ width: '100%' }}
				>
					{toast.message}
				</Alert>
			</Snackbar>
		</ToastContext.Provider>
	);
};

/**
 * Hook to use toast notifications
 */
export const useToast = () => {
	const context = React.useContext(ToastContext);
	if (!context) {
		throw new Error('useToast must be used within a ToastProvider');
	}
	return context;
};

export default ToastProvider;
