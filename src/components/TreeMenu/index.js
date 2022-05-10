import React, { useState } from "react";

import {
	ListGroup, Input, ButtonDropdown,
	DropdownToggle, InputGroup, InputGroupText
} from "reactstrap";
import SimpleTreeMenu from 'react-simple-tree-menu';

import TreeMenuItem from "./TreeMenuItem";

const TreeMenu = ({
	data, searchOptions, ...props
}) => {
	const [isDropdownMenuOpen, setDropdownMenu] = useState(false);

	return (
		<div className="tree-menu">
			<SimpleTreeMenu
				data={data}
				{...props}
			>
				{({ search, items }) => (
					<>
						{ props.hasSearch && (
							<InputGroup>
								<InputGroupText className="p-0 border-0">
									{searchOptions?.dropdown && (
										<ButtonDropdown
											size="sm"
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
						)}
						<ListGroup>
							{items.map(({ reset, ...props }) => (
								<TreeMenuItem
									active="false"
									{...props}
								/>
							))}
						</ListGroup>
					</>
				)}
			</SimpleTreeMenu>
		</div>
	)
}

export default TreeMenu;
