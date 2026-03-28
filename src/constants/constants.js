/**
 * Constants used throughout the application
 */

// Order Status Options
export const ORDER_STATUS = {
	PENDING: 'Pending',
	CONFIRMED: 'Confirmed',
	PROCESSING: 'Processing',
	SHIPPED: 'Shipped',
	DELIVERED: 'Delivered',
	CANCELLED: 'Cancelled',
};

// Order Status Colors (for Chips)
export const ORDER_STATUS_COLORS = {
	Pending: 'default',
	Confirmed: 'info',
	Processing: 'warning',
	Shipped: 'primary',
	Delivered: 'success',
	Cancelled: 'error',
};

// Inventory Status
export const INVENTORY_STATUS = {
	IN_STOCK: 'In Stock',
	LOW_STOCK: 'Low Stock',
	OUT_OF_STOCK: 'Out of Stock',
	DISCONTINUED: 'Discontinued',
};

// Inventory Status Colors
export const INVENTORY_STATUS_COLORS = {
	'In Stock': 'success',
	'Low Stock': 'warning',
	'Out of Stock': 'error',
	Discontinued: 'default',
};

// User Roles
export const USER_ROLES = {
	ADMIN: 'Admin',
	MANAGER: 'Manager',
	STAFF: 'Staff',
	VIEWER: 'Viewer',
};

// User Role Permissions
export const USER_PERMISSIONS = {
	Admin: ['view', 'create', 'edit', 'delete', 'manage_users'],
	Manager: ['view', 'create', 'edit', 'manage_staff'],
	Staff: ['view', 'create', 'edit'],
	Viewer: ['view'],
};

// Pagination Sizes
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100];

// Default Page Size
export const DEFAULT_PAGE_SIZE = 10;

// Date Formats
export const DATE_FORMATS = {
	DISPLAY_DATE: 'MMM DD, YYYY',
	DISPLAY_DATETIME: 'MMM DD, YYYY HH:mm',
	API_DATE: 'YYYY-MM-DD',
	API_DATETIME: 'YYYY-MM-DDTHH:mm:ss',
};

// Notification Types
export const NOTIFICATION_TYPES = {
	SUCCESS: 'success',
	ERROR: 'error',
	WARNING: 'warning',
	INFO: 'info',
};

// Toast Duration (ms)
export const TOAST_DURATION = {
	SHORT: 3000,
	MEDIUM: 5000,
	LONG: 8000,
};

// API Endpoints (customize based on your backend)
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
	REGISTER: '/api/auth/register',
};

export default {
	ORDER_STATUS,
	ORDER_STATUS_COLORS,
	INVENTORY_STATUS,
	INVENTORY_STATUS_COLORS,
	USER_ROLES,
	USER_PERMISSIONS,
	PAGE_SIZE_OPTIONS,
	DEFAULT_PAGE_SIZE,
	DATE_FORMATS,
	NOTIFICATION_TYPES,
	TOAST_DURATION,
	API_ENDPOINTS,
};
