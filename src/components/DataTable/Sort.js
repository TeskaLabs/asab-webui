import React, { useState }  from 'react';

import {
	Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

const Sort = ({ sort }) => {

	const [isSortOpen, setSortDropdown] = useState(false);

	return (
		<div className="float-end ms-3 data-table-sort">
			<Dropdown
				isOpen={isSortOpen}
				toggle={() => setSortDropdown(prev => !prev)}
			>
				<DropdownToggle caret>
					{sort.icon && <i className={`${sort.icon} me-1`}></i>}
					{sort.title}
				</DropdownToggle>
				<DropdownMenu>
					{sort.items.map((item, idx) => (
						<DropdownItem onClick={() => sort.onClick(item.value)} key={idx}>
							{item.icon && <i className={`${item.icon} me-1`}></i>}
							{item.name}
						</DropdownItem>
						))
					}
				</DropdownMenu>
			</Dropdown>
		</div>
	);
}

export default Sort;
