import { useState, useEffect, useCallback } from 'react';
import ProductService from '../api/services/productService';

/**
 * useProducts - Custom hook for fetching and managing products
 * @param {Object} initialFilters - Initial search/filter parameters
 * @param {boolean} autoFetch - Whether to fetch on mount
 * @returns {Object} - { products, loading, error, totalCount, currentPage, refetch, setCurrentPage }
 * @example
 * const { products, loading, error, refetch } = useProducts();
 */
export function useProducts(initialFilters = {}, autoFetch = true) {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [totalCount, setTotalCount] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [filters, setFilters] = useState({
		page: 1,
		per_page: 15,
		...initialFilters,
	});

	/**
	 * Fetch products from API
	 */
	const fetchProducts = useCallback(
		async (searchFilters = filters) => {
			setLoading(true);
			setError(null);
			try {
				const response = await ProductService.getProducts(
					searchFilters,
				);

				// Handle different response formats
				const data = response.data || response;
				setProducts(Array.isArray(data) ? data : data.data || []);

				// Extract metadata if available
				if (response.meta) {
					setTotalCount(response.meta.total || 0);
					setCurrentPage(response.meta.current_page || 1);
				} else {
					setTotalCount(data.length || 0);
				}
			} catch (err) {
				const errorMessage =
					err.response?.data?.message ||
					err.message ||
					'Tải sản phẩm thất bại';
				setError(errorMessage);
				setProducts([]);
			} finally {
				setLoading(false);
			}
		},
		[filters],
	);

	/**
	 * Fetch on component mount or when filters change
	 */
	useEffect(() => {
		if (autoFetch) {
			fetchProducts();
		}
	}, [autoFetch, fetchProducts]);

	/**
	 * Refetch products (manual trigger)
	 */
	const refetch = useCallback(() => {
		fetchProducts();
	}, [fetchProducts]);

	/**
	 * Update filters and fetch
	 */
	const updateFilters = useCallback(
		(newFilters) => {
			const updatedFilters = {
				...filters,
				...newFilters,
				page: 1, // Reset to first page on new filters
			};
			setFilters(updatedFilters);
			fetchProducts(updatedFilters);
		},
		[filters, fetchProducts],
	);

	/**
	 * Handle page change
	 */
	const handlePageChange = useCallback(
		(page) => {
			const updatedFilters = {
				...filters,
				page,
			};
			setCurrentPage(page);
			setFilters(updatedFilters);
			fetchProducts(updatedFilters);
		},
		[filters, fetchProducts],
	);

	/**
	 * Get total pages
	 */
	const totalPages = Math.ceil(totalCount / (filters.per_page || 15));

	return {
		products,
		loading,
		error,
		totalCount,
		totalPages,
		currentPage,
		refetch,
		updateFilters,
		handlePageChange,
		setFilters,
	};
}

export default useProducts;
