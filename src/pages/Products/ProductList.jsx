import React, { useCallback, useEffect, useState } from 'react';
import { Box, Card, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DataTable from '../../components/common/DataTable';
import ProductService from '../../api/services/productService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Toast from '../../components/common/Toast';

const ProductList = () => {
	const [products, setproducts] = useState([]);
	const [headers, setHeaders] = useState([]);
	const [filters, setFilters] = useState({
		page: 1,
		per_page: 25,
		total: 0,
		filter: {},
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchProducts = useCallback(async () => {
		setLoading(true);
		try {
			const data = await ProductService.getProducts({
				page: filters.page,
				per_page: filters.per_page,
				filter: filters.filter,
			});

			setproducts(data.data);
			setHeaders(data.header_filter);
			setFilters((prev) => ({
				...prev,
				total: data.pagination.total,
			}));
			setError(null);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	}, [filters.page, filters.per_page]);

	const handleChangePage = (newPage) => {
		setFilters((prev) => ({ ...prev, page: newPage + 1 }));
	};

	useEffect(() => {
		fetchProducts();
	}, [filters.page, filters.per_page]);

	return (
		<Box sx={{ backgroundColor: 'white' }}>
			<Box sx={{ p: 1 }}>
				{/* Product Table */}
				<Card
					sx={{
						borderRadius: 2,
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
						overflow: 'hidden',
						transition: 'boxShadow 0.3s ease',
					}}
				>
					<Box
						sx={{
							p: 2,
							backgroundColor: '#f5f7fa',
							borderBottom: '1px solid #e0e0e0',
						}}
					>
						<Typography
							variant="h5"
							sx={{ fontWeight: 700, color: '#1a1a1a' }}
						>
							Danh sách sản phẩm
						</Typography>
						<Typography variant="caption" sx={{ color: '#666' }}>
							Quản lý và cập nhật thông tin sản phẩm trong hệ
							thống
						</Typography>
					</Box>
					<Box sx={{ p: 0 }}>
						<DataTable
							columns={headers}
							rows={products}
							pagination={filters}
							total={filters.total}
							onPageChange={handleChangePage}
							selectable={true}
							onView={(rowId) => console.log('id', rowId)}
							to="products"
							linkLabel="product_name"
						/>
					</Box>
				</Card>
			</Box>
			<LoadingSpinner loading={loading} message="Đang tải dữ liệu....." />
			{error && <Toast message={error} type="error" duration={3000} />}
		</Box>
	);
};

export default ProductList;
