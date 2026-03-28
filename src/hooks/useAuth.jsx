import { createContext, useContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const user = {
		name: 'huynguyen',
	};

	const isAuthenized = true;

	const value = {
		user,
		isAuthenized,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth phải được dùng trong AuthProvider');
	}

	return context;
};
