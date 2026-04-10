import React from 'react';
import { Box, Button, Menu, MenuItem, useTheme } from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * Action Menu Component
 * Displays a menu with common actions (Edit, Delete, Download, etc.)
 */
const ActionMenu = ({
	value = '', // Usually a row ID or object from the table
	actions = [
		{
			label: 'Edit',
			icon: <EditIcon fontSize="small" />,
			onClick: null,
			color: 'info',
		},
		{
			label: 'Delete',
			icon: <DeleteIcon fontSize="small" />,
			onClick: null,
			color: 'error',
		},
	],
	size = 'small',
	variant = 'text',
	showLabel = false,
}) => {
	const theme = useTheme();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleActionClick = (action) => {
		if (action.onClick) {
			action.onClick(value);
		}
		handleClose();
	};

	return (
		<>
			<Button
				onClick={handleClick}
				size={size}
				variant={variant}
				startIcon={<MoreIcon />}
				sx={{ minWidth: 'auto' }}
			>
				{showLabel && 'Actions'}
			</Button>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				{actions.map((action, index) => (
					<MenuItem
						key={index}
						onClick={() => handleActionClick(action)}
						sx={{
							color:
								theme.palette[action.color]?.main || 'inherit',
						}}
					>
						{action.icon && (
							<span style={{ marginRight: '8px' }}>
								{action.icon}
							</span>
						)}
						{action.label}
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

export default ActionMenu;
