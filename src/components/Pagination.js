import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Pagination, PaginationItem, PaginationLink, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';

export default function ({ currentPage, setPage, lastPage, style }) {
	const slots = lastPage;
	const [open, setOpen] = useState(false);
	const [middlePart, setMiddlePart] = useState([]);
	const [arrayStartEnd, setArrayStartEnd] = useState([1, lastPage])

	const { t, i18n } = useTranslation();

	// Initial render with default values
	useEffect(() => {
		setArrayStartEnd([1, lastPage]);
		pagesMiddle();
	}, [slots])

	// Set last page
	useEffect(() => {
		if (currentPage > lastPage && lastPage != 0) {
			setPage(lastPage);
		}
	}, [lastPage])

	// Insert '...' with more or less variables to an middle part array
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


	// Compute pages to display in the middle of first and last page
	const pagesMiddle = (action) => {
		let p = []; // Pages array
		let start = currentPage - Math.floor(slots / 2);
		let end = currentPage + Math.floor(slots / 2);

		if ((action == "less") || (action == "more")) {
			/*
				Compute start and end pages (increment or decrement) of a page
				'...' value (more or less) click
			*/
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
			// Set start and end variables
			if (start < 1) {
				start = 1;
				end = Math.min(slots, lastPage);
			} else if (end > lastPage) {
				start = Math.max(lastPage - slots + 1, 1);
				end = lastPage;
			}

			if (action == lastPage) {
				/*
					Triggers only when clicking on last page
					and computes the appropriate page values
				*/
				let e = end - 4;
				if (e <= 1) {
					e = start + 1;
				}
				for (let i = e; i < end; i++) {
					p.splice(i - 1 , 0, i)
				}
				setMiddlePart(p);
			} else {
				// Triggers initially and on 1st page click
				for (let i = start + 1; i < end; i++) {
					p.splice(i - 1 , 0, i)
					if ((i == 5) && (end > 5)) {
						setMiddlePart(p);
						return;
					}
				}
			}
		}
		setMiddlePart(p);
	}

	// Action triggered on value click in page dropdown
	const pageDropdownClick = (p) => {
		if ((p == "more") || (p == "less")) {
			pagesMiddle(p);
			setOpen(false);
		} else {
			/*
				Manage cases when user clicks on last or first item
				and would like to skip all the other pages in between
			*/
			if ((p == lastPage) || (p == 1)) {
				pagesMiddle(p);
			}
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
							onClick={() => pageDropdownClick(page)}
						>
							{((page == "more") || (page == "less")) ? "..." : page}
						</DropdownItem>
					)}

				</DropdownMenu>
			</Dropdown>

			<div className="me-2">
				{pages && (pages.length > 1) ? (`${t("of")} ${(lastPage == 0) ? 1 : lastPage} ${t("Pages")}`) : (`${t("of")} ${(lastPage == 0) ? 1 : lastPage} ${t("Page")}`)}
			</div>

			<Pagination>
				<PaginationItem disabled={currentPage <= 1}>
					<PaginationLink
						previous
						onClick={() => setPage(Math.max(1, currentPage - 1))}
						>
						<i className="at-arrow-left" />
					</PaginationLink>
				</PaginationItem>

				<PaginationItem disabled={currentPage >= lastPage}>
					<PaginationLink
						next
						onClick={() => setPage(currentPage + 1)}
						>
						<i className="at-arrow-right" />
					</PaginationLink>
				</PaginationItem>
			</Pagination>
		</div>
	);
}
