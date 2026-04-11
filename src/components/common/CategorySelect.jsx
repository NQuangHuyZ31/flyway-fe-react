import CategoryService from '@/api/services/categoryService';
import { Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';

const CategoryList = ({ onChange }) => {
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(null);

	const getCategory = async () => {
		try {
			const res = await CategoryService.getCategories();
			setCategories(res.data);
			setError(null);
		} catch (error) {
			setError(error.message || 'không thể tải danh mục');
		}
	};

	useEffect(() => {
		getCategory();
	}, []);

	return (
		<Autocomplete
			id="category"
			options={categories}
			autoHighlight
			onChange={(event, value) => onChange(value?.id || '')}
			getOptionLabel={(option) => option.name}
			renderOption={(props, option) => {
				return (
					<Box key={option.id} component="li" {...props}>
						{option.name}
					</Box>
				);
			}}
			renderInput={(params) => <TextField {...params} label="Danh mục" />}
		/>
	);
};

export default React.memo(CategoryList);
