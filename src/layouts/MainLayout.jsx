import Header from './Header';
import Sidebar from './Sidebar';
import { Box } from '@mui/material';

export default function MainLayout({ children }) {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
			}}
		>
			<Header />
			<Box sx={{ display: 'flex', flex: 1 }}>
				<Sidebar />
				<Box
					sx={{
						flex: 1,
						overflow: 'auto',
						backgroundColor: '#f5f7fa',
					}}
				>
					<Box sx={{ p: 3 }}>{children}</Box>
				</Box>
			</Box>
		</Box>
	);
}
