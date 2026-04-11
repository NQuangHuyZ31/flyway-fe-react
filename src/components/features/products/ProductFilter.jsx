import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TableCell,
} from '@mui/material';
import Input from '../../common/Input';
import CategorySelect from '../../common/CategorySelect';
import UnitMeasureSelect from '../../common/UnitMeasureSelect';

const ProductFilter = ({ headerFilters, filters, onChange }) => {
	return headerFilters.map((filter) => {
		if (filter.key === 'category_id') {
			return (
				<TableCell key={filter.key}>
					<CategorySelect
						value={filters[filter.key] ?? ''}
						onChange={(value) => onChange(filter.key, value)}
					/>
				</TableCell>
			);
		}

		if (filter.key === 'unit_id') {
			return (
				<TableCell key={filter.key}>
					<UnitMeasureSelect
						value={filters[filter.key] ?? ''}
						onChange={(value) => onChange(filter.key, value)}
					/>
				</TableCell>
			);
		}

		if (filter.key === 'is_active') {
			return (
				<TableCell key={filter.key}>
					<FormControl sx={{ minWidth: 120 }} size="small">
						<InputLabel id={`filter-${filter.key}-label`}>
							{filter.label}
						</InputLabel>
						<Select
							value={filters[filter.key] ?? ''}
							onChange={(e) =>
								onChange(filter.key, e.target.value)
							}
							labelId={`filter-${filter.key}-label`}
						>
							<MenuItem value="all">Tất cả</MenuItem>
							<MenuItem value="1">Hoạt động</MenuItem>
							<MenuItem value="0">Không hoạt động</MenuItem>
						</Select>
					</FormControl>
				</TableCell>
			);
		}

		return (
			<TableCell key={filter.key}>
				<Input
					type={filter.type}
					value={filters[filter.key] ?? ''}
					placeholder={filter.label}
					onChange={(e) => onChange(filter.key, e.target.value)}
					min={filter.type === 'number' ? 1 : undefined}
				/>
			</TableCell>
		);
	});
};

export default ProductFilter;
