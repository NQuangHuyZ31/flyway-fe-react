import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	useTheme,
} from '@mui/material';
import { AlertCircle as WarningIcon } from 'lucide-react';

/**
 * Reusable Confirmation Dialog component
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether dialog is open
 * @param {string} props.title - Dialog title
 * @param {string} props.message - Confirmation message
 * @param {function} props.onConfirm - Callback when user confirms
 * @param {function} props.onCancel - Callback when user cancels
 * @param {string} props.confirmText - Text for confirm button (default: 'Delete')
 * @param {string} props.cancelText - Text for cancel button (default: 'Cancel')
 * @param {string} props.severity - Severity level: 'error', 'warning', 'info' (default: 'error')
 */
const ConfirmDialog = ({
	open,
	title = 'Confirm Action',
	message = 'Are you sure?',
	onConfirm,
	onCancel,
	confirmText = 'Delete',
	cancelText = 'Cancel',
	severity = 'error',
}) => {
	const theme = useTheme();

	const severityColors = {
		error: theme.palette.error.main,
		warning: theme.palette.warning.main,
		info: theme.palette.info.main,
	};

	return (
		<Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
			<DialogTitle
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 2,
					color: severityColors[severity],
				}}
			>
				<WarningIcon size={24} />
				{title}
			</DialogTitle>
			<DialogContent>
				<p style={{ marginTop: '12px' }}>{message}</p>
			</DialogContent>
			<DialogActions sx={{ p: 2 }}>
				<Button onClick={onCancel} variant="outlined">
					{cancelText}
				</Button>
				<Button
					onClick={onConfirm}
					variant="contained"
					color={severity}
				>
					{confirmText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDialog;
