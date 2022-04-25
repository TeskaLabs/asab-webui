import React, { useState } from "react";

import {
	ListGroup, Input, ButtonDropdown,
	DropdownToggle, InputGroup, InputGroupText
} from "reactstrap";
import SimpleTreeMenu from 'react-simple-tree-menu';

import TreeMenuItem from "./TreeMenuItem";

const TreeMenu = ({
	data, hasSearch, onClickItem,
	initialActiveKey, initialFocusKey, initialOpenNodes,
	searchOptions
}) => {
	const [isDropdownMenuOpen, setDropdownMenu] = useState(false);

	return (
		<SimpleTreeMenu
			data={data}
			hasSearch={hasSearch} // The search option is nice, but has no api to translate the hint/placeholder
			onClickItem={onClickItem}
			initialActiveKey={initialActiveKey}
			initialFocusKey={initialFocusKey}
			initialOpenNodes={initialOpenNodes}
		>
			{hasSearch && ( ({ search, items }) => (
				<>
					<InputGroup>
						<InputGroupText className="p-0 border-0">
							{searchOptions?.dropdown && (
								<ButtonDropdown
									size="sm"
									className="h-100"
									isOpen={isDropdownMenuOpen}
									toggle={() => setDropdownMenu(prev => !prev)}
								>
									<DropdownToggle caret>{searchOptions.dropdown.title}</DropdownToggle>
									{searchOptions.dropdown.children}
								</ButtonDropdown>
							)}
						</InputGroupText>
						<Input
							onChange={e => search(e.target.value)}
							placeholder={searchOptions?.placeholder}
						/>
					</InputGroup>
					<ListGroup>
						{items.map(({ reset, ...props }) => (
							<TreeMenuItem
								active="false"
								{...props}
							/>
						))}
					</ListGroup>
				</>
			))}
		</SimpleTreeMenu>
	)
}

export default TreeMenu;
