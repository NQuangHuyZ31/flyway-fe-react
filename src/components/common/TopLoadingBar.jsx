import { LinearProgress } from '@mui/material';

export default function TopLoadingBar({ loading }) {
	return (
		loading && (
			<LinearProgress
				sx={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					zIndex: 9999,
				}}
			/>
		)
	);
}
