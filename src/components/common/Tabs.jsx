// src/components/common/Tabs.jsx
// Advanced Tabs component with multiple display modes
// Converted to Material-UI

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Tabs as MUITabs, Tab as MUITab, Box, Badge } from '@mui/material';

const Tabs = ({
	tabs,
	defaultActiveTab = 0,
	onChange,
	variant = 'default',
	fullWidth = false,
	animated = true,
	lazy = false,
	onTabChange,
	className = '',
	tabsClassName = '',
	contentClassName = '',
}) => {
	const [activeTabIndex, setActiveTabIndex] = useState(defaultActiveTab);

	const handleTabChange = useCallback(
		(event, newValue) => {
			setActiveTabIndex(newValue);
			onChange?.(newValue, tabs[newValue]);
			onTabChange?.(newValue);
		},
		[tabs, onChange, onTabChange],
	);

	const variantMap = {
		default: 'standard',
		pills: 'scrollable',
		underline: 'standard',
		card: 'fullWidth',
	};

	const muiVariant = variantMap[variant] || 'standard';

	const activeTab = tabs[activeTabIndex];

	return (
		<Box className={className}>
			{/* Tab Headers */}
			<MUITabs
				value={activeTabIndex}
				onChange={handleTabChange}
				variant={fullWidth ? 'fullWidth' : 'standard'}
				className={tabsClassName}
				sx={{
					'& .MuiTab-root': {
						textTransform: 'none',
						minWidth: 'auto',
						padding: '12px 16px',
					},
					'& .MuiTabScrollButton-root': {
						color: 'primary.main',
					},
				}}
			>
				{tabs.map((tab, index) => {
					const label = tab.badge ? (
						<Badge
							badgeContent={tab.badge}
							color="primary"
							sx={{ '& .MuiBadge-badge': { top: 0, right: 0 } }}
						>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '8px',
								}}
							>
								{tab.icon && typeof tab.icon === 'function' ? (
									<tab.icon />
								) : (
									tab.icon
								)}
								<span>{tab.label}</span>
							</Box>
						</Badge>
					) : (
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: '8px',
							}}
						>
							{tab.icon && typeof tab.icon === 'function' ? (
								<tab.icon />
							) : (
								tab.icon
							)}
							<span>{tab.label}</span>
						</Box>
					);

					return (
						<MUITab
							key={tab.id || index}
							label={label}
							disabled={tab.disabled}
							id={`tab-${index}`}
							aria-controls={`tab-panel-${index}`}
						/>
					);
				})}
			</MUITabs>

			{/* Tab Content */}
			<Box className={contentClassName}>
				{tabs.map((tab, index) => {
					const isActive = index === activeTabIndex;
					const shouldRender = !lazy || isActive;

					return (
						<Box
							key={tab.id || index}
							id={`tab-panel-${index}`}
							role="tabpanel"
							aria-labelledby={`tab-${index}`}
							hidden={!isActive}
							sx={{
								display: isActive ? 'block' : 'none',
								animation:
									animated && isActive
										? 'fadeIn 0.3s ease-in'
										: 'none',
								'@keyframes fadeIn': {
									from: { opacity: 0 },
									to: { opacity: 1 },
								},
								padding: '16px 0',
							}}
						>
							{shouldRender && (
								<Box>
									{typeof tab.content === 'function'
										? tab.content()
										: tab.content}
								</Box>
							)}
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};

Tabs.propTypes = {
	tabs: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			label: PropTypes.string.isRequired,
			content: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
				.isRequired,
			disabled: PropTypes.bool,
			icon: PropTypes.oneOfType([
				PropTypes.elementType,
				PropTypes.string,
			]),
			badge: PropTypes.string,
		}),
	).isRequired,
	defaultActiveTab: PropTypes.number,
	onChange: PropTypes.func,
	onTabChange: PropTypes.func,
	variant: PropTypes.oneOf(['default', 'pills', 'underline', 'card']),
	fullWidth: PropTypes.bool,
	animated: PropTypes.bool,
	lazy: PropTypes.bool,
	className: PropTypes.string,
	tabsClassName: PropTypes.string,
	contentClassName: PropTypes.string,
};

export default Tabs;
