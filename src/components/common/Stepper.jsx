// src/components/common/Stepper.jsx
// Step indicator component for multi-step forms/processes

import React from 'react';
import PropTypes from 'prop-types';
import './Stepper.css';

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
}) => {
	const stepperClasses = `
		stepper
		stepper-${variant}
		stepper-${orientation}
		${className}
	`.trim();

	const getStepStatus = (index) => {
		if (index < currentStep) return 'completed';
		if (index === currentStep) return 'active';
		return 'pending';
	};

	const handleStepClick = (index) => {
		if (clickable && index !== currentStep) {
			onStepClick?.(index);
		}
	};

	return (
		<div className={stepperClasses}>
			<div className="stepper-track">
				{steps.map((step, index) => {
					const status = getStepStatus(index);
					const isClickable = clickable && index !== currentStep;
					const stepClasses = `
						stepper-step
						stepper-step-${status}
						${isClickable ? 'stepper-step-clickable' : ''}
						${editable && status === 'completed' ? 'stepper-step-editable' : ''}
					`.trim();

					return (
						<React.Fragment key={step.id || index}>
							{/* Step indicator */}
							<div
								className={stepClasses}
								onClick={() => handleStepClick(index)}
								role={isClickable ? 'button' : 'presentation'}
								tabIndex={isClickable ? 0 : -1}
							>
								<div className="stepper-marker">
									{status === 'completed' && !showNumbers ? (
										<span className="stepper-icon">✓</span>
									) : (
										<span className="stepper-number">
											{showNumbers ? index + 1 : ''}
										</span>
									)}
								</div>

								{showLabels && (
									<div className="stepper-label">
										<div className="stepper-title">
											{step.label}
										</div>
										{step.description && (
											<div className="stepper-description">
												{step.description}
											</div>
										)}
									</div>
								)}
							</div>

							{/* Connector line */}
							{index < steps.length - 1 && (
								<div
									className={`
										stepper-connector
										${index < currentStep ? 'stepper-connector-completed' : ''}
									`.trim()}
								/>
							)}
						</React.Fragment>
					);
				})}
			</div>
		</div>
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
};

export default Stepper;
