import React, { useState } from 'react';

import {
	DropdownToggle, DropdownMenu, DropdownItem,
	ButtonDropdown, Button
} from 'reactstrap';

const CustomDropdownButton = ({
	text, color, size, direction, header, items, split
}) => {
	const [isOpen, setOpen] = useState(false);

	return (
		<ButtonDropdown 
			isOpen={isOpen}
			toggle={() => setOpen(prev => !prev)}
			direction={direction ? direction : "down"}
		>
			{split && (
				<Button 
					id="caret"
					color={split.color || color}
					onClick={split.onClick}
					size={split.size || "sm"}
				>{text}</Button>
			)}
			<DropdownToggle
				split={split ? true : false}
				caret={split ? false : true}
				color={color ? color : "secondary"}
				size={size ? size : "sm"}
			>
				{split ? "" : text}
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
