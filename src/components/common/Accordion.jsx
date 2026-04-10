// src/components/common/Accordion.jsx
// Advanced Accordion component with smooth animations
// Converted to Material-UI

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
	Accordion as MUIAccordion,
	AccordionSummary,
	AccordionDetails,
	Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Accordion = ({
	items,
	defaultOpenIndex = null,
	allowMultiple = false,
	onChange,
	className = '',
	variant = 'default',
}) => {
	const [expanded, setExpanded] = useState(
		defaultOpenIndex !== null ? `panel${defaultOpenIndex}` : false,
	);

	const handleChange = useCallback(
		(panel) => (event, isExpanded) => {
			const index = parseInt(panel.replace('panel', ''));

			if (!allowMultiple) {
				setExpanded(isExpanded ? panel : false);
			} else {
				setExpanded(isExpanded ? panel : false);
			}

			onChange?.(index, isExpanded ? [index] : []);
		},
		[allowMultiple, onChange],
	);

	return (
		<Box className={className}>
			{items.map((item, index) => (
				<MUIAccordion
					key={item.id || index}
					expanded={expanded === `panel${index}`}
					onChange={handleChange(`panel${index}`)}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls={`panel${index}-content`}
						id={`panel${index}-header`}
					>
						{item.icon && (
							<Box
								sx={{
									marginRight: '12px',
									display: 'flex',
									alignItems: 'center',
								}}
							>
								{item.icon}
							</Box>
						)}
						<Box>
							<Box sx={{ fontWeight: 600 }}>{item.title}</Box>
							{item.subtitle && (
								<Box
									sx={{
										fontSize: '0.875rem',
										color: 'text.secondary',
									}}
								>
									{item.subtitle}
								</Box>
							)}
						</Box>
					</AccordionSummary>
					<AccordionDetails>
						{typeof item.content === 'function'
							? item.content()
							: item.content}
					</AccordionDetails>
				</MUIAccordion>
			))}
		</Box>
	);
};

Accordion.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			title: PropTypes.string.isRequired,
			subtitle: PropTypes.string,
			content: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
				.isRequired,
			icon: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.elementType,
			]),
			disabled: PropTypes.bool,
		}),
	).isRequired,
	defaultOpenIndex: PropTypes.number,
	allowMultiple: PropTypes.bool,
	onChange: PropTypes.func,
	className: PropTypes.string,
	variant: PropTypes.oneOf(['default', 'flush', 'outlined']),
};

export default Accordion;
