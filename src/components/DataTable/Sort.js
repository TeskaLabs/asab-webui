import React, { useState }  from 'react';

import {
	Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

const Sort = ({ sort }) => {

	const [isSortOpen, setSortDropdown] = useState(false);

	return (
		<Dropdown
            isOpen={isSortOpen}
            toggle={() => setSortDropdown(prev => !prev)}
        >
            <DropdownToggle size="sm" caret>
                {sort.icon && <i className={`${sort.icon} mr-1`}></i>}
                {sort.title}
            </DropdownToggle>
            <DropdownMenu>
            {
                sort.items.map((item, idx) => (
                    <DropdownItem onClick={() => sort.onClick(item.value)} key={idx}>
                        {item.icon && <i className={`${item.icon} mr-1`}></i>}
                        {item.name}
                    </DropdownItem>
                ))
            }
            </DropdownMenu>
        </Dropdown>
	);
}

export default Sort;
