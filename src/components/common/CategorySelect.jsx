import CategoryService from '@/api/services/categoryService';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';

const CategoryList = ({ onChange, value }) => {
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
			options={categories}
			value={categories.find((c) => c.id === value) || null}
			getOptionLabel={(option) => option?.name || ''}
			onChange={(e, newValue) => {
				onChange(newValue?.id ?? null);
			}}
			renderInput={(params) => (
				<TextField {...params} label="Danh mục" size="small" />
			)}
		/>
	);
};

export default React.memo(CategoryList);
