import categoryService from '@/api/services/categoryService';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState, useMemo } from 'react';

const CategoryList = ({ onChange, value, error, helperText }) => {
	const [categories, setCategories] = useState([]);
	const [loadError, setLoadError] = useState(null);

	const getCategory = async () => {
		try {
			const res = await categoryService.getCategories();
			setCategories(res);
			setLoadError(null);
		} catch (err) {
			setLoadError(err.message || 'không thể tải danh mục');
		}
	};

	useEffect(() => {
		getCategory();
	}, []);

	// Find selected category by ID - recalculate when categories or value changes
	const selectedCategory = useMemo(() => {
		if (!value || !categories.length) return null;
		return categories.find((c) => c.id === value) || null;
	}, [categories, value]);

	return (
		<Autocomplete
			fullWidth
			options={categories}
			value={selectedCategory}
			getOptionLabel={(option) => option?.name || ''}
			onChange={(e, newValue) => {
				onChange(newValue?.id ?? null);
			}}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Danh mục"
					size="small"
					fullWidth
					error={error}
					helperText={helperText}
				/>
			)}
		/>
	);
};

export default React.memo(CategoryList);
