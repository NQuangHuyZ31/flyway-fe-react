// src/components/common/Modal.jsx
// Enhanced Modal/Dialog component with animations and accessibility
// Converted to Material-UI

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button as MUIButton,
	IconButton,
	Box,
	CircularProgress,
} from '@mui/material';
import { Close } from '@mui/icons-material';

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
	// Map size to MUI maxWidth
	const sizeMap = {
		sm: 'xs',
		md: 'sm',
		lg: 'md',
		xl: 'lg',
		full: 'xl',
	};

	const maxWidth = sizeMap[size] || 'sm';

	const handleClose = () => {
		onClose?.();
		onAfterClose?.();
	};

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			maxWidth={maxWidth}
			fullWidth
			data-testid={testId}
			onBackdropClick={closeOnBackdropClick ? handleClose : undefined}
			disableEscapeKeyDown={!closeOnEscape}
			PaperProps={{
				sx: {
					borderRadius: '8px',
				},
			}}
			sx={{
				'& .MuiDialog-paper': {
					margin: centered ? '32px' : '16px',
					maxHeight: scrollable ? '90vh' : 'auto',
				},
			}}
		>
			{/* Header */}
			<DialogTitle
				sx={{
					display: 'flex',
					alignItems: 'flex-start',
					justifyContent: 'space-between',
					gap: '16px',
					padding: '24px',
					borderBottom: '1px solid',
					borderColor: 'divider',
				}}
			>
				<Box
					sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}
				>
					{HeaderIcon && (
						<HeaderIcon
							sx={{ fontSize: '24px', color: 'primary.main' }}
						/>
					)}
					<Box>
						<Box
							component="h2"
							id="modal-title"
							sx={{
								margin: 0,
								fontWeight: 600,
								fontSize: '1.25rem',
							}}
						>
							{title}
						</Box>
						{subtitle && (
							<Box
								id="modal-description"
								sx={{
									margin: '4px 0 0 0',
									fontSize: '0.875rem',
									color: 'text.secondary',
								}}
							>
								{subtitle}
							</Box>
						)}
					</Box>
				</Box>
				<IconButton
					onClick={handleClose}
					size="small"
					aria-label="Close modal"
					sx={{ marginTop: '-8px', marginRight: '-8px' }}
				>
					<Close />
				</IconButton>
			</DialogTitle>

			{/* Body */}
			<DialogContent
				sx={{
					padding: '24px',
					maxHeight: scrollable ? 'calc(90vh - 140px)' : 'auto',
					overflowY: scrollable ? 'auto' : 'visible',
				}}
			>
				{children}
			</DialogContent>

			{/* Footer */}
			{footer && (
				<DialogActions
					sx={{
						padding: '16px 24px',
						borderTop: '1px solid',
						borderColor: 'divider',
						gap: '8px',
					}}
				>
					<MUIButton
						onClick={handleClose}
						disabled={loading}
						variant="outlined"
						color="inherit"
					>
						{cancelText}
					</MUIButton>
					{extraActions}
					{onConfirm && (
						<MUIButton
							onClick={onConfirm}
							disabled={loading}
							variant="contained"
							color={isDanger ? 'error' : 'primary'}
							startIcon={
								loading ? (
									<CircularProgress size={20} />
								) : undefined
							}
						>
							{confirmText}
						</MUIButton>
					)}
				</DialogActions>
			)}
		</Dialog>
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
