// src/components/common/Checkbox.jsx
// Enhanced Checkbox component with indeterminate state
// Converted to Material-UI

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
	FormControlLabel,
	Checkbox as MUICheckbox,
	FormHelperText,
	Box,
} from '@mui/material';

const Checkbox = forwardRef(
	(
		{
			id,
			name,
			label,
			value,
			checked = false,
			onChange,
			disabled = false,
			indeterminate = false,
			error,
			className = '',
			ariaLabel,
			testId,
		},
		ref,
	) => {
		const inputId = id || name;

		return (
			<Box>
				<FormControlLabel
					control={
						<MUICheckbox
							inputRef={ref}
							id={inputId}
							name={name}
							value={value}
							checked={checked}
							onChange={onChange}
							disabled={disabled}
							indeterminate={indeterminate}
							aria-label={ariaLabel || label}
							inputProps={{
								'data-testid': testId,
							}}
							sx={{
								color: error ? 'error.main' : undefined,
							}}
						/>
					}
					label={label}
					sx={{
						opacity: disabled ? 0.6 : 1,
					}}
				/>
				{error && (
					<FormHelperText error sx={{ marginLeft: '32px' }}>
						{error}
					</FormHelperText>
				)}
			</Box>
		);
	},
);

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
	checked: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	indeterminate: PropTypes.bool,
	error: PropTypes.string,
	className: PropTypes.string,
	ariaLabel: PropTypes.string,
	testId: PropTypes.string,
};

export default Checkbox;
