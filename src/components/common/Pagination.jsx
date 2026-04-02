// src/components/common/Pagination.jsx
// Enhanced Pagination component with customizable options

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

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
	// Calculate pages range
	const pageNumbers = useMemo(() => {
		if (!totalPages) return [];

		const pages = [];
		const leftSibling = Math.max(currentPage - siblingCount, 1);
		const rightSibling = Math.min(currentPage + siblingCount, totalPages);

		if (leftSibling > 1) {
			pages.push(1);
			if (leftSibling > 2) {
				pages.push('...');
			}
		}

		for (let i = leftSibling; i <= rightSibling; i++) {
			pages.push(i);
		}

		if (rightSibling < totalPages) {
			if (rightSibling < totalPages - 1) {
				pages.push('...');
			}
			pages.push(totalPages);
		}

		return pages;
	}, [currentPage, totalPages, siblingCount]);

	const canGoPrevious = currentPage > 1;
	const canGoNext = currentPage < totalPages;

	const handlePageChange = (page) => {
		if (page !== '...' && page !== currentPage && !disabled) {
			onPageChange?.(page);
		}
	};

	const paginationClasses = `
		pagination
		${compact ? 'pagination-compact' : ''}
		${disabled ? 'pagination-disabled' : ''}
		${className}
	`.trim();

	const startItem = (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(
		currentPage * itemsPerPage,
		totalItems || currentPage * itemsPerPage,
	);

	return (
		<div className={paginationClasses}>
			{!compact && totalItems && (
				<span className="pagination-info">
					Showing {startItem} to {endItem} of {totalItems} items
				</span>
			)}

			<div className="pagination-buttons">
				{showFirstLast && (
					<button
						className="pagination-btn pagination-btn-first"
						onClick={() => handlePageChange(1)}
						disabled={!canGoPrevious || disabled}
						title="First page"
						type="button"
					>
						«
					</button>
				)}

				{showPrevNext && (
					<button
						className="pagination-btn pagination-btn-prev"
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={!canGoPrevious || disabled}
						title="Previous page"
						type="button"
					>
						‹
					</button>
				)}

				<div className="pagination-pages">
					{pageNumbers.map((page, index) =>
						page === '...' ? (
							<span
								key={`ellipsis-${index}`}
								className="pagination-ellipsis"
							>
								...
							</span>
						) : (
							<button
								key={page}
								className={`pagination-page ${
									page === currentPage
										? 'pagination-page-active'
										: ''
								}`}
								onClick={() => handlePageChange(page)}
								disabled={disabled}
								aria-current={
									page === currentPage ? 'page' : undefined
								}
								type="button"
							>
								{page}
							</button>
						),
					)}
				</div>

				{showPrevNext && (
					<button
						className="pagination-btn pagination-btn-next"
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={!canGoNext || disabled}
						title="Next page"
						type="button"
					>
						›
					</button>
				)}

				{showFirstLast && (
					<button
						className="pagination-btn pagination-btn-last"
						onClick={() => handlePageChange(totalPages)}
						disabled={!canGoNext || disabled}
						title="Last page"
						type="button"
					>
						»
					</button>
				)}
			</div>
		</div>
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
