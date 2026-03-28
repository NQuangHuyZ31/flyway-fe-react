import { Outlet, Navigate } from 'react-router-dom';

export default function ProtectedRoute() {
	const Auth = true;
	return Auth ? <Outlet /> : <Navigate to="/login" />;
}
