import React, { useState, useEffect, useCallback } from 'react';
import DataTable from '../../common/DataTable';
import ProductService from '../../../api/services/productService';
import { TableCell, TableRow } from '@mui/material';

const ProductBatcheTable = ({ productId }) => {
	const [batches, setBatches] = useState({});
	const [filter, setFilter] = useState({
		page: 1,
		per_page: 10,
	});

	const [total, setTotal] = useState(0);
	const [headerFilter, setHeaderFilter] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchBatches = useCallback(async () => {
		try {
			setIsLoading(true);
			const res = await ProductService.getProductBatches(
				productId,
				filter,
			);
			setBatches((prev) => ({ ...prev, data: res.data }));
			setTotal(res.pagination.total);
			setHeaderFilter(res.header_filter);
		} catch (error) {
			console.error('Lỗi tải lô sản phẩm:', error);
		} finally {
			setIsLoading(false);
		}
	}, [productId, filter]);

	useEffect(() => {
		fetchBatches();
	}, [fetchBatches]);
	console.log('batches', total);
	return (
		<DataTable
			total={total}
			columns={headerFilter}
			pagination={{ page: filter.page, per_page: filter.per_page }}
			onPageChange={(newPage) =>
				setFilter((prev) => ({ ...prev, page: newPage }))
			}
			isLoading={isLoading}
			showActions={false}
		>
			{total > 0 ? (
				'Có dữ liệu'
			) : (
				<TableRow>
					<TableCell colSpan={headerFilter.length} align="center">
						Không có dữ liệu
					</TableCell>
				</TableRow>
			)}
		</DataTable>
	);
};

export default React.memo(ProductBatcheTable);
