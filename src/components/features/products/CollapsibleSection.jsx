import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

// Collapsible Section Component
const CollapsibleSection = ({ title, children, defaultOpen = true }) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	return (
		<Box sx={{ mb: 2 }}>
			<Box
				onClick={() => setIsOpen(!isOpen)}
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					p: 2,
					bgcolor: '#f5f7fa',
					border: '1px solid #e0e0e0',
					borderRadius: 1,
					cursor: 'pointer',
					'&:hover': { bgcolor: '#eff2f7' },
				}}
			>
				<Typography
					variant="subtitle2"
					sx={{ fontWeight: 600, color: '#1a1a1a' }}
				>
					{title}
				</Typography>
				{isOpen ? <ExpandLess /> : <ExpandMore />}
			</Box>

			{isOpen && (
				<Box
					sx={{
						p: 2,
						bgcolor: 'white',
						border: '1px solid #e0e0e0',
						borderTop: 'none',
						borderRadius: '0 0 4px 4px',
					}}
				>
					{children}
				</Box>
			)}
		</Box>
	);
};

export default CollapsibleSection;
