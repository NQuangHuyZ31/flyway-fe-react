import './App.css';
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import { publicRoute, privateRoute } from './routes/router';
import ProtectedRoute from './layouts/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';

function App() {
	return (
		<ToastProvider>
			<ThemeContextProvider>
				<AuthProvider>
					<Routes>
						{/* Public Routes */}
						{publicRoute.map((route, index) => (
							<Route
								key={index}
								path={route.path}
								element={<route.component />}
							/>
						))}

						{/* Protected Routes */}
						<Route element={<ProtectedRoute />}>
							{privateRoute.map((route, index) => (
								<Route
									key={index}
									path={route.path}
									element={
										<MainLayout>
											<route.component />
										</MainLayout>
									}
								/>
							))}
						</Route>
						<Route
							path="*"
							element={<Navigate to="/404" replace />}
						/>
					</Routes>
				</AuthProvider>
			</ThemeContextProvider>
		</ToastProvider>
	);
}

export default App;
