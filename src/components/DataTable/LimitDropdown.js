import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
	Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

const LimitDropdown = ({ translationRoute = '', limit = 10, limitValues, setPage, setLimit }) => {

	const { t } = useTranslation();

	const [isLimitOpen, setLimitDropdown] = useState(false);

	return (
		<div className="data-table-limit">
			{/* {t(translationRoute ? `${translationRoute}|Limit` : "Limit")}: */}
			{/* TODO: Add translation */}
			Items per page: 
			<Dropdown
				isOpen={isLimitOpen}
				toggle={() => setLimitDropdown(prev => !prev)}
				className="data-table-limit-dropdown"
			>
				<DropdownToggle caret >
					{limit}
				</DropdownToggle>
				<DropdownMenu>
				{
					limitValues.map((value, idx) => <DropdownItem onClick={() => { setPage(1); setLimit(value); }} key={idx}>{value}</DropdownItem>)
				}
				</DropdownMenu>
			</Dropdown>
		</div>
	);
}

export default LimitDropdown;
