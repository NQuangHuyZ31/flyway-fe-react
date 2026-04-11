import {
	Avatar,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Paper,
	Typography,
} from '@mui/material';
import TagIcon from '@mui/icons-material/LocalOffer';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useState } from 'react';
import Button from '../../../components/common/Button';

const ProductDetailHeader = ({ product }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const openMenu = Boolean(anchorEl);

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
				src={product?.avatar}
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
					{product?.is_active === 1 ? 'Hoạt động' : 'Không hoạt động'}
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
				startIcon={<TagIcon />}
				sx={{ borderRadius: 2, fontWeight: 700, mr: 2 }}
			>
				Gắn Tag
			</Button>
			<Button
				variant="contained"
				color="success"
				startIcon={<EditIcon />}
				sx={{ borderRadius: 2, fontWeight: 700, mr: 1 }}
			>
				Sửa
			</Button>
			<Button
				variant="outlined"
				color="primary"
				sx={{ borderRadius: 2, fontWeight: 700, mr: 1 }}
			>
				Theo dõi
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
				<MenuItem>Nhân bản</MenuItem>
			</Menu>
		</Paper>
	);
};

export default ProductDetailHeader;
