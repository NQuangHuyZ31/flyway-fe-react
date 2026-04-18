import LoginPage from '../pages/Auth/LoginPage';
import Dashboard from '../pages/Dashboard/Dashboard';
import ProductCreate from '../pages/Products/ProductCreate';
import ProductDetail from '../pages/Products/ProductDetail';
import ProductsPage from '../pages/Products/ProductsPage';
import CategoriesListPage from '../pages/Categories/CategoriesListPage';
import UnitsListPage from '../pages/Units/UnitsListPage';

const publicRoute = [
	// { path: '/', component: Home },
	{ path: '/login', component: LoginPage },
];

const privateRoute = [
	{ path: '/', component: Dashboard },
	// product routes
	{ path: '/products', component: ProductsPage },
	{ path: '/products/create', component: ProductCreate },
	{ path: '/products/:id/edit', component: ProductCreate },
	{ path: '/products/:id/detail', component: ProductDetail },
	// category routes
	{ path: '/categories', component: CategoriesListPage },
	// unit routes
	{ path: '/units', component: UnitsListPage },
	// customer routes
	// { path: '/customer', component: CustomerList },
];

export { publicRoute, privateRoute };
