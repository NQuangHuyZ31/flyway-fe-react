import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/Auth/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';
import ProductList from './pages/Products/ProductList';
import CustomerList from './pages/Customers/CustomerList';
import OrderList from './pages/Orders/OrderList';
import InventoryDashboard from './pages/Inventory/InventoryDashboard';
import InboundWarehouse from './pages/Inventory/InboundWarehouse';
import OutboundWarehouse from './pages/Inventory/OutboundWarehouse';
import QuotationList from './pages/Quotations/QuotationList';
import Reports from './pages/Reports/Reports';
import UserManagement from './pages/System/UserManagement';
import SettingsPage from './pages/System/SettingsPage';
import './App.css';

function App() {
	// Check if user is authenticated (simplified - replace with actual auth logic)
	const isAuthenticated = true;

	return (
		<ToastProvider>
			<ThemeContextProvider>
				<BrowserRouter>
					<Routes>
						{/* Public Routes */}
						<Route path="/login" element={<LoginPage />} />

						{/* Protected Routes */}
						{isAuthenticated ? (
							<Route
								path="/*"
								element={
									<MainLayout>
										<Routes>
											<Route
												path="/dashboard"
												element={<Dashboard />}
											/>
											<Route
												path="/products"
												element={<ProductList />}
											/>
											<Route
												path="/customers"
												element={<CustomerList />}
											/>
											<Route
												path="/orders"
												element={<OrderList />}
											/>
											<Route
												path="/inventory"
												element={<InventoryDashboard />}
											/>
											<Route
												path="/warehouse/inbound"
												element={<InboundWarehouse />}
											/>
											<Route
												path="/warehouse/outbound"
												element={<OutboundWarehouse />}
											/>
											<Route
												path="/quotations"
												element={<QuotationList />}
											/>
											<Route
												path="/reports"
												element={<Reports />}
											/>
											<Route
												path="/system/users"
												element={<UserManagement />}
											/>
											<Route
												path="/system/settings"
												element={<SettingsPage />}
											/>
											<Route
												path="/"
												element={
													<Navigate
														to="/dashboard"
														replace
													/>
												}
											/>
										</Routes>
									</MainLayout>
								}
							/>
						) : (
							<Route
								path="/*"
								element={<Navigate to="/login" replace />}
							/>
						)}

						{/* Default redirect */}
						<Route
							path="/"
							element={
								<Navigate
									to={
										isAuthenticated
											? '/dashboard'
											: '/login'
									}
									replace
								/>
							}
						/>
					</Routes>
				</BrowserRouter>
			</ThemeContextProvider>
		</ToastProvider>
	);
}

export default App;
