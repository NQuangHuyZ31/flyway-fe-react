import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState, useMemo } from 'react';
import unitMeasureService from '@/api/services/unitMeasureService';

const UnitMeasureSelect = ({ onChange, value, error, helperText }) => {
	const [unitMeasures, setUnitMeasures] = useState([]);
	const [loadError, setLoadError] = useState(null);

	const getUnitMeasures = async () => {
		try {
			const res = await unitMeasureService.getUnitMeasures();
			setUnitMeasures(res);
			setLoadError(null);
		} catch (err) {
			setLoadError(err.message || 'không thể tải danh mục');
		}
	};

	useEffect(() => {
		getUnitMeasures();
	}, []);

	// Find selected unit by ID - recalculate when unitMeasures or value changes
	const selectedUnit = useMemo(() => {
		if (!value || !unitMeasures.length) return null;
		return unitMeasures.find((u) => u.id === value) || null;
	}, [unitMeasures, value]);

	return (
		<Autocomplete
			fullWidth
			options={unitMeasures}
			value={selectedUnit}
			getOptionLabel={(option) => option?.name || ''}
			onChange={(e, newValue) => {
				onChange(newValue?.id ?? null);
			}}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Đơn vị"
					size="small"
					fullWidth
					error={error}
					helperText={helperText}
				/>
			)}
		/>
	);
};

export default React.memo(UnitMeasureSelect);
