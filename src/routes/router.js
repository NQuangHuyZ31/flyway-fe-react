import LoginPage from '../pages/Auth/LoginPage';

const publicRoute = [
	// { path: '/', component: Home },
	{ path: '/login', component: LoginPage },
];

const privateRoute = [
	// { path: '/dashboard', component: Dashboard },
	// { path: '/products', component: ProductList },
	// { path: '/customer', component: CustomerList },
];

export { publicRoute, privateRoute };
