import React, { createContext, useState, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import createAppTheme from '../theme/theme';

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
	const [mode, setMode] = useState('light');

	const theme = useMemo(() => createAppTheme(mode), [mode]);

	const toggleTheme = () => {
		setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
	};

	return (
		<ThemeContext.Provider value={{ mode, toggleTheme }}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ThemeContext.Provider>
	);
};
