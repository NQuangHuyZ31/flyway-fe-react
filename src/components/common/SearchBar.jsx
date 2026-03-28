import React from 'react';
import { TextField, InputAdornment, useTheme } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

/**
 * Search Bar Component
 * Reusable search input field with icon
 */
const SearchBar = ({
	value = '',
	onChange,
	placeholder = 'Search...',
	fullWidth = true,
	size = 'medium',
	onSearch,
}) => {
	const theme = useTheme();

	const handleKeyPress = (e) => {
		if (e.key === 'Enter' && onSearch) {
			onSearch(value);
		}
	};

	return (
		<TextField
			value={value}
			onChange={(e) => onChange(e.target.value)}
			onKeyPress={handleKeyPress}
			placeholder={placeholder}
			fullWidth={fullWidth}
			size={size}
			variant="outlined"
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<SearchIcon
							sx={{ color: theme.palette.text.secondary }}
						/>
					</InputAdornment>
				),
			}}
			sx={{
				'& .MuiOutlinedInput-root': {
					borderRadius: 1,
				},
			}}
		/>
	);
};

export default SearchBar;
