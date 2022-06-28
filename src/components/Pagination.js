import React, { useEffect, useState } from 'react';

import { Pagination, PaginationItem, PaginationLink, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, ButtonDropdown } from 'reactstrap';

export default function ({ currentPage, setPage, lastPage, style }) {
	const slots = Math.min(5, lastPage);

	let start = currentPage - Math.floor(slots / 2);
	let end = currentPage + Math.floor(slots / 2);

	const [open, setOpen] = useState(false);

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

	useEffect(() => {
		if (currentPage > lastPage && lastPage != 0) {
			setPage(lastPage);
		}
	}, [lastPage])

	return (
		<div className="data-table-pagination">	
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

{/* TODO: add translations */}

			<div className="mr-2">
				of {pages.length} pages
			</div>

			<Pagination style={style}>
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
