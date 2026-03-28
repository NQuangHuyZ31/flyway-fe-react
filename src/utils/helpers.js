/**
 * Utility functions for common operations
 */

/**
 * Format currency value
 * @param {number} value - The value to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = 'USD') => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currency,
	}).format(value);
};

/**
 * Format date
 * @param {string|Date} date - The date to format
 * @param {string} format - Format pattern (default: 'short')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'short') => {
	if (!date) return '-';
	const d = new Date(date);
	if (format === 'short') {
		return d.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	} else if (format === 'long') {
		return d.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	} else if (format === 'datetime') {
		return d.toLocaleString('en-US');
	}
	return d.toLocaleDateString();
};

/**
 * Format number with commas
 * @param {number} number - The number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted number string
 */
export const formatNumber = (number, decimals = 0) => {
	return (Number(number) || 0)
		.toFixed(decimals)
		.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Capitalize first letter of string
 * @param {string} str - The string to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
	if (!str) return '';
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Truncate text with ellipsis
 * @param {string} text - The text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 50) => {
	if (!text) return '';
	return text.length > length ? text.substring(0, length) + '...' : text;
};

/**
 * Generate unique ID
 * @returns {string} Unique identifier
 */
export const generateId = () => {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Check if email is valid
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email
 */
export const isValidEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

/**
 * Check if password is strong
 * @param {string} password - Password to validate
 * @returns {boolean} True if strong password
 */
export const isStrongPassword = (password) => {
	// At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
	const strongRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	return strongRegex.test(password);
};

/**
 * Debounce function
 * @param {function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {function} Debounced function
 */
export const debounce = (func, delay = 500) => {
	let timeout;
	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), delay);
	};
};

/**
 * Throttle function
 * @param {function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {function} Throttled function
 */
export const throttle = (func, limit = 1000) => {
	let isThrottled = false;
	return (...args) => {
		if (!isThrottled) {
			func(...args);
			isThrottled = true;
			setTimeout(() => {
				isThrottled = false;
			}, limit);
		}
	};
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<void>}
 */
export const copyToClipboard = async (text) => {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch (err) {
		console.error('Failed to copy:', err);
		return false;
	}
};

/**
 * Download file
 * @param {Blob} blob - File blob
 * @param {string} filename - Output filename
 */
export const downloadFile = (blob, filename) => {
	const url = window.URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	window.URL.revokeObjectURL(url);
};

/**
 * Parse query string to object
 * @param {string} queryString - Query string from URL
 * @returns {Object} Parsed query parameters
 */
export const parseQueryString = (queryString) => {
	const params = new URLSearchParams(queryString);
	const result = {};
	params.forEach((value, key) => {
		result[key] = value;
	});
	return result;
};

/**
 * Convert object to query string
 * @param {Object} obj - Object to convert
 * @returns {string} Query string
 */
export const objectToQueryString = (obj) => {
	const params = new URLSearchParams();
	Object.keys(obj).forEach((key) => {
		if (obj[key] !== null && obj[key] !== undefined) {
			params.append(key, obj[key]);
		}
	});
	return params.toString();
};

export default {
	formatCurrency,
	formatDate,
	formatNumber,
	capitalize,
	truncateText,
	generateId,
	isValidEmail,
	isStrongPassword,
	debounce,
	throttle,
	copyToClipboard,
	downloadFile,
	parseQueryString,
	objectToQueryString,
};
