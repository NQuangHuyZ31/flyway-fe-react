import {
	Dashboard as DashboardIcon,
	Inventory2 as InventoryIcon,
	People as PeopleIcon,
	ShoppingCart as OrdersIcon,
	Assessment as ReportsIcon,
	Settings as SettingsIcon,
	LocalShipping as ShippingIcon,
	LocalOffer as QuotationIcon,
} from '@mui/icons-material';
const MenuConfig = [
	{ label: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
	{
		label: 'Sản phẩm',
		path: '/products',
		icon: InventoryIcon,
		supmenu: [
			{ label: 'Sản phẩm', path: '/products' },
			{ label: 'Danh mục', path: '/categories' },
		],
	},
	{
		label: 'Khách hàng',
		path: '/cust	omers',
		icon: PeopleIcon,
		submenu: [
			{ label: 'Khách hàng', path: '/customers' },
			{ label: 'Nhà cung cấp', path: '/suppliers' },
		],
	},

	{
		label: 'Đơn hàng',
		path: '/orders',
		icon: OrdersIcon,
		submenu: [
			{ label: 'Đơn hàng mua', path: '/sales-orders' },
			{ label: 'Đơn hàng bán', path: '/purchase-orders' },
		],
	},
	{ label: 'Báo giá', path: '/quotes', icon: QuotationIcon },
	{
		label: 'Quản lí tồn kho',
		path: '/inventory',
		icon: ShippingIcon,
		submenu: [
			{ label: 'Phiếu nhập kho', path: '/stok-ins' },
			{ label: 'Phiếu xuất kho', path: '/stock-outs' },
		],
	},
	{ label: 'Báo cáo', path: '/reports', icon: ReportsIcon },
	{ label: 'Hệ thống', path: '/settings', icon: SettingsIcon },
];

export default MenuConfig;
