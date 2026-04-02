// src/components/common/ToastContainer.jsx
// Toast container to manage multiple toast notifications

import React, { useState, useCallback } from 'react';
import Toast from './Toast';

const ToastContainer = () => {
	const [toasts, setToasts] = useState([]);

	const addToast = useCallback((message, type = 'info', duration = 3000) => {
		const id = `toast-${Date.now()}-${Math.random()}`;
		const toast = { id, message, type, duration };

		setToasts((prev) => [...prev, toast]);

		return id;
	}, []);

	const removeToast = useCallback((id) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	}, []);

	// Make these functions globally available
	if (typeof window !== 'undefined') {
		window.showToast = addToast;
	}

	return (
		<div className="toast-container">
			{toasts.map((toast) => (
				<Toast
					key={toast.id}
					id={toast.id}
					message={toast.message}
					type={toast.type}
					duration={toast.duration}
					onClose={removeToast}
				/>
			))}
		</div>
	);
};

export default ToastContainer;

// Export hook for using toast in components
export const useToast = () => {
	return {
		success: (message, duration = 3000) =>
			window.showToast?.(message, 'success', duration),
		error: (message, duration = 3000) =>
			window.showToast?.(message, 'error', duration),
		warning: (message, duration = 3000) =>
			window.showToast?.(message, 'warning', duration),
		info: (message, duration = 3000) =>
			window.showToast?.(message, 'info', duration),
	};
};
