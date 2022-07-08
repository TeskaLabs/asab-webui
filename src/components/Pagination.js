import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Pagination, PaginationItem, PaginationLink, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';

export default function ({ currentPage, setPage, lastPage, style }) {
	const slots = Math.min(5, lastPage);

	let start = currentPage - Math.floor(slots / 2);
	let end = currentPage + Math.floor(slots / 2);

	const [open, setOpen] = useState(false);

	const { t, i18n } = useTranslation();

	if (start < 1) {
		start = 1;
		end = Math.min(slots, lastPage);
	}

	else if (end > lastPage) {
		start = Math.max(lastPage - slots + 1, 1);
		end = lastPage;
	}

	let pages = [];
	for (let i = start; i <= end; i++) {
		pages.push(i);
	}

	if (pages.length === 0) {
		pages.push(1)
	}

	useEffect(() => {
		if (currentPage > lastPage && lastPage != 0) {
			setPage(lastPage);
		}
	}, [lastPage])

	return (
		<div className="data-table-pagination" style={style}>	
			<Dropdown 
				isOpen={open}
				toggle={() => setOpen(prev => !prev)} 
				direction="down"
			>
				<DropdownToggle caret>
					{currentPage}
				</DropdownToggle>
				<DropdownMenu>
					{pages.map((page, idx) =>
						<DropdownItem key={idx} onClick={() => setPage(page)}>
							{page}
						</DropdownItem>
					)} 

				</DropdownMenu>
			</Dropdown>

			<div className="mr-2">
				{pages.length > 1 ? t('Pages', {pages: pages.length}) : t('Page', {pages: pages.length})}
			</div>

			<Pagination>
				<PaginationItem disabled={currentPage <= 1}>
					<PaginationLink
						previous
						onClick={() => setPage(Math.max(1, currentPage - 1))}
						>
						<i className="cil-media-skip-backward" />
					</PaginationLink>
				</PaginationItem>

				<PaginationItem disabled={currentPage >= lastPage}>
					<PaginationLink
						next
						onClick={() => setPage(currentPage + 1)}
						>
						<i className="cil-media-skip-forward" />
					</PaginationLink>
				</PaginationItem>
			</Pagination>
		</div>
	);
}
