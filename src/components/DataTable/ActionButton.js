import React, { useState } from 'react';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const ActionButton = ({ actionButton, row, header }) => {
	const [isOpen, setOpen] = useState(false);
	
	return (
		<Dropdown
			className="action-button-dropdown float-right mr-2"
			isOpen={isOpen}
			toggle={() => setOpen(prev => !prev)}
			size="sm"
		>
				<DropdownToggle 
					className="action-button-dropdown-toggle text-primary"
					tag="span"
					style={{ textDecoration: "none", cursor: "pointer" }}
				>
					<i className="cil-ellipsis" style={{ fontSize: "1.25rem" }}></i>
				</DropdownToggle>
				<DropdownMenu>
					{actionButton.title && (
						<DropdownItem
							header 
							className="action-button-dropdown-header"
						>
							<span style={{ fontWeight: 700 }}>{actionButton.title}</span>
						</DropdownItem>
					)}
					{actionButton.actions?.map((action, idx) => (
						<DropdownItem
							className="action-button-dropdown-item"
							key={idx}
							onClick={() => action.onClick(row, header)}
						>
							{action.icon && <i className={action.icon}></i>}
							{action.name}
						</DropdownItem>
					))}
				</DropdownMenu>
				
		</Dropdown>
	)
}

export default ActionButton;