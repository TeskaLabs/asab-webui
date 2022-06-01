import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { 
	Card, Row, Col, ButtonGroup,
	CardFooter, CardHeader, CardBody,
	Button, Dropdown, DropdownToggle,
	DropdownMenu, DropdownItem, Container
} from 'reactstrap';

import Table from './Table';
import Pagination from '../Pagination';
import LimitDropdown from './LimitDropdown';
import { DownloadButton, CreateButton } from './Buttons';
import Search from './Search';
import Sort from './Sort';
// import CustomDropdownButton from './CustomDropdownButton'; DON'T REMOVE YET. IT MAY BE USEFUL ON REFACTORING DATATABLE

import './table.scss';

import { CellContentLoader } from '../ContentLoader';
import { ButtonWithAuthz } from '../../modules/auth/ButtonWithAuthz';

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
	limitValues = [10, 15, 25, 50],
	contentLoader = true, category
	}) {
	const [filterValue, setFilterValue] = useState('');
	const [isLimitOpen, setLimitDropdown] = useState(false);
	const timeoutRef = useRef(null);
	const [countDigit, setCountDigit] = useState(1)
	
	const { t } = useTranslation();

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

	useEffect(() => {
		if((data.length - (currentPage*limit) + 1) < 1) {
			setCountDigit(1)
		} else if (limit < data.length && currentPage === 1 ){
			setCountDigit(1)
		} else {
			setCountDigit(data.length - (currentPage*limit) + 1)
		}
	}, [limit])

	return (
		<Row className="h-100">
			<Col>
				<Card className="h-100 data-table-card">
					<CardHeader className="data-table-card-header border-bottom">
						<div className="data-table-title card-header-title">
							{title.icon && typeof title.icon === 'string' ? 
								<i className={`${title.icon} mr-2`}></i> : title.icon
							}
							{title.text}
						</div>				

						<ButtonGroup>
							{search && 
								<div className="float-right ml-3 data-table-search">
									<Search 
										search={search}
										filterValue={filterValue}
										setFilterValue={setFilterValue}
									/>
								</div>
							}
							
							{sort && 
								<div className="float-right ml-3 data-table-sort">
									<Sort 
										sort={sort} 
									/>
								</div>
							}

							<div className="data-table-create-button data-table-button">{customComponent}</div>

							{customButton && 
								<div className="data-table-create-button data-table-button">
									<Button
										tag="span"
										{...customButton?.props}
									>
										{customButton.icon && 
											<span className="pr-1">
												{typeof customButton.icon === 'string' ? 
													<i className={customButton.icon}></i> : customButton.icon
												}
											</span>
										}
										{customButton?.text}
									</Button>
								</div>
							}

							{buttonWithAuthz && <ButtonWithAuthz {...buttonWithAuthz} className="data-table-button-with-authz data-table-button"/>}
							
							{createButton &&
								<CreateButton 
									createButton={createButton}
								/>
							}

							{onDownload &&
								<div className="float-right ml-3 data-table-download-button">
									<DownloadButton
										onDownload={onDownload}
										headers={headers}
										title={title}
									/>
								</div>
							}
						</ButtonGroup>
					</CardHeader>

					<CardBody className="data-table-card-body">
						{customCardBodyComponent}
						{!isLoading && <Table
							data={data.length > limit ? data.slice(0, limit) : data}
							headers={headers}
							category={category}
							rowStyle={customRowStyle}
							rowClassName={customRowClassName}
						/>}

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
									{/* TODO: add translations */}
											{countDigit + (currentPage - 1) * limit} - {data.length + (currentPage -1 ) * limit} of {count} item(s)
									</div>
								) : null
							}
						</div>

						{setPage &&
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