import { Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import UnitMesureService from '../../api/services/UnitMeasureService';

const UnitMeasureSelect = ({ onChange }) => {
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
			id="unit-measure"
			options={unitMeasures}
			autoHighlight
			onChange={(event, value) => onChange(value?.id || '')}
			getOptionLabel={(option) => option.name}
			renderOption={(props, option) => {
				return (
					<Box key={option.code} component="li" {...props}>
						{option.name}
					</Box>
				);
			}}
			renderInput={(params) => <TextField {...params} label="Đơn vị" />}
		/>
	);
};

export default React.memo(UnitMeasureSelect);
