// src/components/common/Pagination.jsx
// Enhanced Pagination component using Material-UI

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
	Pagination as MUIPagination,
	Box,
	Typography,
	Stack,
	useTheme,
} from '@mui/material';

const Pagination = ({
	currentPage = 1,
	totalPages,
	totalItems,
	itemsPerPage,
	onPageChange,
	disabled = false,
	maxButtons = 5,
	showFirstLast = true,
	showPrevNext = true,
	compact = false,
	className = '',
	siblingCount = 1,
}) => {
	const theme = useTheme();

	const startItem = (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(
		currentPage * itemsPerPage,
		totalItems || currentPage * itemsPerPage,
	);

	const handleChange = (event, page) => {
		onPageChange?.(page);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				gap: 2,
				py: 2,
				flexWrap: 'wrap',
				width: '100%',
			}}
		>
			{!compact && totalItems && (
				<Typography
					variant="body2"
					color="textSecondary"
					sx={{
						flex: compact ? 'none' : '1',
					}}
				>
					Showing {startItem} to {endItem} of {totalItems} items
				</Typography>
			)}

			<MUIPagination
				count={totalPages}
				page={currentPage}
				onChange={handleChange}
				disabled={disabled}
				size="medium"
				showFirstButton={showFirstLast}
				showLastButton={showFirstLast}
				siblingCount={siblingCount}
				sx={{
					'& .MuiPaginationItem-page.Mui-disabled': {
						opacity: 0.5,
					},
				}}
			/>
		</Box>
	);
};

Pagination.propTypes = {
	currentPage: PropTypes.number,
	totalPages: PropTypes.number.isRequired,
	totalItems: PropTypes.number,
	itemsPerPage: PropTypes.number,
	onPageChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	maxButtons: PropTypes.number,
	showFirstLast: PropTypes.bool,
	showPrevNext: PropTypes.bool,
	compact: PropTypes.bool,
	className: PropTypes.string,
	siblingCount: PropTypes.number,
};

export default Pagination;
