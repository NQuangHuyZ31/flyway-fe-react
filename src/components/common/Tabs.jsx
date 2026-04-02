// src/components/common/Tabs.jsx
// Advanced Tabs component with multiple display modes

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './Tabs.css';

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

	const handleTabClick = useCallback(
		(index) => {
			setActiveTabIndex(index);
			onChange?.(index, tabs[index]);
			onTabChange?.(index);
		},
		[tabs, onChange, onTabChange],
	);

	const activeTab = tabs[activeTabIndex];

	return (
		<div className={`tabs-wrapper ${className}`.trim()}>
			{/* Tab Headers */}
			<div
				className={`tabs-header tabs-${variant} ${
					fullWidth ? 'tabs-full-width' : ''
				} ${tabsClassName}`.trim()}
			>
				<div className="tabs-list" role="tablist">
					{tabs.map((tab, index) => {
						const isActive = index === activeTabIndex;
						const tabClasses = `
							tabs-button
							${isActive ? 'tabs-button-active' : ''}
							${tab.disabled ? 'tabs-button-disabled' : ''}
						`.trim();

						return (
							<button
								key={tab.id || index}
								className={tabClasses}
								onClick={() =>
									!tab.disabled && handleTabClick(index)
								}
								disabled={tab.disabled}
								role="tab"
								aria-selected={isActive}
								aria-controls={`tab-panel-${index}`}
								id={`tab-${index}`}
								type="button"
							>
								{tab.icon && (
									<span
										className="tabs-button-icon"
										aria-hidden="true"
									>
										{typeof tab.icon === 'function' ? (
											<tab.icon />
										) : (
											tab.icon
										)}
									</span>
								)}
								<span className="tabs-button-label">
									{tab.label}
								</span>
								{tab.badge && (
									<span className="tabs-button-badge">
										{tab.badge}
									</span>
								)}
							</button>
						);
					})}
				</div>

				{/* Scroll indicators for small screens */}
				<div className="tabs-scroll-indicator" aria-hidden="true" />
			</div>

			{/* Tab Content */}
			<div
				className={`tabs-content ${
					animated ? 'tabs-animated' : ''
				} ${contentClassName}`.trim()}
			>
				{tabs.map((tab, index) => {
					const isActive = index === activeTabIndex;
					const shouldRender = !lazy || isActive;

					return (
						<div
							key={tab.id || index}
							id={`tab-panel-${index}`}
							className={`tabs-panel ${
								isActive ? 'tabs-panel-active' : ''
							}`}
							role="tabpanel"
							aria-labelledby={`tab-${index}`}
							hidden={!isActive}
						>
							{shouldRender && (
								<div className="tabs-panel-content">
									{typeof tab.content === 'function'
										? tab.content()
										: tab.content}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
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
