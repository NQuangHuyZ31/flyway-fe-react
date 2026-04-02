import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	TextField,
	Typography,
	CircularProgress,
	Divider,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	IconButton,
	Tooltip,
} from '@mui/material';
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	Add as AddIcon,
	Download as DownloadIcon,
	Print as PrintIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';

const OrderDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	// Mock data - replace with Redux/API call
	const order = {
		id: id,
		order_number: 'ORD-2024-001',
		customer_name: 'John Doe',
		customer_email: 'john@example.com',
		customer_phone: '+1234567890',
		order_date: '2024-03-28',
		delivery_date: '2024-04-05',
		status: 'pending',
		subtotal: 500.0,
		tax: 50.0,
		shipping: 25.0,
		total: 575.0,
		items: [
			{
				id: 1,
				product_name: 'Product A',
				sku: 'SKU-001',
				quantity: 2,
				unit_price: 100.0,
				total: 200.0,
			},
			{
				id: 2,
				product_name: 'Product B',
				sku: 'SKU-002',
				quantity: 3,
				unit_price: 100.0,
				total: 300.0,
			},
		],
		notes: 'Please deliver after 5 PM',
		shipping_address: '123 Main Street, City, State 12345',
	};

	if (loading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box sx={{ p: 3 }}>
			<PageHeader
				title={`Order ${order.order_number}`}
				subtitle={`Customer: ${order.customer_name}`}
				action={
					<Box sx={{ display: 'flex', gap: 1 }}>
						<Button variant="outlined" startIcon={<EditIcon />}>
							Edit
						</Button>
						<Button variant="outlined" startIcon={<PrintIcon />}>
							Print
						</Button>
						<Button variant="outlined" startIcon={<DownloadIcon />}>
							PDF
						</Button>
					</Box>
				}
			/>

			<Grid container spacing={3} sx={{ mt: 1 }}>
				{/* Main Info */}
				<Grid item xs={12} md={8}>
					<Card>
						<CardContent>
							<Typography
								variant="h6"
								sx={{ fontWeight: 600, mb: 2 }}
							>
								Order Items
							</Typography>
							<Table size="small">
								<TableHead sx={{ backgroundColor: '#f5f7fa' }}>
									<TableRow>
										<TableCell>Product</TableCell>
										<TableCell>SKU</TableCell>
										<TableCell align="center">
											Qty
										</TableCell>
										<TableCell align="right">
											Unit Price
										</TableCell>
										<TableCell align="right">
											Total
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{order.items.map((item) => (
										<TableRow key={item.id}>
											<TableCell>
												{item.product_name}
											</TableCell>
											<TableCell>{item.sku}</TableCell>
											<TableCell align="center">
												{item.quantity}
											</TableCell>
											<TableCell align="right">
												${item.unit_price.toFixed(2)}
											</TableCell>
											<TableCell align="right">
												${item.total.toFixed(2)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>

							<Divider sx={{ my: 2 }} />

							<Box
								sx={{
									display: 'flex',
									justifyContent: 'flex-end',
									mb: 3,
								}}
							>
								<Grid container spacing={2} sx={{ width: 350 }}>
									<Grid item xs={6}>
										<Typography color="textSecondary">
											Subtotal:
										</Typography>
									</Grid>
									<Grid
										item
										xs={6}
										sx={{ textAlign: 'right' }}
									>
										<Typography>
											${order.subtotal.toFixed(2)}
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography color="textSecondary">
											Tax:
										</Typography>
									</Grid>
									<Grid
										item
										xs={6}
										sx={{ textAlign: 'right' }}
									>
										<Typography>
											${order.tax.toFixed(2)}
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography color="textSecondary">
											Shipping:
										</Typography>
									</Grid>
									<Grid
										item
										xs={6}
										sx={{ textAlign: 'right' }}
									>
										<Typography>
											${order.shipping.toFixed(2)}
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography sx={{ fontWeight: 600 }}>
											Total:
										</Typography>
									</Grid>
									<Grid
										item
										xs={6}
										sx={{ textAlign: 'right' }}
									>
										<Typography
											sx={{
												fontWeight: 600,
												fontSize: '1.2rem',
												color: '#1976d2',
											}}
										>
											${order.total.toFixed(2)}
										</Typography>
									</Grid>
								</Grid>
							</Box>

							{order.notes && (
								<>
									<Divider sx={{ my: 2 }} />
									<Typography
										variant="body2"
										color="textSecondary"
									>
										Order Notes:
									</Typography>
									<Typography variant="body2">
										{order.notes}
									</Typography>
								</>
							)}
						</CardContent>
					</Card>
				</Grid>

				{/* Sidebar */}
				<Grid item xs={12} md={4}>
					<Card sx={{ mb: 3 }}>
						<CardContent>
							<Typography
								variant="h6"
								sx={{ fontWeight: 600, mb: 2 }}
							>
								Customer Information
							</Typography>
							<Divider sx={{ mb: 2 }} />

							<Box sx={{ mb: 2 }}>
								<Typography
									variant="caption"
									color="textSecondary"
								>
									Name
								</Typography>
								<Typography variant="body2">
									{order.customer_name}
								</Typography>
							</Box>

							<Box sx={{ mb: 2 }}>
								<Typography
									variant="caption"
									color="textSecondary"
								>
									Email
								</Typography>
								<Typography variant="body2">
									{order.customer_email}
								</Typography>
							</Box>

							<Box sx={{ mb: 2 }}>
								<Typography
									variant="caption"
									color="textSecondary"
								>
									Phone
								</Typography>
								<Typography variant="body2">
									{order.customer_phone}
								</Typography>
							</Box>

							<Divider sx={{ my: 2 }} />

							<Typography
								variant="h6"
								sx={{ fontWeight: 600, mb: 2 }}
							>
								Shipping Address
							</Typography>
							<Typography variant="body2">
								{order.shipping_address}
							</Typography>
						</CardContent>
					</Card>

					<Card>
						<CardContent>
							<Typography
								variant="h6"
								sx={{ fontWeight: 600, mb: 2 }}
							>
								Status Timeline
							</Typography>
							<Divider sx={{ mb: 2 }} />

							<Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
								<Box
									sx={{
										width: 40,
										height: 40,
										borderRadius: '50%',
										backgroundColor: '#e3f2fd',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									✓
								</Box>
								<Box>
									<Typography
										variant="caption"
										sx={{ fontWeight: 600 }}
									>
										Order Placed
									</Typography>
									<Typography
										variant="caption"
										color="textSecondary"
										sx={{ display: 'block' }}
									>
										Mar 28, 2024
									</Typography>
								</Box>
							</Box>

							<Box sx={{ display: 'flex', gap: 1 }}>
								<Box
									sx={{
										width: 40,
										height: 40,
										borderRadius: '50%',
										backgroundColor: '#fff3e0',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										color: '#ff9800',
									}}
								>
									⏱
								</Box>
								<Box>
									<Typography
										variant="caption"
										sx={{ fontWeight: 600 }}
									>
										Pending
									</Typography>
									<Typography
										variant="caption"
										color="textSecondary"
										sx={{ display: 'block' }}
									>
										Processing...
									</Typography>
								</Box>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
};

export default OrderDetail;
