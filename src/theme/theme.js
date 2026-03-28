import { createTheme } from '@mui/material/styles';

// Color palette for light and dark modes
const lightPalette = {
	primary: {
		main: '#1976d2',
		light: '#42a5f5',
		dark: '#1565c0',
		contrastText: '#fff',
	},
	secondary: {
		main: '#dc004e',
		light: '#f05545',
		dark: '#9a0036',
		contrastText: '#fff',
	},
	success: {
		main: '#4caf50',
		light: '#81c784',
		dark: '#388e3c',
	},
	warning: {
		main: '#ff9800',
		light: '#ffb74d',
		dark: '#f57c00',
	},
	error: {
		main: '#f44336',
		light: '#ef5350',
		dark: '#d32f2f',
	},
	info: {
		main: '#2196f3',
		light: '#64b5f6',
		dark: '#1976d2',
	},
	background: {
		default: '#fafafa',
		paper: '#ffffff',
	},
	text: {
		primary: 'rgba(0, 0, 0, 0.87)',
		secondary: 'rgba(0, 0, 0, 0.6)',
		disabled: 'rgba(0, 0, 0, 0.38)',
	},
	divider: 'rgba(0, 0, 0, 0.12)',
};

const darkPalette = {
	primary: {
		main: '#90caf9',
		light: '#bbdefb',
		dark: '#1565c0',
		contrastText: '#000',
	},
	secondary: {
		main: '#f48fb1',
		light: '#f8bbd0',
		dark: '#c2185b',
		contrastText: '#000',
	},
	success: {
		main: '#66bb6a',
		light: '#a5d6a7',
		dark: '#2e7d32',
	},
	warning: {
		main: '#ffa726',
		light: '#ffb74d',
		dark: '#f57f17',
	},
	error: {
		main: '#ef5350',
		light: '#e57373',
		dark: '#c62828',
	},
	info: {
		main: '#64b5f6',
		light: '#81d4fa',
		dark: '#0d47a1',
	},
	background: {
		default: '#121212',
		paper: '#1e1e1e',
	},
	text: {
		primary: '#ffffff',
		secondary: 'rgba(255, 255, 255, 0.7)',
		disabled: 'rgba(255, 255, 255, 0.5)',
	},
	divider: 'rgba(255, 255, 255, 0.12)',
};

const createAppTheme = (mode) => {
	const palette = mode === 'light' ? lightPalette : darkPalette;

	return createTheme({
		palette: {
			mode,
			...palette,
		},
		typography: {
			fontFamily: [
				'-apple-system',
				'BlinkMacSystemFont',
				'"Segoe UI"',
				'Roboto',
				'"Helvetica Neue"',
				'Arial',
				'sans-serif',
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
			].join(','),
			h1: {
				fontSize: '2.5rem',
				fontWeight: 700,
				lineHeight: 1.2,
			},
			h2: {
				fontSize: '2rem',
				fontWeight: 700,
				lineHeight: 1.3,
			},
			h3: {
				fontSize: '1.75rem',
				fontWeight: 600,
			},
			h4: {
				fontSize: '1.5rem',
				fontWeight: 600,
			},
			h5: {
				fontSize: '1.25rem',
				fontWeight: 600,
			},
			h6: {
				fontSize: '1rem',
				fontWeight: 600,
			},
			body1: {
				fontSize: '0.95rem',
				lineHeight: 1.5,
			},
			body2: {
				fontSize: '0.875rem',
				lineHeight: 1.43,
			},
			button: {
				textTransform: 'none',
				fontWeight: 600,
			},
		},
		shape: {
			borderRadius: 8,
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						borderRadius: 8,
						padding: '10px 24px',
						fontSize: '0.95rem',
						fontWeight: 600,
						textTransform: 'none',
						boxShadow: 'none',
						'&:hover': {
							boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
						},
					},
					contained: {
						boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
					},
				},
			},
			MuiCard: {
				styleOverrides: {
					root: {
						borderRadius: 12,
						boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
					},
				},
			},
			MuiTextField: {
				styleOverrides: {
					root: {
						'& .MuiOutlinedInput-root': {
							borderRadius: 8,
						},
					},
				},
			},
			MuiDataGrid: {
				styleOverrides: {
					root: {
						borderRadius: 8,
						'& .MuiDataGrid-cell': {
							borderBottom: `1px solid ${
								mode === 'light' ? '#e0e0e0' : '#424242'
							}`,
						},
					},
				},
			},
		},
	});
};

export default createAppTheme;
