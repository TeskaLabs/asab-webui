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
						<InputGroup>
							<InputGroupText className={props.hasSearch ? "p-0 border-0" : "p-0 border-0 w-100"}>
								{searchOptions?.dropdown && (
									<ButtonDropdown
										className={props.hasSearch ? "" : "w-100"}
										size="sm"
										isOpen={isDropdownMenuOpen}
										toggle={() => setDropdownMenu(prev => !prev)}
									>
										<DropdownToggle className={props.hasSearch ? "" : "w-100"} caret>{searchOptions.dropdown.title}</DropdownToggle>
										{searchOptions.dropdown.children}
									</ButtonDropdown>
								)}
							</InputGroupText>
							{props.hasSearch &&
							<Input
								onChange={e => search(e.target.value)}
								placeholder={searchOptions?.placeholder}
							/>}
						</InputGroup>
						<ListGroup>
							{items.map(({ reset, ...params }) => (
								<TreeMenuItem
									active="false"
									{...params}
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
