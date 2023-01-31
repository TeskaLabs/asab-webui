import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Pagination, PaginationItem, PaginationLink, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';

export default function ({ currentPage, setPage, lastPage, style }) {
	const slots = lastPage;
	// console.log(currentPage, setPage, lastPage, style, "AHAHHAHA")
	// let start = currentPage - Math.floor(slots / 2);
	// let end = currentPage + Math.floor(slots / 2);

	// console.log(start, end, "START END")

	const [open, setOpen] = useState(false);
	// const [toggleValue, setToggleValue] = useState(undefined);
	const [middlePart, setMiddlePart] = useState([]);
	const [arrayStartEnd, setArrayStartEnd] = useState([1, lastPage])

	const { t, i18n } = useTranslation();

	// if (start < 1) {
	// 	start = 1;
	// 	end = Math.min(slots, lastPage);
	// }

	// else if (end > lastPage) {
	// 	start = Math.max(lastPage - slots + 1, 1);
	// 	end = lastPage;
	// }

	// let pages = [];
	// for (let i = start; i <= end; i++) {
	// 	pages.push(i);
	// }

	// if (pages.length === 0) {
	// 	pages.push(1)
	// }

	// const pages = useMemo(() => {
	// 	let p = []; // Pages array
	// 	// if (displayAnother != undefined) {
	// 	// 	if (displayAnother == "more") {
	// 	// 		console.log(pagesArray, "PAGES")
	// 	// 		pagesArray && pagesArray.map(itm => {
	// 	// 			if ((itm == 1) || (itm == "less")) {
	// 	// 				p.push(itm);
	// 	// 			}
	// 	// 			if (((itm != "less") && (itm != "more")) && ((itm + 1) != lastPage)) {
	// 	// 				p.push(itm + 1);
	// 	// 			}
	// 	// 			if ((itm == "less") || (itm == "more")) {
	// 	// 				p.push(itm);
	// 	// 			}
	// 	// 			if (((itm != "less") && (itm != "more")) && (itm + 1 == lastPage)) {
	// 	// 				return p.push(itm + 1);
	// 	// 			}
	// 	// 		})
	// 	// 		return p;
	// 	// 		// return
	// 	// 	}
	// 	// 	// return
	// 	// }
	// 	let start = currentPage - Math.floor(slots / 2);
	// 	let end = currentPage + Math.floor(slots / 2);
	// 	if (start < 1) {
	// 		start = 1;
	// 		end = Math.min(slots, lastPage);
	// 	} else if (end > lastPage) {
	// 		start = Math.max(lastPage - slots + 1, 1);
	// 		end = lastPage;
	// 	}
	// 	// p.push(start);
	// 	// if (end != start) {
	// 	// 	p.push(end);
	// 	// }
	// 	for (let i = start + 1; i < end; i++) {
	// 		// p.push(i);
	// 		p.splice(i - 1 , 0, i)
	// 		if ((i == 5) && (end > 5)) {
	// 			p.splice(i, 0, "more");
	// 			// p.push(end);
	// 			return p;
	// 		}
	// 	}
	// 	if (p.length === 0) {
	// 		p.push(1)
	// 	}
	// 	return p;
	// }, [slots, displayAnother])


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
			console.log(p, "STARTEND")
			p.splice(1, 0, ...middlePart);
			console.log(p, "PPP V AGES")
			if ((p[1]) > 2) {
				p.splice(1, 0, "less");
			}
			if ((p[p.length - 2]) < lastPage) {
				p.splice(p.length - 1, 0, "more");
			}
			return p;
		}
		if (arrayStartEnd[0] == arrayStartEnd[1]) {
			return [arrayStartEnd[0]];
		}
		return arrayStartEnd;
	}, [middlePart])

	// useEffect(() => {
	// 	console.log(pages, 'PAGESSSSS')
	// 	let p = arrayStartEnd.splice(1, 0, pages)
	// 	arrayStartEnd.splice(1, 0, ...pages)
	// 	console.log(arrayStartEnd, "PAPAPAPAPPAPAPAPA")
	// 	setPagesArray(arrayStartEnd);
	// }, [pages])

	// console.log

	// console.log(pages, "PAGES")

	const pagesMiddle = (action) => {
		let p = []; // Pages array
		let start = currentPage - Math.floor(slots / 2);
		let end = currentPage + Math.floor(slots / 2);

		console.log(start, end, " S END")
		if ((action == "less") || (action == "more")) {
			if (action == "less") {
				start = middlePart[0] - 4;
				end = middlePart[middlePart.length - 1] - 4;
				if (start < 1) {
					start = 1 - Math.floor(slots / 2);
				}
				if (end < 1) {
					end = 1 + Math.floor(slots / 2);
				}
			} else if (action == "more") {
				start = middlePart[0] + 4;
				end = middlePart[middlePart.length - 1] + 4;
				if (end > lastPage) {
					end = lastPage - 1;
				}
				if (start >= lastPage) {
					start = middlePart[0];
				}
			}
			console.log(start, end, "S ENDDDD")
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
			console.log(start, end, "S END POTE")
			for (let i = start + 1; i < end; i++) {
				p.splice(i - 1 , 0, i)
				console.log(p, 'PPPPP')
				if ((i == 5) && (end > 5)) {
					setMiddlePart(p)
					return;
				}
			}
		}
		console.log(p, "PPPPPPPPPPP")
		// if (p.length === 0) {
		// 	p.push(1)
		// }

		setMiddlePart(p);
	}

	const pageDropdownClick = (p) => {
		if (p == "more") {
			console.log(p)
			// setToggleValue(p);
			pagesMiddle(p);
			// TODO: call more pages and display
		} else if (p == "less") {
			console.log(p)
			// setToggleValue(p);
			pagesMiddle(p);
			// TODO: call less pages and display
		} else {
			// setOpen(false);
			// setToggleValue(undefined);
			setPage(p);
			// dropDownToggle();
		}
	}

	// const dropDownToggle = () => {
	// 	if ((toggleValue == "more") || (toggleValue == "less")) {
	// 		setOpen(true);
	// 	} else {
	// 		setOpen(prev => !prev)
	// 	}
	// };
	// console.log(toggleValue, open, "OPENNNN")
	return (
		<div className="data-table-pagination" style={style}>	
			<Dropdown 
				isOpen={open}
				toggle={() => setOpen(prev => !prev)}
				// toggle={() => dropDownToggle()}
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
							title={(page == "more") ? t('More') : (page == "less") ? t('Less') : page}
							onClick={() => pageDropdownClick(page)}
						>
							{((page == "more") || (page == "less")) ? "..." : page}
						</DropdownItem>
					)} 

				</DropdownMenu>
			</Dropdown>

			<div className="mr-2">
				{pages && (pages.length > 1) ? t('Pages', {pages: lastPage}) : t('Page', {pages: lastPage})}
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
