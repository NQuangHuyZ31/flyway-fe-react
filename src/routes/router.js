import LoginPage from '../pages/Auth/LoginPage';
import Dashboard from '../pages/Dashboard/Dashboard';
import ProductList from '../pages/Products/ProductList';

const publicRoute = [
	// { path: '/', component: Home },
	{ path: '/login', component: LoginPage },
];

const privateRoute = [
	{ path: '/dashboard', component: Dashboard },
	// product routes
	{ path: '/products', component: ProductList },
	// { path: '/products/create', component: ProductCreate },
	// { path: '/products/edit/:id', component: ProductEdit },
	// customer routes
	// { path: '/customer', component: CustomerList },
];

export { publicRoute, privateRoute };
