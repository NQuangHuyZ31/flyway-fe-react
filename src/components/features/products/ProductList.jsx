// src/components/features/products/ProductList.jsx
// Component for displaying a list of products

import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../common/Table';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import ActionMenu from '../../common/ActionMenu';

const ProductList = ({
	products = [],
	isLoading = false,
	onEdit,
	onDelete,
	onView,
}) => {
	const columns = [
		{
			key: 'name',
			label: 'Product Name',
			width: '200px',
		},
		{
			key: 'sku',
			label: 'SKU',
			width: '100px',
		},
		{
			key: 'category',
			label: 'Category',
			width: '120px',
			render: (value, row) => row.category?.name || '-',
		},
		{
			key: 'unit',
			label: 'Unit',
			width: '80px',
		},
		{
			key: 'purchase_price',
			label: 'Purchase Price',
			width: '120px',
			render: (value) => `$${parseFloat(value).toFixed(2)}`,
		},
		{
			key: 'selling_price',
			label: 'Selling Price',
			width: '120px',
			render: (value) => `$${parseFloat(value).toFixed(2)}`,
		},
		{
			key: 'status',
			label: 'Status',
			width: '100px',
			render: (value) => (
				<Badge variant={value === 'active' ? 'success' : 'secondary'}>
					{value === 'active' ? 'Active' : 'Inactive'}
				</Badge>
			),
		},
		{
			key: 'actions',
			label: 'Actions',
			width: '100px',
			render: (_, row) => (
				<ActionMenu
					items={[
						{
							label: 'View',
							onClick: () => onView?.(row),
						},
						{
							label: 'Edit',
							onClick: () => onEdit?.(row),
						},
						{
							label: 'Delete',
							onClick: () => onDelete?.(row),
							variant: 'danger',
						},
					]}
				/>
			),
		},
	];

	return (
		<div className="product-list">
			<Table
				columns={columns}
				data={products}
				loading={isLoading}
				sortable={true}
				striped={true}
				hover={true}
				emptyMessage="No products found"
			/>
		</div>
	);
};

ProductList.propTypes = {
	products: PropTypes.arrayOf(PropTypes.object),
	isLoading: PropTypes.bool,
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
	onView: PropTypes.func,
};

export default ProductList;
