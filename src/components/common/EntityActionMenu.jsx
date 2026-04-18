import React, { useState } from 'react';
import {
	IconButton,
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

/**
 * Generic action menu component for entity row actions
 *
 * Standardized action menu (Edit/Delete/View) for all entity tables (Products, Customers, etc.)
 * Replaces inline action menu code scattered across different table components.
 *
 * @param {Object} row - The row/item data object (must have an 'id' property)
 * @param {Object} config - Configuration object
 * @param {Function} config.onEdit - Edit handler: (row) => void
 * @param {Function} config.onDelete - Delete handler: (row) => void
 * @param {Function} config.onView - View/detail handler: (row) => void (optional)
 * @param {Array} config.actions - List of visible actions: ['edit', 'view', 'delete']
 *   (default: ['edit', 'view', 'delete'])
 * @param {boolean} config.disabled - Disable menu button (default: false)
 *
 * @example
 * <EntityActionMenu
 *   row={product}
 *   config={{
 *     onEdit: handleEdit,
 *     onDelete: handleDelete,
 *     onView: handleView,
 *     actions: ['view', 'edit', 'delete'],
 *   }}
 * />
 */
const EntityActionMenu = ({ row, config = {} }) => {
	const {
		onEdit,
		onDelete,
		onView,
		actions = ['edit', 'view', 'delete'],
		disabled = false,
	} = config;

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleOpen = (event) => {
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleAction = (action, handler) => {
		if (handler) {
			try {
				handler(row);
			} catch (error) {
				console.error(`Error executing ${action} action:`, error);
			}
		}
		handleClose();
	};

	// Action configuration with icons and labels
	const actionConfig = {
		edit: {
			icon: <EditIcon fontSize="small" color="primary" />,
			label: 'Chỉnh sửa',
			handler: onEdit,
		},
		view: {
			icon: <VisibilityIcon fontSize="small" />,
			label: 'Xem chi tiết',
			handler: onView,
		},
		delete: {
			icon: <DeleteIcon fontSize="small" color="error" />,
			label: 'Xóa',
			handler: onDelete,
		},
		...(config.customActions || {}),
	};

	// Filter visible actions
	const visibleActions = actions.filter((action) => actionConfig[action]);

	// Don't render if no visible actions
	if (visibleActions.length === 0) {
		return null;
	}

	return (
		<>
			<IconButton
				id={`action-button-${row.id}`}
				aria-controls={open ? `action-menu-${row.id}` : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleOpen}
				disabled={disabled}
				size="small"
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id={`action-menu-${row.id}`}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'right', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				{visibleActions.map((action) => {
					const { icon, label, handler } = actionConfig[action];
					return (
						<MenuItem
							key={action}
							onClick={() => handleAction(action, handler)}
							disabled={!handler}
						>
							<ListItemIcon>{icon}</ListItemIcon>
							<ListItemText>{label}</ListItemText>
						</MenuItem>
					);
				})}
			</Menu>
		</>
	);
};

export default EntityActionMenu;
