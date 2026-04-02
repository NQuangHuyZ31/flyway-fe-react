import { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '../api/services/AuthService';
import { set } from 'react-hook-form';

export const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
};

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isInitialized, setIsInitialized] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const initAuth = async () => {
			const token = localStorage.getItem('token');

			if (!token) {
				setIsInitialized(true);
				setIsAuthenticated(false);
				setUser(null);
				return;
			}

			try {
				const user = await AuthService.getCurrentUser();
				setUser(user.data);
				setIsAuthenticated(true);
			} catch {
				localStorage.removeItem('token');
				setIsAuthenticated(false);
				setUser(null);
			} finally {
				setIsInitialized(true);
			}
		};

		initAuth();
	}, []);

	const login = (userData) => {
		setIsAuthenticated(true);
		setUser(userData);
	};

	const logout = () => {
		setIsAuthenticated(false);
		setUser(null);
		localStorage.removeItem('token');
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, user, login, logout, isInitialized }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
