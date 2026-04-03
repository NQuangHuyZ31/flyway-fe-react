// src/components/common/Stepper.jsx
// Step indicator component using Material-UI

import React from 'react';
import PropTypes from 'prop-types';
import {
	Stepper as MUIStepper,
	Step,
	StepLabel,
	StepContent,
	Box,
} from '@mui/material';

const Stepper = ({
	steps,
	currentStep = 0,
	completed = [],
	clickable = false,
	onStepClick,
	variant = 'default',
	orientation = 'horizontal',
	showLabels = true,
	showNumbers = true,
	className = '',
	editable = false,
	children,
}) => {
	const handleStepClick = (index) => {
		if (clickable && index !== currentStep) {
			onStepClick?.(index);
		}
	};

	const isStepSkipped = (index) => {
		return completed.includes(index);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<MUIStepper
				activeStep={currentStep}
				orientation={orientation}
				nonLinear={clickable}
			>
				{steps.map((step, index) => {
					const isCompleted = isStepSkipped(index);
					const labelProps = {};
					const stepProps = {};

					if (isCompleted) {
						stepProps.completed = true;
						labelProps.completed = true;
					}

					return (
						<Step
							key={step.id || index}
							{...stepProps}
							onClick={() => handleStepClick(index)}
							sx={{
								cursor: clickable ? 'pointer' : 'default',
							}}
						>
							<StepLabel
								{...labelProps}
								optional={
									step.description ? (
										<Box
											sx={{
												fontSize: '0.875rem',
												color: 'text.secondary',
											}}
										>
											{step.description}
										</Box>
									) : null
								}
							>
								{showLabels ? step.label : ''}
							</StepLabel>
							{orientation === 'vertical' && (
								<StepContent>
									<Box sx={{ py: 2 }}>{children}</Box>
								</StepContent>
							)}
						</Step>
					);
				})}
			</MUIStepper>
		</Box>
	);
};

Stepper.propTypes = {
	steps: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			label: PropTypes.string.isRequired,
			description: PropTypes.string,
			disabled: PropTypes.bool,
		}),
	).isRequired,
	currentStep: PropTypes.number,
	completed: PropTypes.arrayOf(PropTypes.number),
	clickable: PropTypes.bool,
	onStepClick: PropTypes.func,
	variant: PropTypes.oneOf(['default', 'outlined', 'filled']),
	orientation: PropTypes.oneOf(['horizontal', 'vertical']),
	showLabels: PropTypes.bool,
	showNumbers: PropTypes.bool,
	className: PropTypes.string,
	editable: PropTypes.bool,
	children: PropTypes.node,
};

export default Stepper;
