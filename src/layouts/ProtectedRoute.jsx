import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

/**
 * ProtectedRoute Component
 * Protects routes that require authentication
 * Redirects unauthenticated users to login page
 */
const ProtectedRoute = () => {
	const { user, isAuthenticated, isInitialized } = useAuth();
	console.log('protected-ProtectedRoute - Auth State:', {
		isAuthenticated,
		user,
		isInitialized,
	});
	// If not authenticated, redirect to login
	if (!isInitialized) return;

	if (!isAuthenticated) return <Navigate to="/login" replace />;

	return <Outlet />;
};

export default ProtectedRoute;
