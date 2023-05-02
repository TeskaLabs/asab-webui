import React from 'react';

import './treemenu.scss';

const TreeMenuItem = ({
	level = 0, hasNodes, isOpen,
	label, searchTerm, openNodes,
	toggleNode, matchSearch, focused,
	type, isDisabled, ...props
}) => {
	const paddingLeft = 1.25 * level + 0.5;
	const selected = focused ? " selected" : "";
	const disabled = isDisabled ? " disabled" : "";

	// Method to manage clicks on whole rows of the Tree item
	const handleClick = (e) => {
		// If type is folder and node is closed, make whole line clickable for toggling nodes
		if ((type == "folder") && (isOpen == false)) {
			e.stopPropagation();
			hasNodes && toggleNode && toggleNode();
		}
		props.onClick && props.onClick();
	}

	return (
		<li
			{...props}
			active="false"
			className={`tree-menu-item${selected}${disabled}`}
			style={{ paddingLeft: `${paddingLeft}rem` }}
			onClick={e => {handleClick(e)}}
		>
			{(type == "folder") && (
				<div
					style={{ display: 'inline-block' }}
					// Clickable toggle icon, not restricted as handleClick method
					onClick={e => {
						e.stopPropagation();
						hasNodes && toggleNode && toggleNode();
					}}
				>
					<ToggleIcon on={isOpen} selected={selected} />
				</div>
			)}
			{label}
		</li>
	)
};

const ToggleIcon = ({ on, selected }) => <span className="menu-span"><i className={`menu-toggle-icon ${selected} ${on ? "cil-arrow-circle-bottom" : "cil-arrow-circle-right"}`}/></span>;

export default TreeMenuItem;
