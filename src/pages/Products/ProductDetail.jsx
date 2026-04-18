import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail } from '../../store/slices/productSlice';
import { Box, Grid, Typography } from '@mui/material';
import DataRow from '../../components/features/products/DataRow';
import CollapsibleSection from '../../components/features/products/CollapsibleSection';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ProductDetailHeader from './components/ProductDetailHeader';
import TextArea from '../../components/common/TextArea';
import { formatCurrency } from '../../helpers/formatHelper';
import ProductBatcheTable from '../../components/features/products/ProductBatcheTable';

const ProductDetail = () => {
	const productId = useParams().id;
	const dispatch = useDispatch();

	const {
		selectedProduct: data,
		loadingDetail,
		error,
	} = useSelector((state) => state.products);

	useEffect(() => {
		if (productId) {
			dispatch(fetchProductDetail(productId));
		}
	}, [dispatch, productId]);

	console.log('Product detail data:', data);
	return (
		<Box sx={{ p: 2, background: '#f4f6fa', minHeight: '100vh' }}>
			{/* Product Card */}
			<ProductDetailHeader product={data} />

			{/* Block: Thông tin sản phẩm */}
			<Box>
				<CollapsibleSection
					title="Thông tin sản phẩm"
					defaultOpen={true}
				>
					<Box container sx={{ display: 'flex', gap: 20 }}>
						<Grid item xs={6} md={6}>
							<DataRow
								label="Mã sản phẩm"
								value={data?.product_code}
							/>
							<DataRow label="Mã SKU" value={data?.sku} />
							<DataRow
								label="Danh mục"
								value={data?.category_id}
							/>
						</Grid>
						<Grid item xs={6} md={6}>
							<DataRow
								label="Đơn vị tính"
								value={data?.unit_id}
							/>
							<DataRow
								label="Giá bán"
								value={
									formatCurrency(data?.price) || data?.price
								}
							/>
							<DataRow
								label="Chi phí"
								value={formatCurrency(data?.cost) || data?.cost}
							/>
						</Grid>
					</Box>
				</CollapsibleSection>
			</Box>

			{/* Block: Thông tin tồn kho */}
			<Box>
				<CollapsibleSection
					title="Thông tin tồn kho"
					defaultOpen={true}
				>
					<Box container sx={{ display: 'flex', gap: 20 }}>
						<Grid item xs={6} md={6}>
							<DataRow
								label="Tồn kho tối thiểu"
								value={data?.minimum_inventory || '--'}
							/>
						</Grid>
						<Grid item xs={6} md={6}>
							<DataRow
								label="Tổng tồn kho"
								value={data?.total_quantity || '--'}
							/>
						</Grid>
					</Box>
				</CollapsibleSection>
			</Box>

			{/* Block: Thông tin thêm */}
			<Box>
				<CollapsibleSection title="Thông tin thêm" defaultOpen={true}>
					<Box container>
						<Typography
							sx={{ fontWeight: 'bold', color: 'black', mb: 1 }}
						>
							Mô tả sản phẩm
						</Typography>
						<TextArea value={data?.description} readOnly />
					</Box>
				</CollapsibleSection>
			</Box>

			{/* Block: Thông tin hệ thống */}
			<Box>
				<CollapsibleSection
					title="Thông tin hệ thống"
					defaultOpen={true}
				>
					<Box container sx={{ display: 'flex', gap: 20 }}>
						<Grid item xs={6} md={6}>
							<DataRow
								label="Ngày tạo"
								value={data?.created_at}
							/>
						</Grid>
						<Grid item xs={6} md={6}>
							<DataRow
								label="Cập nhật gần đây"
								value={data?.updated_at}
							/>
						</Grid>
					</Box>
				</CollapsibleSection>
			</Box>

			{/* Block: Thông tin lô sản phẩm */}
			<Box>
				<CollapsibleSection
					title="Thông tin lô sản phẩm"
					defaultOpen={true}
				>
					<ProductBatcheTable productId={productId} />
				</CollapsibleSection>
			</Box>

			{loadingDetail && <LoadingSpinner />}
		</Box>
	);
};

export default ProductDetail;
