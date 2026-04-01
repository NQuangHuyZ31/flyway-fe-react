// src/components/common/Modal.jsx
// Enhanced Modal/Dialog component with animations and accessibility

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({
	isOpen,
	title,
	children,
	onClose,
	onConfirm,
	confirmText = 'Confirm',
	cancelText = 'Cancel',
	size = 'md',
	className = '',
	footer = true,
	backdrop = true,
	loading = false,
	isDanger = false,
	closeOnBackdropClick = true,
	closeOnEscape = true,
	centered = true,
	scrollable = false,
	animation = 'fade',
	testId,
	onAfterClose,
	headerIcon: HeaderIcon = null,
	subtitle,
	extraActions,
}) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		}
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isOpen]);

	// Handle Escape key
	useEffect(() => {
		if (!isOpen || !closeOnEscape) return;

		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				handleClose();
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, closeOnEscape]);

	const handleClose = () => {
		onClose?.();
		onAfterClose?.();
	};

	const handleBackdropClick = (e) => {
		if (backdrop && closeOnBackdropClick && e.target === e.currentTarget) {
			handleClose();
		}
	};

	if (!isOpen) return null;

	const overlayClasses = `modal-overlay modal-animation-${animation}`.trim();
	const modalClasses = `
		modal 
		modal-${size} 
		${centered ? 'modal-centered' : ''}
		${scrollable ? 'modal-scrollable' : ''}
		${className}
	`.trim();

	return (
		<div
			className={overlayClasses}
			onClick={handleBackdropClick}
			data-testid={testId}
			role="presentation"
		>
			<div
				className={modalClasses}
				onClick={(e) => e.stopPropagation()}
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
			>
				{/* Header */}
				<div className="modal-header">
					<div className="modal-header-content">
						{HeaderIcon && (
							<HeaderIcon
								className="modal-header-icon"
								aria-hidden="true"
							/>
						)}
						<div className="modal-header-text">
							<h2 className="modal-title" id="modal-title">
								{title}
							</h2>
							{subtitle && (
								<p
									className="modal-subtitle"
									id="modal-description"
								>
									{subtitle}
								</p>
							)}
						</div>
					</div>
					<button
						className="modal-close"
						onClick={handleClose}
						aria-label="Close modal"
						type="button"
					>
						<span aria-hidden="true">✕</span>
					</button>
				</div>

				{/* Body */}
				<div className="modal-body">{children}</div>

				{/* Footer */}
				{footer && (
					<div className="modal-footer">
						<div className="modal-footer-actions">
							<button
								className="modal-btn-cancel"
								onClick={handleClose}
								disabled={loading}
								type="button"
							>
								{cancelText}
							</button>
							{extraActions}
							{onConfirm && (
								<button
									className={`modal-btn-confirm ${
										isDanger ? 'modal-btn-danger' : ''
									}`}
									onClick={onConfirm}
									disabled={loading}
									type="button"
									aria-busy={loading}
								>
									{loading ? (
										<>
											<span className="modal-spinner" />
											{confirmText}
										</>
									) : (
										confirmText
									)}
								</button>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	children: PropTypes.node.isRequired,
	onClose: PropTypes.func.isRequired,
	onConfirm: PropTypes.func,
	confirmText: PropTypes.string,
	cancelText: PropTypes.string,
	size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'full']),
	className: PropTypes.string,
	footer: PropTypes.bool,
	backdrop: PropTypes.bool,
	loading: PropTypes.bool,
	isDanger: PropTypes.bool,
	closeOnBackdropClick: PropTypes.bool,
	closeOnEscape: PropTypes.bool,
	centered: PropTypes.bool,
	scrollable: PropTypes.bool,
	animation: PropTypes.oneOf(['fade', 'scale', 'slide']),
	testId: PropTypes.string,
	onAfterClose: PropTypes.func,
	headerIcon: PropTypes.elementType,
	extraActions: PropTypes.node,
};

export default Modal;
