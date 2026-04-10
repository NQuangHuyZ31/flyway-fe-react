// src/constants/index.js
// Application-wide constants

export const APP_NAME = 'Flyway Inventory Management';
export const APP_VERSION = '1.0.0';

// API Configuration
export const API_BASE_URL =
	import.meta.env.REACT_APP_API_URL || 'http://localhost:8000/api';
export const API_TIMEOUT = parseInt(
	import.meta.env.REACT_APP_API_TIMEOUT || '10000',
);

// Storage Keys
export const STORAGE_KEYS = {
	TOKEN: 'auth_token',
	USER: 'auth_user',
	PREFERENCES: 'user_preferences',
	THEME: 'app_theme',
};

// HTTP Status Codes
export const HTTP_STATUS = {
	OK: 200,
	CREATED: 201,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	UNPROCESSABLE: 422,
	INTERNAL_ERROR: 500,
};

// User Roles
export const USER_ROLES = {
	ADMIN: 'ADMIN',
	MANAGER: 'MANAGER',
	STAFF: 'STAFF',
	ACCOUNTANT: 'ACCOUNTANT',
	VIEWER: 'VIEWER',
};

// Product Status
export const PRODUCT_STATUS = {
	ACTIVE: 'Hoạt động',
	INACTIVE: 'Không hoạt động',
	DISCONTINUED: 'Ngừng bán',
};

// Inventory Status
export const INVENTORY_STATUS = {
	IN_STOCK: 'in_stock',
	LOW_STOCK: 'low_stock',
	OUT_OF_STOCK: 'out_of_stock',
};

// Voucher Types
export const VOUCHER_TYPES = {
	INPUT: 'input',
	OUTPUT: 'output',
};

// Voucher Status
export const VOUCHER_STATUS = {
	DRAFT: 'draft',
	PENDING: 'pending',
	APPROVED: 'approved',
	RECEIVED: 'received',
	COMPLETED: 'completed',
	REJECTED: 'rejected',
	CANCELLED: 'cancelled',
};

// Units of Measurement
export const UNITS = {
	KILOGRAM: 'kg',
	PIECES: 'pcs',
	BOX: 'box',
	LITER: 'liter',
	TON: 'ton',
	METER: 'meter',
};

// Sort Orders
export const SORT_ORDER = {
	ASC: 'asc',
	DESC: 'desc',
};

// Pagination Defaults
export const PAGINATION = {
	DEFAULT_PAGE: 1,
	DEFAULT_PER_PAGE: 15,
	DEFAULT_LIMIT: 50,
};

// Toast Notification Types
export const TOAST_TYPES = {
	SUCCESS: 'success',
	ERROR: 'error',
	WARNING: 'warning',
	INFO: 'info',
};

// Toast Duration (in milliseconds)
export const TOAST_DURATION = {
	SHORT: 2000,
	NORMAL: 3000,
	LONG: 5000,
};

// Form Validation Messages
export const VALIDATION_MESSAGES = {
	REQUIRED: 'This field is required',
	EMAIL_INVALID: 'Please enter a valid email address',
	PASSWORD_SHORT: 'Password must be at least 8 characters',
	PASSWORDS_MISMATCH: 'Passwords do not match',
	MIN_LENGTH: (min) => `Minimum ${min} characters required`,
	MAX_LENGTH: (max) => `Maximum ${max} characters allowed`,
	MIN_VALUE: (min) => `Value must be at least ${min}`,
	MAX_VALUE: (max) => `Value must be at most ${max}`,
};

// API Error Messages
export const API_ERROR_MESSAGES = {
	NETWORK_ERROR: 'Network error. Please check your connection.',
	SERVER_ERROR: 'Server error. Please try again later.',
	UNAUTHORIZED: 'You are not authorized to perform this action.',
	FORBIDDEN: 'Access denied.',
	NOT_FOUND: 'Resource not found.',
	VALIDATION_ERROR: 'Please check your input and try again.',
	TIMEOUT: 'Request timeout. Please try again.',
};

// Menu Items
export const MENU_ITEMS = [
	{
		id: 'dashboard',
		label: 'Dashboard',
		path: '/dashboard',
		icon: '📊',
	},
	{
		id: 'products',
		label: 'Products',
		path: '/products',
		icon: '📦',
	},
	{
		id: 'warehouses',
		label: 'Warehouses',
		path: '/warehouses',
		icon: '🏢',
	},
	{
		id: 'inventory',
		label: 'Inventory',
		path: '/inventory',
		icon: '📈',
	},
	{
		id: 'vouchers',
		label: 'Vouchers',
		path: '/vouchers',
		icon: '📋',
	},
	{
		id: 'orders',
		label: 'Orders',
		path: '/orders',
		icon: '🛒',
	},
	{
		id: 'reports',
		label: 'Reports',
		path: '/reports',
		icon: '📄',
	},
	{
		id: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: '⚙️',
	},
];

// Date Formats
export const DATE_FORMATS = {
	SHORT: 'MM/dd/yyyy',
	LONG: 'MMMM do, yyyy',
	TIME: 'HH:mm:ss',
	DATE_TIME: 'MM/dd/yyyy HH:mm:ss',
	ISO: 'yyyy-MM-dd',
};

// Currency
export const CURRENCY = {
	SYMBOL: '$',
	CODE: 'USD',
	DECIMAL_PLACES: 2,
};

// Order Status
export const ORDER_STATUS = {
	PENDING: 'Pending',
	CONFIRMED: 'Confirmed',
	PROCESSING: 'Processing',
	SHIPPED: 'Shipped',
	DELIVERED: 'Delivered',
	CANCELLED: 'Cancelled',
};

// Order Status Colors (for UI components)
export const ORDER_STATUS_COLORS = {
	Pending: 'default',
	Confirmed: 'info',
	Processing: 'warning',
	Shipped: 'primary',
	Delivered: 'success',
	Cancelled: 'error',
};

// Inventory Status Colors
export const INVENTORY_STATUS_COLORS = {
	'In Stock': 'success',
	'Low Stock': 'warning',
	'Out of Stock': 'error',
	Discontinued: 'default',
};

// User Role Permissions
export const USER_PERMISSIONS = {
	Admin: ['view', 'create', 'edit', 'delete', 'manage_users'],
	Manager: ['view', 'create', 'edit', 'manage_staff'],
	Staff: ['view', 'create', 'edit'],
	Viewer: ['view'],
};

// Notification Types
export const NOTIFICATION_TYPES = {
	SUCCESS: 'success',
	ERROR: 'error',
	WARNING: 'warning',
	INFO: 'info',
};

// Page Size Options
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100];
export const DEFAULT_PAGE_SIZE = 10;

// API Endpoints
export const API_ENDPOINTS = {
	// Products
	PRODUCTS: '/api/products',
	PRODUCT_BY_ID: '/api/products/:id',
	// Customers
	CUSTOMERS: '/api/customers',
	CUSTOMER_BY_ID: '/api/customers/:id',
	// Orders
	ORDERS: '/api/orders',
	ORDER_BY_ID: '/api/orders/:id',
	// Inventory
	INVENTORY: '/api/inventory',
	INVENTORY_BY_ID: '/api/inventory/:id',
	// Quotations
	QUOTATIONS: '/api/quotations',
	QUOTATION_BY_ID: '/api/quotations/:id',
	// Users
	USERS: '/api/users',
	USER_BY_ID: '/api/users/:id',
	// Auth
	LOGIN: '/api/auth/login',
	LOGOUT: '/api/auth/logout',
	REFRESH: '/api/auth/refresh',
	PROFILE: '/api/auth/me',
	// Warehouses
	WAREHOUSES: '/api/warehouses',
	WAREHOUSE_SECTIONS: '/api/warehouses/:id/sections',
};

export default {
	APP_NAME,
	APP_VERSION,
	API_BASE_URL,
	HTTP_STATUS,
	USER_ROLES,
	PRODUCT_STATUS,
	ORDER_STATUS,
	VOUCHER_STATUS,
	UNITS,
	TOAST_TYPES,
	VALIDATION_MESSAGES,
	MENU_ITEMS,
	DATE_FORMATS,
	CURRENCY,
	ORDER_STATUS_COLORS,
	INVENTORY_STATUS_COLORS,
	USER_PERMISSIONS,
};
