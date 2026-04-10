import LoginPage from '../pages/Auth/LoginPage';
import Dashboard from '../pages/Dashboard/Dashboard';
import ProductList from '../pages/Products/ProductList';
import ProductCreate from '../pages/Products/ProductCreate';
import ProductEdit from '../pages/Products/ProductEdit';
import ProductDetail from '../pages/Products/ProductDetail';

const publicRoute = [
	// { path: '/', component: Home },
	{ path: '/login', component: LoginPage },
];

const privateRoute = [
	{ path: '/', component: Dashboard },
	// product routes
	{ path: '/products', component: ProductList },
	{ path: '/products/create', component: ProductCreate },
	{ path: '/products/:id/edit', component: ProductEdit },
	{ path: '/products/:id/detail', component: ProductDetail },
	// customer routes
	// { path: '/customer', component: CustomerList },
];

export { publicRoute, privateRoute };
