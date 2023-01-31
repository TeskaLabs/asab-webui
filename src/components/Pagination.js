import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Pagination, PaginationItem, PaginationLink, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';

export default function ({ currentPage, setPage, lastPage, style }) {
	const slots = lastPage;
	// let start = currentPage - Math.floor(slots / 2);
	// let end = currentPage + Math.floor(slots / 2);

	// console.log(start, end, "START END")

	const [open, setOpen] = useState(false);
	const [middlePart, setMiddlePart] = useState([]);
	const [arrayStartEnd, setArrayStartEnd] = useState([1, lastPage])

	const { t, i18n } = useTranslation();

	// console.log(currentPage, lastPage, "CUR LAST")
	useEffect(() => {
		setArrayStartEnd([1, lastPage]);
		pagesMiddle();
	}, [slots])

	useEffect(() => {
		if (currentPage > lastPage && lastPage != 0) {
			setPage(lastPage);
		}
	}, [lastPage])

	const pages = useMemo(() => {
		if (middlePart.length > 0) {
			let p = [...arrayStartEnd];
			p.splice(1, 0, ...middlePart);
			if ((p[1]) > 2) {
				p.splice(1, 0, "less");
			}
			if ((p[p.length - 2] + 1) < lastPage) {
				p.splice(p.length - 1, 0, "more");
			}
			return p;
		}
		if (arrayStartEnd[0] == arrayStartEnd[1]) {
			return [arrayStartEnd[0]];
		}
		if (lastPage == 0) {
			return [1];
		}
		return arrayStartEnd;
	}, [middlePart])


	const pagesMiddle = (action) => {
		let p = []; // Pages array
		let start = currentPage - Math.floor(slots / 2);
		let end = currentPage + Math.floor(slots / 2);

		if ((action == "less") || (action == "more")) {
			if (action == "less") {
				start = middlePart[0] - 1;
				end = middlePart[middlePart.length - 1] - 1;
				if (start < 1) {
					start = 1 - Math.floor(slots / 2);
				}
				if (end < 1) {
					end = 1 + Math.floor(slots / 2);
				}
			} else if (action == "more") {
				start = middlePart[0] + 1;
				end = middlePart[middlePart.length - 1] + 1;
				if (end > lastPage) {
					end = lastPage - 1;
				}
				if (start >= lastPage) {
					start = middlePart[0];
				}
			}
			for (let i = start; i <= end; i++) {
				p.splice(i, 0, i);
			}
			setMiddlePart(p);
		} else {
			if (start < 1) {
				start = 1;
				end = Math.min(slots, lastPage);
			} else if (end > lastPage) {
				start = Math.max(lastPage - slots + 1, 1);
				end = lastPage;
			}
			// console.log(start, end, 'TAK CO TADY')
			for (let i = start + 1; i < end; i++) {
				p.splice(i - 1 , 0, i)
				if ((i == 5) && (end > 5)) {
					setMiddlePart(p);
					return;
				}
			}
			// TODO: Manage cases when user clicks on last and first item and would like to skip all the other pages
			// console.log(action, 'ACTION')
			// if (action == lastPage) {
			// 	let e = end - 4;
			// 	if (e < 1) {
			// 		e = start + 1;
			// 	}
			// 	console.log(e, "AAAAAAAAAAAAAA")
			// 	for (let i = e; i < end; i++) {
			// 		p.splice(i - 1 , 0, i)
			// 		if ((i == 5) && (end > 5)) {
			// 			setMiddlePart(p);
			// 			return;
			// 		}
			// 	}
			// } else {
			// 	console.log("TADU", start, end)
			// 	for (let i = start + 1; i < end; i++) {
			// 		p.splice(i - 1 , 0, i)
			// 		if ((i == 5) && (end > 5)) {
			// 			setMiddlePart(p);
			// 			return;
			// 		}
			// 	}
			// }
		}
		setMiddlePart(p);
	}

	const pageDropdownClick = (p) => {
		if (p == "more") {
			pagesMiddle(p);
			setOpen(false);
		} else if (p == "less") {
			pagesMiddle(p);
			setOpen(false);
		} else {
			// TODO: Manage cases when user clicks on last and first item and would like to skip all the other pages
			// if ((p == lastPage) || (p == 1)) {
			// 	pagesMiddle(p);
			// }
			setPage(p);
			setOpen(true);
		}
	}


	return (
		<div className="data-table-pagination" style={style}>	
			<Dropdown 
				isOpen={open}
				toggle={() => setOpen(prev => !prev)}
				direction="down"
				className="pagination-dropdown"
			>
				<DropdownToggle caret>
					{currentPage}
				</DropdownToggle>
				<DropdownMenu>
					{pages && pages.map((page, idx) =>
						<DropdownItem
							key={idx}
							// title={(page == "more") ? t('More') : (page == "less") ? t('Less') : page}
							onClick={() => pageDropdownClick(page)}
						>
							{((page == "more") || (page == "less")) ? "..." : page}
						</DropdownItem>
					)} 

				</DropdownMenu>
			</Dropdown>

			<div className="mr-2">
				{pages && (pages.length > 1) ? t('Pages', {pages: (lastPage == 0) ? 1 : lastPage}) : t('Page', {pages: (lastPage == 0) ? 1 : lastPage})}
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
