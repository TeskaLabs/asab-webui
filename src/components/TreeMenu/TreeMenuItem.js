import React from 'react';

const TreeMenuItem = ({
	level = 0, hasNodes, isOpen,
	label, searchTerm, openNodes,
	toggleNode, matchSearch, focused,
	type, isDisabled, ...props
}) => {
	const paddingLeft = 1.25 * level + 0.5;
	const selected = focused && !hasNodes ? " selected" : "";
	const disabled = isDisabled ? " disabled" : "";

	return (
		<li
			{...props}
			active="false"
			className={`tree-menu-item${selected}${disabled}`}
			style={{ paddingLeft: `${paddingLeft}rem` }}
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
