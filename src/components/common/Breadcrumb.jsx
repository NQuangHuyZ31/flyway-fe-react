// src/components/common/Breadcrumb.jsx
// Navigation breadcrumb component
// Converted to Material-UI

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
	Breadcrumbs as MUIBreadcrumbs,
	Link as MUILink,
	Typography,
	Box,
} from '@mui/material';
import NavigateNext from '@mui/icons-material/NavigateNext';

const Breadcrumb = ({
	items,
	separator = '/',
	className = '',
	onClick,
	responsive = true,
}) => {
	return (
		<nav className={className} aria-label="Breadcrumb">
			<MUIBreadcrumbs
				separator={
					separator === '/' ? (
						<NavigateNext fontSize="small" />
					) : (
						separator
					)
				}
				sx={{
					fontSize: responsive
						? { xs: '0.75rem', sm: '0.875rem' }
						: '0.875rem',
				}}
			>
				{items.map((item, index) => {
					const isLast = index === items.length - 1;

					if (isLast) {
						return (
							<Typography
								key={item.id || index}
								color="text.primary"
								sx={{ fontWeight: 500 }}
								aria-current="page"
							>
								{item.label}
							</Typography>
						);
					}

					if (item.href) {
						return (
							<MUILink
								key={item.id || index}
								component={RouterLink}
								to={item.href}
								color="inherit"
								onClick={() => onClick?.(item)}
								sx={{
									cursor: 'pointer',
									'&:hover': {
										textDecoration: 'underline',
									},
								}}
							>
								{item.label}
							</MUILink>
						);
					}

					return (
						<Typography
							key={item.id || index}
							color="inherit"
							onClick={() => onClick?.(item)}
							sx={{
								cursor: 'pointer',
								'&:hover': {
									textDecoration: 'underline',
								},
							}}
						>
							{item.label}
						</Typography>
					);
				})}
			</MUIBreadcrumbs>
		</nav>
	);
};

Breadcrumb.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			label: PropTypes.string.isRequired,
			href: PropTypes.string,
		}),
	).isRequired,
	separator: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	className: PropTypes.string,
	onClick: PropTypes.func,
	responsive: PropTypes.bool,
};

export default Breadcrumb;
