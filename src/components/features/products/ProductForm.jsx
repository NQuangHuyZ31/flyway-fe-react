import {
	Box,
	Button,
	Checkbox,
	CircularProgress,
	FormControlLabel,
	Grid,
	InputLabel,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import { Controller, useForm } from 'react-hook-form';
import { useState, useRef, useEffect } from 'react';
import CategorySelect from '../../common/CategorySelect';
import UnitMeasureSelect from '../../common/UnitMeasureSelect';
import productService from '../../../api/services/productService';
import InputCreateForm from '../../common/InputCreateForm';

const ProductForm = ({
	defaultValues,
	onSubmit,
	isSubmitting,
	onImageChange,
}) => {
	const [imagePreview, setImagePreview] = useState(null);
	const fieldRefs = useRef({});
	const {
		register,
		handleSubmit,
		control,
		setError,
		clearErrors,
		getValues,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues,
	});

	const handleImageChange = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
				// Call parent callback if provided
				if (onImageChange) {
					onImageChange(file);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	// Check dulicate when blurring product code or SKU fields
	const handleCheckDuplicate = async (field, value) => {
		if (!value) return; // Skip if value is empty

		try {
			const res = await productService.checkDuplicate(field, value);

			if (res.data.is_duplicate) {
				setError(field, {
					message: res.message || 'Giá trị này đã tồn tại',
				});
				fieldRefs.current[field]?.focus();
			} else {
				clearErrors(field);
			}
		} catch (error) {
			setError(field, {
				message: 'Lỗi kiểm tra giá trị trùng lặp',
			});
		}
	};

	return (
		/* Form */
		<form onSubmit={handleSubmit(onSubmit)}>
			{/* ========== SECTION 1: BASIC INFORMATION ========== */}
			<Box sx={{ mb: 2 }}>
				<Paper sx={{ p: 3, bgcolor: '#f9f9f9' }}>
					<Typography
						variant="h6"
						fontWeight={600}
						sx={{ mb: 3, color: 'black' }}
					>
						Thông tin cơ bản
					</Typography>

					<Grid container spacing={2}>
						{/* Row 1: Product Name, Code, Category, Unit, SKU */}
						<Grid size={6} spacing={5}>
							<Box sx={{ width: '70%' }}>
								{/* Mã sản phẩm */}
								<InputCreateForm
									label={'Mã sản phẩm'}
									name={'product_code'}
									register={register}
									rules={{
										required: 'Mã sản phẩm là bắt buộc',
										pattern: {
											value: /^PRD-[A-Za-z0-9]+$/,
											message:
												'Mã phải có dạng PRD-xxx (chỉ chữ và số)',
										},
									}}
									errors={errors}
									fieldRefs={fieldRefs}
									placeholder={'Nhập mã sản phẩm'}
									handleCheckDuplicate={handleCheckDuplicate}
								/>

								{/* Tên sản phẩm */}
								<InputCreateForm
									label={'Tên sản phẩm'}
									name={'product_name'}
									register={register}
									rules={{
										required: 'Tên sản phẩm là bắt buộc',
									}}
									errors={errors}
									fieldRefs={fieldRefs}
									placeholder={'Nhập tên sản phẩm'}
								/>

								{/* SKU */}
								<InputCreateForm
									label={'SKU'}
									name={'sku'}
									register={register}
									rules={{
										required: 'SKU là bắt buộc',
									}}
									errors={errors}
									fieldRefs={fieldRefs}
									placeholder={'Nhập SKU'}
									handleCheckDuplicate={handleCheckDuplicate}
								/>
							</Box>
						</Grid>

						<Grid size={6} spacing={5}>
							<Box sx={{ width: '70%' }}>
								{/* Danh mục */}
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										gap: 3,
										mb: 2,
									}}
								>
									<InputLabel
										sx={{
											textWrap: 'nowrap',
											overflow: 'unset',
											minWidth: 120,
										}}
									>
										Danh mục
									</InputLabel>
									<Controller
										name="category_id"
										control={control}
										rules={{
											required: 'Danh mục là bắt buộc',
											validate: (value) =>
												(!!value && value !== '') ||
												'Vui lòng chọn danh mục',
										}}
										render={({ field }) => (
											<CategorySelect
												{...field}
												error={!!errors.category_id}
												helperText={
													errors.category_id?.message
												}
												inputRef={(ref) => {
													if (ref)
														fieldRefs.current.category_id =
															ref?.querySelector(
																'input',
															);
												}}
											/>
										)}
									/>
								</Box>

								{/* Đơn vị */}
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										gap: 3,
										mb: 2,
									}}
								>
									<InputLabel
										sx={{
											textWrap: 'nowrap',
											overflow: 'unset',
											minWidth: 120,
										}}
									>
										Đơn vị
									</InputLabel>
									<Controller
										name="unit_id"
										control={control}
										rules={{
											required: 'Đơn vị là bắt buộc',
											validate: (value) =>
												(!!value && value !== '') ||
												'Vui lòng chọn đơn vị',
										}}
										render={({ field }) => (
											<UnitMeasureSelect
												{...field}
												error={!!errors.unit_id}
												helperText={
													errors.unit_id?.message
												}
												inputRef={(ref) => {
													if (ref)
														fieldRefs.current.unit_id =
															ref?.querySelector(
																'input',
															);
												}}
											/>
										)}
									/>
								</Box>
							</Box>
						</Grid>

						{/* Row 2: Status Checkbox + Description spanning right side */}
						<Grid size={12}>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									gap: 1,
								}}
							>
								<Controller
									name="is_active"
									control={control}
									render={({ field }) => (
										<FormControlLabel
											control={
												<Checkbox
													{...field}
													checked={field.value}
												/>
											}
											label="Sản phẩm đang hoạt động"
										/>
									)}
								/>
							</Box>
						</Grid>
					</Grid>
				</Paper>
			</Box>

			{/* ========== SECTION 2: SPECIFICATIONS (QUY CÁCH SẢN PHẨM) ========== */}
			<Box sx={{ mb: 2 }}>
				<Paper sx={{ p: 3, bgcolor: '#f9f9f9' }}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 2,
							mb: 3,
						}}
					>
						<Typography variant="h6" fontWeight={600}>
							Thông tin tồn kho
						</Typography>
					</Box>

					<Grid container spacing={2}>
						{/* Minimum Inventory */}
						<Grid size={6}>
							<Box sx={{ width: '70%' }}>
								<InputCreateForm
									label={'Tồn kho tối thiểu'}
									name={'minimum_inventory'}
									type="number"
									register={register}
									rules={{
										required:
											'Tồn kho tối thiểu là bắt buộc',
										min: {
											value: 1,
											message:
												'Tồn kho tối thiểu phải lớn hơn hoặc bằng 1',
										},
									}}
									errors={errors}
									fieldRefs={fieldRefs}
									placeholder={'Nhập tồn kho tối thiểu'}
								/>
							</Box>
						</Grid>

						<Grid size={6}>
							<Box sx={{ width: '70%' }}>
								<InputCreateForm
									label={'Tồn kho hiện tại'}
									name={'total_quantity'}
									type="number"
									register={register}
									errors={errors}
									fieldRefs={fieldRefs}
									placeholder={'Nhập tồn kho hiện tại'}
								/>
							</Box>
						</Grid>
					</Grid>
				</Paper>
			</Box>

			{/* ========== SECTION 3: PRICING (THÔNG TIN GIÁ CẢ) ========== */}
			<Box sx={{ mb: 2 }}>
				<Paper sx={{ p: 3, bgcolor: '#f9f9f9' }}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 2,
							mb: 3,
						}}
					>
						<Typography variant="h6" fontWeight={600}>
							Thông tin giá cả
						</Typography>
					</Box>

					<Grid container spacing={2}>
						{/* Cost Price */}
						<Grid size={6}>
							<Box sx={{ width: '70%' }}>
								<InputCreateForm
									label={'Giá vốn'}
									name={'cost'}
									type="number"
									register={register}
									rules={{
										required: 'Giá vốn là bắt buộc',
										min: {
											value: 1,
											message: 'Giá vốn phải lớn hơn 0',
										},
									}}
									errors={errors}
									fieldRefs={fieldRefs}
									placeholder={'Nhập giá vốn'}
									inputProps={{
										step: 1000,
									}}
									InputProps={{
										endAdornment: (
											<Box
												sx={{
													position: 'absolute',
													right: 50,
													color: '#666',
													fontSize: '16px',
												}}
											>
												đ
											</Box>
										),
									}}
								/>
							</Box>
						</Grid>

						{/* Sale Price */}
						<Grid size={6}>
							<Box sx={{ position: 'relative', width: '70%' }}>
								<InputCreateForm
									label={'Giá bán'}
									name={'price'}
									type="number"
									register={register}
									rules={{
										required: 'Giá bán là bắt buộc',
										min: {
											value: 1,
											message: 'Giá bán phải lớn hơn 0',
										},
										validate: (value) => {
											const constValue = parseFloat(
												getValues('cost'),
											);
											if (value < constValue) {
												return 'Giá bán phải lớn hơn giá vốn';
											}
										},
									}}
									errors={errors}
									fieldRefs={fieldRefs}
									placeholder={'Nhập giá bán'}
									inputProps={{
										step: 1000,
									}}
									InputProps={{
										endAdornment: (
											<Box
												sx={{
													position: 'absolute',
													right: 50,
													color: '#666',
													fontSize: '16px',
												}}
											>
												đ
											</Box>
										),
									}}
								/>
							</Box>
						</Grid>
					</Grid>
				</Paper>
			</Box>

			{/* ========== SECTION 4: ADDITIONAL INFORMATION (THÔNG TIN BỔ SUNG) ========== */}
			<Box sx={{ mb: 2 }}>
				<Paper sx={{ p: 3, bgcolor: '#f9f9f9' }}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 2,
							mb: 3,
						}}
					>
						<Typography variant="h6" fontWeight={600}>
							Thông tin bổ sung
						</Typography>
					</Box>

					<Grid container spacing={3}>
						{/* Description */}
						<Grid size={12}>
							<InputCreateForm
								label={'Mô tả sản phẩm'}
								name={'description'}
								register={register}
								errors={errors}
								fieldRefs={fieldRefs}
								placeholder={'Nhập mô tả sản phẩm'}
								multiline
								rows={4}
								flexColumn={true}
							/>
						</Grid>

						{/* Product Image */}
						<Grid size={12}>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									gap: 2,
								}}
							>
								<InputLabel
									sx={{
										textWrap: 'nowrap',
										overflow: 'unset',
									}}
								>
									Hình ảnh sản phẩm
								</InputLabel>
								<Box
									sx={{
										border: '2px dashed #ccc',
										borderRadius: 1,
										p: 2,
										textAlign: 'center',
										cursor: 'pointer',
										transition: 'all 0.3s',
										'&:hover': {
											borderColor: '#1976d2',
											bgcolor: '#f5f5f5',
										},
									}}
									component="label"
								>
									<input
										type="file"
										accept="image/*"
										onChange={handleImageChange}
										style={{ display: 'none' }}
										id="product_image"
									/>
									<Typography
										variant="body2"
										color="textSecondary"
									>
										Chọn hình ảnh hoặc kéo thả file vào đây
									</Typography>
									<Typography
										variant="caption"
										color="textSecondary"
									>
										(Hỗ trợ PNG, JPG, GIF)
									</Typography>
								</Box>

								{/* Image Preview */}
								{imagePreview && (
									<Box
										sx={{
											mt: 2,
											p: 2,
											border: '1px solid #e0e0e0',
											borderRadius: 1,
											bgcolor: '#fafafa',
											textAlign: 'center',
										}}
									>
										<Typography
											variant="subtitle2"
											sx={{ mb: 1 }}
										>
											Xem trước hình ảnh:
										</Typography>
										<img
											src={imagePreview}
											alt="Product preview"
											style={{
												maxWidth: '100%',
												maxHeight: '300px',
												borderRadius: '4px',
											}}
										/>
									</Box>
								)}
							</Box>
						</Grid>
					</Grid>
				</Paper>
			</Box>

			{/* ========== ACTION BUTTONS ========== */}
			<Grid item xs={12}>
				<Box
					sx={{
						display: 'flex',
						gap: 2,
						justifyContent: 'flex-end',
					}}
				>
					<Button
						variant="outlined"
						startIcon={<ClearIcon />}
						onClick={() => {
							if (reset) reset();
							setImagePreview(null);
						}}
						disabled={isSubmitting}
					>
						Hủy
					</Button>
					<Button
						variant="contained"
						color="primary"
						startIcon={<SaveIcon />}
						type="submit"
						disabled={isSubmitting}
						sx={{ position: 'relative' }}
					>
						{isSubmitting ? (
							<>
								<CircularProgress size={20} sx={{ mr: 1 }} />{' '}
								Đang lưu...
							</>
						) : (
							'Lưu sản phẩm'
						)}
					</Button>
				</Box>
			</Grid>
		</form>
	);
};

export default ProductForm;
