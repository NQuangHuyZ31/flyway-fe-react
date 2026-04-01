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
	Card,
	Typography,
	Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const CustomerList = () => {
	const theme = useTheme();
	const [openDialog, setOpenDialog] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [customers, setCustomers] = useState([
		{
			id: 1,
			name: 'John Doe',
			email: 'john@example.com',
			phone: '(+1) 123-456-7890',
			address: '123 Main St, New York, NY 10001',
			status: 'Active',
		},
		{
			id: 2,
			name: 'Jane Smith',
			email: 'jane@example.com',
			phone: '(+1) 098-765-4321',
			address: '456 Oak Ave, Los Angeles, CA 90001',
			status: 'Active',
		},
		{
			id: 3,
			name: 'Bob Johnson',
			email: 'bob@example.com',
			phone: '(+1) 555-867-5309',
			address: '789 Pine Rd, Chicago, IL 60601',
			status: 'Inactive',
		},
		{
			id: 4,
			name: 'Alice Brown',
			email: 'alice@example.com',
			phone: '(+1) 555-123-4567',
			address: '321 Elm St, Houston, TX 77001',
			address2: '321 Elm St, Houston, TX 77001',
			address3: '321 Elm St, Houston, TX 77001',
			address4: '321 Elm St, Houston, TX 77001',
			address5: '321 Elm St, Houston, TX 77001',
			address6: '321 Elm St, Houston, TX 77001',
			address7: '321 Elm St, Houston, TX 77001',
			address8: '321 Elm St, Houston, TX 77001',
			address9: '321 Elm St, Houston, TX 77001',
			status: 'Active',
		},
		{
			id: 5,
			name: 'Alice Brown',
			email: 'alice@example.com',
			phone: '(+1) 555-123-4567',
			address: '321 Elm St, Houston, TX 77001',
			status: 'Active',
		},
		{
			id: 6,
			name: 'Alice Brown',
			email: 'alice@example.com',
			phone: '(+1) 555-123-4567',
			address: '321 Elm St, Houston, TX 77001',
			status: 'Active',
		},
	]);

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		address: '',
	});

	const columns = [
		{
			id: 'name',
			label: '👤 Tên khách hàng',
			align: 'left',
			minWidth: '170',
		},
		{ id: 'email', label: '📧 Email', align: 'left', minWidth: '170	' },
		{
			id: 'phone',
			label: '📞 Số điện thoại',
			align: 'center',
			minWidth: '170',
		},
		{ id: 'address', label: '📍 Địa chỉ', align: 'left', minWidth: '170' },
		{ id: 'address2', label: '📍 Địa chỉ', align: 'left', minWidth: '170' },
		{ id: 'address3', label: '📍 Địa chỉ', align: 'left', minWidth: '170' },
		{ id: 'address4', label: '📍 Địa chỉ', align: 'left', minWidth: '170' },
		{ id: 'address5', label: '📍 Địa chỉ', align: 'left', minWidth: '170' },
		{ id: 'address6', label: '📍 Địa chỉ', align: 'left', minWidth: '170' },
		{ id: 'address7', label: '📍 Địa chỉ', align: 'left', minWidth: '170' },
		{ id: 'address8', label: '📍 Địa chỉ', align: 'left', minWidth: '170' },
		{ id: 'address9', label: '📍 Địa chỉ', align: 'left', minWidth: '170' },
	];

	const handleAddClick = () => {
		setEditingId(null);
		setFormData({ name: '', email: '', phone: '', address: '' });
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
		setEditingId(null);
		setFormData({ name: '', email: '', phone: '', address: '' });
	};

	const handleAddCustomer = () => {
		if (editingId) {
			setCustomers(
				customers.map((c) =>
					c.id === editingId ? { ...c, ...formData } : c,
				),
			);
		} else {
			const newCustomer = {
				id: customers.length + 1,
				...formData,
				status: 'Active',
			};
			setCustomers([...customers, newCustomer]);
		}
		handleCloseDialog();
	};

	const handleEdit = (customer) => {
		setEditingId(customer.id);
		setFormData({
			name: customer.name,
			email: customer.email,
			phone: customer.phone,
			address: customer.address,
		});
		setOpenDialog(true);
	};

	const handleDelete = (customer) => {
		setCustomers(customers.filter((c) => c.id !== customer.id));
	};

	return (
		<DataTable
			columns={columns}
			rows={customers}
			onEdit={handleEdit}
			onDelete={handleDelete}
			selectable={true}
		/>
	);
};

export default CustomerList;
