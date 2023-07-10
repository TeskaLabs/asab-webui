import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
	Card, Row, Col, ButtonGroup,
	CardFooter, CardHeader, CardBody,
	Button, Container
} from 'reactstrap';

import Table from './Table';
import Pagination from '../Pagination';
import LimitDropdown from './LimitDropdown';
import { DownloadButton, CreateButton, CustomButton } from './Buttons';
import Search from './Search';
import Sort from './Sort';
import Checkbox from './Checkbox';
// import CustomDropdownButton from './CustomDropdownButton'; DON'T REMOVE YET. IT MAY BE USEFUL ON REFACTORING DATATABLE

import './table.scss';

import { CellContentLoader } from '../ContentLoader';
import { ButtonWithAuthz } from '../../modules/auth/components/ButtonWithAuthz';

export function DataTable ({
	data, headers, limit = 10,
	setLimit, count, currentPage = 1,
	setPage, title, createButton,
	search, onSearch, onDownload,
	isLoading, translationRoute = '',
	buttonWithAuthz, sort, noItemsComponent,
	customButton, customComponent,
	customRowStyle, customRowClassName,
	customCardBodyComponent,
	limitValues = [5, 10, 15, 20, 25, 30, 50],
	contentLoader = true, category, height, disableAdvMode,
	collapseChildren = false, toggleChildrenOnRowClick = false,
	checkbox
   }) {
	const [filterValue, setFilterValue] = useState('');
	const [isLimitOpen, setLimitDropdown] = useState(false);
	const timeoutRef = useRef(null);
	const [countDigit, setCountDigit] = useState(1);

	const advMode = useSelector(state => state.advmode.enabled);
	
	const { t } = useTranslation();

	useEffect(() => {
		if (setLimit && height && (height !== 0)) {
			// 250 - is the height of the header and footer plus the paddings in the table.
			// 48 -  is the height of one row in the table.
			let tableRowCount = Math.floor((height - 250)/48);
			setLimit(roundedNumRows(tableRowCount));
		} else if (setLimit && (height == undefined)) {
			setLimit(10);
		}
	}, [height]);

	useEffect(() => {
		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
		timeoutRef.current = null;
		if (setPage) setPage(1);
		if (onSearch) onSearch(filterValue);
		}, 500);
	}, [filterValue]);

	const advModeState = useMemo(() => {
		if (disableAdvMode == true) {
			return false;
		}
		return advMode;
	},[advMode])

	const check = useMemo(() => {
		let allSelected = true;
		for (let i = 0; i < data.length; i++) {
			if (data[i].assigned === false) {
				allSelected = false;
				break;
			}
		}
		return allSelected;
	}, [data]);

	// rounding page number divisible by 5
	function roundedNumRows(x) {
		if (isNaN(x) == false) {
			const rowCount = Math.round(x / 5) * 5;
			if (rowCount <= 0) {
				return 5; // It is a lowest limit value
			} else {
				return rowCount;
			}
		} else {
			return 10; // It is a default limit value
		}
	}

	const handleCheckbox = () => {
		let items = [];
		if(!check) {
			data.map((item) => {
				if (item['assigned'] !== true) {
					items.push(item);
				}
			})
			checkbox.setChecked([...checkbox.checked, ...items]);
		}
		else {
			data.map((item) => {
				let matchedIdx = checkbox.checked.findIndex(obj => obj._id === item._id);
				if (matchedIdx > -1) {
					// removes items from selection
					let selectedData = checkbox.checked;
					selectedData.splice(matchedIdx, 1);
					checkbox.setChecked([...selectedData]);
				}
			})
		}
	};

	return (
		<Row className="h-100">
			<Col>
				<Card className="h-auto data-table-card">
					<CardHeader className="data-table-card-header border-bottom">
						<div className="data-table-title card-header-title">
							{title.icon && typeof title.icon === 'string' ? 
								<i className={`${title.icon} mr-2`}></i> : title.icon
							}
							{title.text}
						</div>				

						<ButtonGroup>
							{checkbox &&
								<Checkbox
									title={checkbox.title}
									checkbox={check}
									onCheckbox={handleCheckbox}
								/>}

							{search && 
									<Search 
										search={search}
										filterValue={filterValue}
										setFilterValue={setFilterValue}
									/>
							}
							
							{sort && <Sort sort={sort} />}

							<div className="data-table-create-button data-table-button">{customComponent}</div>

							{customButton && <CustomButton customButton={CustomButton} />}

							{buttonWithAuthz && <ButtonWithAuthz {...buttonWithAuthz} className="data-table-button-with-authz data-table-button"/>}
							
							{createButton && <CreateButton createButton={createButton} />}

							{onDownload &&
									<DownloadButton
										onDownload={onDownload}
										headers={headers}
										title={title}
									/>
							}
						</ButtonGroup>
					</CardHeader>
					<CardBody className="data-table-card-body">
						{customCardBodyComponent}
						{!isLoading &&
							<Table
								data={data && (data.length > limit) ? data.slice(0, limit) : data}
								headers={headers}
								category={category}
								rowStyle={customRowStyle}
								rowClassName={customRowClassName}
								collapseChildren={collapseChildren}
								toggleChildrenOnRowClick={toggleChildrenOnRowClick}
								advmode={advModeState}
							/>
						}

						{isLoading && contentLoader && <CellContentLoader cols={headers.length} rows={limit ?? 5} /> }

						{count === 0 && !isLoading && (
							noItemsComponent ? <NoItemsLayout>{noItemsComponent}</NoItemsLayout> :
							<NoItemsLayout>{t(translationRoute ? `${translationRoute}|No items` : "No items")}</NoItemsLayout>
						)}
					</CardBody>

					<CardFooter className="data-table-card-footer  border-top">
						<div className="data-table-card-footer-left">
							{setLimit &&
								<LimitDropdown 
									translationRoute={translationRoute}
									limit={limit}
									setLimit={setLimit}
									setPage={setPage}
									limitValues={limitValues}
								/>
							}

							{count ? (
								<div className="data-table-count">
									{t(translationRoute ? 
										`${translationRoute}|Showing item(s)` 
										: "Showing item(s)",
										{ from: (currentPage - 1) * limit + 1, to: count > currentPage * limit ? currentPage * limit : count, total: count }
									)}
								</div>
								) : null
							}
						</div>

						{setPage && data && (data.length > 0) &&
							<Pagination 
								currentPage={currentPage}
								setPage={setPage}
								lastPage={Math.ceil(count/limit)}
							/>
						}
					</CardFooter>
				</Card>
			</Col>
		</Row>
	);
};


const NoItemsLayout = ({ children }) => {
	return typeof children === "string" ? <Container className="text-center mx-auto my-3 font-weight-bold">{children}</Container> : children
}
