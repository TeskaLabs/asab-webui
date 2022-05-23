import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
	Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

const LimitDropdown = ({ translationRoute = '', limit = 10, limitValues, setPage, setLimit }) => {

	const { t } = useTranslation();

	const [isLimitOpen, setLimitDropdown] = useState(false);

	return (
		<Dropdown
			isOpen={isLimitOpen}
			toggle={() => setLimitDropdown(prev => !prev)}
			className="float-right"
		>
			<DropdownToggle caret size="sm">
				{t(translationRoute ? `${translationRoute}|Limit` : "Limit")}: {limit}
			</DropdownToggle>
			<DropdownMenu>
				{
					limitValues.map((value, idx) => <DropdownItem onClick={() => { setPage(1); setLimit(value); }} key={idx}>{value}</DropdownItem>)
				}
			</DropdownMenu>
		</Dropdown>
	);
}

export default LimitDropdown;
