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

	return (
		<li
			{...props}
			active="false"
			className={`tree-menu-item${selected}${disabled}`}
			style={{ paddingLeft: `${paddingLeft}rem` }}
		>
			{(type == "folder") && (
				<div
					style={{ display: 'inline-block' }}
					onClick={e => {
						e.stopPropagation();
						hasNodes && toggleNode && toggleNode();
					}}
				>
					<ToggleIcon on={isOpen} />
				</div>
			)}
			{label}
		</li>
	)
};

const ToggleIcon = ({ on }) => <span className="menu-span"><code className="menu-toggle-icon">{on ? '-' : '+'}</code></span>;

export default TreeMenuItem;
