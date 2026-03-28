import React from 'react';
import { Avatar, Badge, Box, Tooltip, useTheme } from '@mui/material';

/**
 * Avatar Component with Initials
 * Displays user initials in a colorful badge
 */
const AvatarWithInitials = ({
	name = '',
	src = null, // Optional image URL
	size = 40,
	color = '#3b82f6',
	status = null, // 'online', 'offline', 'busy', null
	tooltip = true,
	onClick = null,
	sx = {},
}) => {
	const theme = useTheme();

	// Generate initials from name
	const getInitials = (name) => {
		if (!name) return '?';
		return name
			.split(' ')
			.map((word) => word[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	};

	// Get status badge color
	const getStatusColor = (status) => {
		switch (status) {
			case 'online':
				return 'success';
			case 'offline':
				return 'default';
			case 'busy':
				return 'error';
			default:
				return null;
		}
	};

	const initials = getInitials(name);
	const statusColor = getStatusColor(status);

	const avatar = (
		<Avatar
			src={src}
			sx={{
				width: size,
				height: size,
				backgroundColor: color,
				fontSize: size * 0.4,
				cursor: onClick ? 'pointer' : 'default',
				userSelect: 'none',
				...sx,
			}}
			onClick={onClick}
		>
			{initials}
		</Avatar>
	);

	if (status) {
		return (
			<Badge
				overlap="circular"
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				variant="dot"
				color={statusColor}
			>
				{tooltip ? <Tooltip title={name}>{avatar}</Tooltip> : avatar}
			</Badge>
		);
	}

	return tooltip ? <Tooltip title={name}>{avatar}</Tooltip> : avatar;
};

export default AvatarWithInitials;
