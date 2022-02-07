import React from 'react';

import "./styles.scss";

const TreeMenuItem = ({
	level = 0, hasNodes, isOpen,
	label, searchTerm, openNodes,
	toggleNode, matchSearch, focused,
	type, isDisabled, ...props
}) => {
	const paddingLeft = 0.75 + 3.5 * level

	return (
		<li
			{...props}
			className="tree-menu-item"
			style={{
				paddingLeft: paddingLeft + "rem",
				boxShadow: focused ? '0px 0px 5px 0px #222' : 'none',
				zIndex: focused ? 999 : 'unset',
				color: type==="file" && isDisabled ? '#6a6a6a8f' : "initial"
			}}
		>
			{hasNodes && (
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

const ToggleIcon = ({ on }) => <span style={{ marginRight: 8 }}>{on ? '-' : '+'}</span>;

export default TreeMenuItem;
