// src/components/common/Divider.jsx
// Divider/Separator component
// Converted to Material-UI

import React from 'react';
import PropTypes from 'prop-types';
import { Divider as MUIDivider, Box } from '@mui/material';

const Divider = ({
	orientation = 'horizontal',
	variant = 'solid',
	margin = 'md',
	label,
	className = '',
	testId,
}) => {
	const marginMap = {
		sm: '8px',
		md: '16px',
		lg: '32px',
	};

	const variantMap = {
		solid: 'fullWidth',
		dashed: 'fullWidth',
		dotted: 'fullWidth',
	};

	const sx = {
		...(orientation === 'vertical' && {
			height: 'auto',
			width: '1px',
			margin: `0 ${marginMap[margin]}`,
		}),
		...(orientation === 'horizontal' && {
			margin: `${marginMap[margin]} 0`,
		}),
		...(variant === 'dashed' && {
			borderTopStyle: 'dashed',
		}),
		...(variant === 'dotted' && {
			borderTopStyle: 'dotted',
		}),
	};

	return (
		<MUIDivider
			orientation={orientation}
			variant={variantMap[variant]}
			data-testid={testId}
			sx={sx}
		>
			{label && <Box sx={{ px: 1, fontSize: '0.875rem' }}>{label}</Box>}
		</MUIDivider>
	);
};

Divider.propTypes = {
	orientation: PropTypes.oneOf(['horizontal', 'vertical']),
	variant: PropTypes.oneOf(['solid', 'dashed', 'dotted']),
	margin: PropTypes.oneOf(['sm', 'md', 'lg']),
	label: PropTypes.string,
	className: PropTypes.string,
	testId: PropTypes.string,
};

export default Divider;
