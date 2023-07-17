import React, { useState } from "react";

import {
	ListGroup, Input, ButtonDropdown,
	DropdownToggle, InputGroup, InputGroupText
} from "reactstrap";
import SimpleTreeMenu from 'react-simple-tree-menu';

import TreeMenuItem from "./TreeMenuItem";

const TreeMenu = ({
	data, searchOptions, hasSearch, ...props
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
						<InputGroup>
							<InputGroupText className={hasSearch ? "p-0 border-0" : "p-0 border-0 w-100"}>
								{searchOptions?.dropdown && (
									<ButtonDropdown
										className={hasSearch ? "" : "w-100"}
										size="sm"
										isOpen={isDropdownMenuOpen}
										toggle={() => setDropdownMenu(prev => !prev)}
									>
										<DropdownToggle className={hasSearch ? "" : "w-100"} caret>{searchOptions.dropdown.title}</DropdownToggle>
										{searchOptions.dropdown.children}
									</ButtonDropdown>
								)}
							</InputGroupText>
							{hasSearch &&
							<Input
								onChange={e => search(e.target.value)}
								placeholder={searchOptions?.placeholder}
							/>}
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
				)}
			</SimpleTreeMenu>
		</div>
	)
}

export default TreeMenu;
