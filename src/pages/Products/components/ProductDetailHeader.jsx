import {
	Avatar,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Paper,
	Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useState } from 'react';
import Button from '../../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const ProductDetailHeader = ({ product }) => {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState(null);
	const openMenu = Boolean(anchorEl);

	// Show nothing if product data not loaded yet
	if (!product) {
		return null;
	}

	return (
		<Paper
			elevation={2}
			sx={{
				display: 'flex',
				alignItems: 'center',
				p: 3,
				mb: 2,
				gap: 3,
			}}
		>
			<Avatar
				src={product?.product_image_url ?? ''}
				alt={product?.product_name}
				sx={{
					width: 80,
					height: 80,
					mr: 2,
					border: '2px solid #1976d2',
				}}
			/>
			<Box sx={{ flex: 1 }}>
				<Typography
					variant="h5"
					sx={{ fontWeight: 800, color: '#1976d2', mb: 0.5 }}
				>
					{product?.product_name || '---'}
				</Typography>
				<Typography
					variant="body2"
					sx={{ color: '#666', fontWeight: 600, mb: 0.5 }}
				>
					Trạng thái:{' '}
					<Typography
						component="span"
						sx={{
							color: product?.is_active ? 'green' : 'red',
							fontWeight: 700,
							backgroundColor: product?.is_active
								? 'rgba(0, 128, 0, 0.1)'
								: 'rgba(255, 0, 0, 0.1)',
							p: '2px 8px',
							borderRadius: 1,
						}}
					>
						{product?.is_active
							? 'Đang hoạt động'
							: 'Ngừng hoạt động'}
					</Typography>
				</Typography>
				<Typography
					variant="body2"
					sx={{ color: '#666', fontWeight: 600 }}
				>
					Tồn kho: {product?.total_quantity ?? '--'}
				</Typography>
			</Box>
			<Button
				variant="outlined"
				startIcon={<AddIcon />}
				sx={{ borderRadius: 2, fontWeight: 700, mr: 2 }}
				onClick={() => navigate('/products/create')}
			>
				Thêm sản phẩm
			</Button>
			<Button
				variant="contained"
				color="success"
				startIcon={<EditIcon />}
				sx={{ borderRadius: 2, fontWeight: 700, mr: 1 }}
				onClick={() => navigate(`/products/${product?.id}/edit`)}
			>
				Sửa
			</Button>
			<IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
				<MoreVertIcon />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				open={openMenu}
				onClose={() => setAnchorEl(null)}
			>
				<MenuItem>Xóa</MenuItem>
				<MenuItem>
					{product?.is_active ? 'Ngừng hoạt động' : 'Kích hoạt'}
				</MenuItem>
				<MenuItem>Thêm đơn hàng mới</MenuItem>
			</Menu>
		</Paper>
	);
};

export default ProductDetailHeader;
