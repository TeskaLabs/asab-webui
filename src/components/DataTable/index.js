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
	collapseChildren = false, toggleChildrenOnRowClick = false
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

	return (
		<Row className="h-100">
			<Col>
				<Card className="h-auto data-table-card">
					<CardHeader className="data-table-card-header border-bottom">
						<div className="data-table-title card-header-title">
							{title.icon && typeof title.icon === 'string' ?
								<i className={`${title.icon} me-2`}></i> : title.icon
							}
							{title.text}
						</div>

						<ButtonGroup>
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
									{`${(currentPage -1) * limit + 1} - ${count > currentPage * limit ? currentPage * limit: count} ${t("of")} ${count} ${t("item(s)")}`}
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
