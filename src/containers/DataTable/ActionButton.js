import React, { useState } from 'react';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const ActionButton = ({ actionButton, row, header }) => {
    const [isOpen, setOpen] = useState(false);
    
    return (
        <Dropdown isOpen={isOpen} toggle={() => setOpen(prev => !prev)} size="sm">
				<DropdownToggle><i className="cil-ellipsis"></i></DropdownToggle>
                <DropdownMenu>
                    {actionButton.title && <DropdownItem header>{actionButton.title}</DropdownItem>}
                    {actionButton.actions?.map((action, idx) => (
                        <DropdownItem key={idx} onClick={() => action.onClick(row, header)}>{action.name}</DropdownItem>
                    ))}
                </DropdownMenu>
                
		</Dropdown>
    )
}

export default ActionButton;