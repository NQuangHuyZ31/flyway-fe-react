import { TableCell, TableRow } from '@mui/material';
import Input from '../../common/Input';
import CategorySelect from '../../common/CategorySelect';
import UnitMeasureSelect from '../../common/UnitMeasureSelect';

const ProductFilter = ({ headerFilters, onChange }) => {
	return headerFilters.map((filter) => {
		if (filter.key === 'category_id') {
			return (
				<TableCell key={filter.key}>
					<CategorySelect
						onChange={(value) => onChange(filter.key, value)}
					/>
				</TableCell>
			);
		}

		if (filter.key === 'unit_id') {
			return (
				<TableCell key={filter.key}>
					<UnitMeasureSelect
						onChange={(value) => onChange(filter.key, value)}
					/>
				</TableCell>
			);
		}

		return (
			<TableCell key={filter.key}>
				<Input
					placeholder={filter.label}
					onChange={(e) => onChange(filter.key, e.target.value)}
				/>
			</TableCell>
		);
	});
};

export default ProductFilter;
