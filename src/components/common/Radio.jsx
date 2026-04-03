// src/components/common/Radio.jsx
// Enhanced Radio component with group support
// Converted to Material-UI

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
	FormControlLabel,
	Radio as MUIRadio,
	FormHelperText,
	Box,
} from '@mui/material';

const Radio = forwardRef(
	(
		{
			id,
			name,
			label,
			value,
			checked = false,
			onChange,
			disabled = false,
			error,
			className = '',
			ariaLabel,
			testId,
		},
		ref,
	) => {
		const inputId = id || `${name}-${value}`;

		return (
			<Box>
				<FormControlLabel
					control={
						<MUIRadio
							inputRef={ref}
							name={name}
							value={value}
							checked={checked}
							onChange={onChange}
							disabled={disabled}
							inputProps={{
								'aria-label': ariaLabel || label,
								'data-testid': testId,
							}}
							sx={{
								color: error ? 'error.main' : undefined,
							}}
						/>
					}
					label={label}
					id={inputId}
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

Radio.displayName = 'Radio';

Radio.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	value: PropTypes.string.isRequired,
	checked: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	error: PropTypes.string,
	className: PropTypes.string,
	ariaLabel: PropTypes.string,
	testId: PropTypes.string,
};

export default Radio;
