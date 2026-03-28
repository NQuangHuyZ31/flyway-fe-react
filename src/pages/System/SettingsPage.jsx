import React, { useState } from 'react';
import {
	Box,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Grid,
	useTheme,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const SettingsPage = () => {
	const theme = useTheme();

	return (
		<Box>
			<PageHeader
				title="System Settings"
				subtitle="Configure system parameters and preferences"
				breadcrumbs={[
					{ label: 'Home' },
					{ label: 'System' },
					{ label: 'Settings' },
				]}
			/>

			<Grid container spacing={3}>
				{/* General Settings */}
				<Grid item xs={12} md={6}>
					<Box
						sx={{
							backgroundColor: theme.palette.background.paper,
							borderRadius: 2,
							boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
							p: 3,
						}}
					>
						<h3 style={{ marginBottom: '24px' }}>
							General Settings
						</h3>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Company Name"
									defaultValue="My Warehouse"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Company Address"
									defaultValue="123 Main Street"
									multiline
									rows={3}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									label="Currency"
									defaultValue="USD"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControl fullWidth>
									<InputLabel>Timezone</InputLabel>
									<Select defaultValue="UTC" label="Timezone">
										<MenuItem value="UTC">UTC</MenuItem>
										<MenuItem value="EST">EST</MenuItem>
										<MenuItem value="CST">CST</MenuItem>
										<MenuItem value="PST">PST</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<Button variant="contained" color="primary">
									Save Settings
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Grid>

				{/* Email Settings */}
				<Grid item xs={12} md={6}>
					<Box
						sx={{
							backgroundColor: theme.palette.background.paper,
							borderRadius: 2,
							boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
							p: 3,
						}}
					>
						<h3 style={{ marginBottom: '24px' }}>Email Settings</h3>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="SMTP Host"
									defaultValue="smtp.gmail.com"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									label="SMTP Port"
									type="number"
									defaultValue="587"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									label="From Email"
									defaultValue="no-reply@warehouse.com"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="SMTP Username"
									defaultValue="your-email@gmail.com"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="SMTP Password"
									type="password"
									defaultValue="••••••••"
								/>
							</Grid>
							<Grid item xs={12}>
								<Button variant="contained" color="primary">
									Test Email
								</Button>
								<Button variant="outlined" sx={{ ml: 1 }}>
									Save
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Grid>

				{/* Notification Settings */}
				<Grid item xs={12}>
					<Box
						sx={{
							backgroundColor: theme.palette.background.paper,
							borderRadius: 2,
							boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
							p: 3,
						}}
					>
						<h3 style={{ marginBottom: '24px' }}>
							Notification Settings
						</h3>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6} md={4}>
								<FormControl fullWidth>
									<InputLabel>
										Low Stock Alert Threshold
									</InputLabel>
									<Select
										defaultValue="20"
										label="Low Stock Alert Threshold"
									>
										<MenuItem value="10">10%</MenuItem>
										<MenuItem value="20">20%</MenuItem>
										<MenuItem value="30">30%</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6} md={4}>
								<FormControl fullWidth>
									<InputLabel>Backup Frequency</InputLabel>
									<Select
										defaultValue="daily"
										label="Backup Frequency"
									>
										<MenuItem value="hourly">
											Hourly
										</MenuItem>
										<MenuItem value="daily">Daily</MenuItem>
										<MenuItem value="weekly">
											Weekly
										</MenuItem>
										<MenuItem value="monthly">
											Monthly
										</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6} md={4}>
								<TextField
									fullWidth
									label="Maintenance Window (Hours)"
									type="number"
									defaultValue="2"
								/>
							</Grid>
							<Grid item xs={12}>
								<Button variant="contained" color="primary">
									Save Notification Settings
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default SettingsPage;
