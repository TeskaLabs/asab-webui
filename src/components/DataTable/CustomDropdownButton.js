import React, { useState } from 'react';

import {
	DropdownButton, DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown
} from 'reactstrap';

const CustomDropdownButton = ({
	text, color, size, direction, header, items
}) => {
	const [isOpen, setOpen] = useState(false);

	return (
		<ButtonDropdown 
			isOpen={isOpen}
			toggle={() => setOpen(prev => !prev)}
			direction={direction ? direction : "down"}
		>
			<DropdownToggle
				caret
				color={color ? color : "secondary"}
				size={size ? size : "sm"}
			>
				{text}
			</DropdownToggle>
			<DropdownMenu>
				{header && <DropdownItem header>{header}</DropdownItem>}
				{items.map((item, idx) => (
					<DropdownItem
						key={idx}
						onClick={() => item?.props.onClick()}
						{...item.props}
					>
						{item.text}
					</DropdownItem>
				))}
			</DropdownMenu>
		</ButtonDropdown>
	);
}

export default CustomDropdownButton;
