import { Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import UnitMesureService from '../../api/services/UnitMeasureService';

const UnitMeasureSelect = ({ onChange, value }) => {
	const [unitMeasures, setUnitMeasures] = useState([]);
	const [error, setError] = useState(null);

	const getUnitMeasures = async () => {
		try {
			const res = await UnitMesureService.getUnutMeasures();
			setUnitMeasures(res.data);
			setError(null);
		} catch (error) {
			setError(error.message || 'không thể tải danh mục');
		}
	};

	useEffect(() => {
		getUnitMeasures();
	}, []);

	return (
		<Autocomplete
			options={unitMeasures}
			value={unitMeasures.find((u) => u.id === value) || null}
			getOptionLabel={(option) => option?.name || ''}
			onChange={(e, newValue) => {
				onChange(newValue?.id ?? null);
			}}
			renderInput={(params) => (
				<TextField {...params} label="Đơn vị" size="small" />
			)}
		/>
	);
};

export default React.memo(UnitMeasureSelect);
