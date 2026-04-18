import { Box, InputLabel, TextField } from '@mui/material';

const InputCreateForm = ({
	label,
	name,
	register,
	rules,
	fieldRefs,
	placeholder,
	fullWidth = true,
	errors = {},
	handleCheckDuplicate,
	flexColumn = false,
	size = 'small',
	type = 'text',
	...props
}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: flexColumn ? 'flex-start' : 'center',
				flexDirection: flexColumn ? 'column' : 'row',
				gap: 3,
				mb: 2,
			}}
		>
			<InputLabel
				sx={{
					textWrap: 'nowrap',
					overflow: 'unset',
					minWidth: 120,
				}}
			>
				{label}
			</InputLabel>
			<TextField
				{...register(name, {
					...rules,
				})}
				fullWidth={fullWidth}
				placeholder={`Nhập ${label}`}
				error={!!errors[name]}
				helperText={errors[name]?.message}
				variant="outlined"
				size={size}
				type={type}
				inputRef={(ref) => {
					if (ref) fieldRefs.current[name] = ref;
				}}
				onBlur={
					handleCheckDuplicate
						? (e) => handleCheckDuplicate(name, e.target.value)
						: undefined
				}
				{...props}
			/>
		</Box>
	);
};

export default InputCreateForm;
