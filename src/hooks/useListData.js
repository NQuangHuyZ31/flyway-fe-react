import { use, useCallback, useEffect, useState } from 'react';
/**
 * Custom hook for managing list data (fetch, filter, pagination, delete)
 *
 * Consolidates all list page logic into a single reusable hook.
 * Works with any domain that has a Redux slice with standard structure.
 *
 * @param {Object} config - Configuration object
 * @param {string} config.domain - Redux domain/slice name (e.g., 'products', 'customers')
 * @param {Function} config.fetchThunk - Async thunk for fetching data (e.g., fetchProducts)
 * @param {Function} config.deleteThunk - Async thunk for delete operation (e.g., deleteProduct)
 * @param {Function} config.deleteService - Service method for delete (fallback if no thunk)
 * @param {Object} config.defaultFilters - Initial filter values (default: {})
 * @param {number} config.defaultPerPage - Items per page (default: 15)
 *
 * @returns {Object} Object containing:
 *   - data: Array of items
 *   - loading: Boolean loading state
 *   - error: String error message or null
 *   - pagination: Object with {page, per_page, total}
 *   - filters: Current filter values
 *   - headerFilters: Filter metadata from API
 *   - onFilterChange: Function to change filter (key, value)
 *   - onPaginationChange: Function to change page
 *   - onClearFilters: Function to reset all filters
 */
export const useListData = (config) => {
	const { fetchDataURL, defaultFilters = {}, defaultPerPage = 15 } = config;

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [headerFilters, setHeaderFilters] = useState([]);
	const [data, setData] = useState([]);
	const [total, setTotal] = useState(0);
	const [filters, setFilters] = useState({
		per_page: defaultPerPage,
		page: 1,
		filter: defaultFilters,
	});

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetchDataURL({
				per_page: filters.per_page,
				page: filters.page,
				filters: filters.filter,
				mode: 'list',
			});

			// set data
			setData(res.data || []);
			// set header filters
			setHeaderFilters(res.header_filter || []);
			// set total count for pagination
			setTotal(res.pagination.total || 0);
		} catch (error) {
			setError(error.message || 'Failed to load data');
		} finally {
			setLoading(false);
		}
	}, [fetchDataURL, filters]);

	// Handle search filter change
	const handleSearchfilter = useCallback((filters) => {
		setFilters((prev) => ({
			...prev,
			filter: {
				...prev.filter,
				...filters,
			},
			page: 1, // Reset to first page when filter changes
		}));
	}, []);

	// Fetch data on filters change
	useEffect(() => {
		fetchData();
	}, [filters]);

	// Handle pagination change
	const handlePaginationChange = useCallback((page) => {
		setFilters((prev) => ({
			...prev,
			page: page + 1,
		}));
	}, []);

	// Clear all filters
	const handleClearFilters = useCallback(() => {
		setFilters({
			per_page: defaultPerPage,
			page: 1,
			filter: defaultFilters,
		});
	}, [defaultPerPage, defaultFilters]);

	// mutate function for delete operation (can be used in delete handlers)
	const mutate = (updater, options = {}) => {
		setData((prev) => {
			const newData =
				typeof updater === 'function' ? updater(prev) : updater;
			return newData;
		});

		if (options.updateTotal) {
			setTotal((prev) => prev + options.updateTotal);
		}
	};

	// create funtion helper for updating total count (e.g., after create/delete)
	const addItem = (item) => {
		mutate((prev) => [...prev, item], { updateTotal: 1 });
	};

	const updateItem = (id, updatedItem) => {
		mutate((prev) =>
			prev.map((item) => (item.id === id ? updatedItem : item)),
		);
	};

	const removeItem = (id) => {
		mutate((prev) => prev.filter((item) => item.id !== id), {
			updateTotal: -1,
		});
	};

	return {
		// Data
		data: data,
		loading,
		error,
		pagination: {
			page: filters.page,
			per_page: filters.per_page,
			total: total,
		},
		filters: filters.filter,
		headerFilters,
		addItem,
		updateItem,
		removeItem,
		// Handlers
		onSearchfilter: handleSearchfilter,
		onPaginationChange: handlePaginationChange,
		onClearFilters: handleClearFilters,
	};
};

export default useListData;
