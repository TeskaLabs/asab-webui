import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';

import { 
	Card, Row, Col,
	CardFooter, CardHeader, CardBody,
	Button, Input, InputGroup,
	InputGroupAddon, InputGroupText,
	Dropdown, DropdownToggle,
	DropdownMenu, DropdownItem, Container, ButtonGroup
} from 'reactstrap';

import Table from './Table';
import Pagination from '../Pagination';
// import CustomDropdownButton from './CustomDropdownButton'; DON'T REMOVE YET. IT MAY BE USEFUL ON REFACTORING DATATABLE

import './table.scss';

import { CellContentLoader } from '../ContentLoader';
import { ButtonWithAuthz } from '../../modules/auth/ButtonWithAuthz';

export function DataTable ({
	data, headers, limit = 10,
	setLimit, count, currentPage = 1,
	setPage, title, createButton,
	search, onSearch,
	isLoading, translationRoute = '',
	buttonWithAuthz, sort, noItemsComponent,
	customButton, customComponent,
	customRowStyle, customRowClassName,
	customCardBodyComponent,
	limitValues = [10, 15, 25, 50],
	contentLoader = true
	}) {
	const [filterValue, setFilterValue] = useState('');
	const [isSortOpen, setSortDropdown] = useState(false);
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
		<Row>
			<Col>
				<Card className="data-table-card">
					<CardHeader className="data-table-card-header border-bottom">
						<div className="data-table-title card-header-title">
							{title.icon && typeof title.icon === 'string' ? 
								<i className={`${title.icon} mr-2`}></i> : title.icon
							}
							{title.text}
						</div>

				
					
					<ButtonGroup>

					
						{search && 
							<div className="data-table-search align-self-center mx-2 data-table-button">
								<InputGroup>
								{search.icon && 
									<InputGroupAddon addonType="prepend">
									<InputGroupText className="data-table-input-group-text pl-2"><i className={search.icon}></i></InputGroupText>
									</InputGroupAddon>
								}
								<Input
									value={filterValue}
									onChange={e => setFilterValue(e.target.value)}
									placeholder={search.placeholder}
									type="text"
									bsSize="sm"
								/>
								</InputGroup>
							</div>
						}

						<div className="data-table-create-button data-table-button">{customComponent}</div>
						{customButton && 
							<div className="data-table-create-button data-table-button">
								<Button
									tag="span"
									size="sm"
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
							<div className="data-table-create-button data-table-button">
									<Button outline tag="span" size="sm">
								<Link to={{ pathname: createButton.pathname }}>
										{createButton.icon && 
											<span className="pr-1">
												{typeof createButton.icon === 'string' ? <i className={createButton.icon}></i> : createButton.icon}
											</span>
										}
										{createButton.text}
								</Link>
									</Button>
							</div>
						}
						{sort && 
							<div className="data-table-sort data-table-button">
								<Dropdown
									isOpen={isSortOpen}
									toggle={() => setSortDropdown(prev => !prev)}
								>
									<DropdownToggle size="sm" caret outline>
										{sort.icon && <i className={`${sort.icon} mr-1`}></i>}
										{sort.title}
									</DropdownToggle>
									<DropdownMenu>
									{
										sort.items.map((item, idx) => (
											<DropdownItem onClick={() => sort.onClick(item.value)} key={idx}>
												{item.icon && <i className={`${item.icon} mr-1`}></i>}
												{item.name}
											</DropdownItem>
										))
									}
									</DropdownMenu>
								</Dropdown>
							</div>
						}
					</ButtonGroup>
					</CardHeader>

					<CardBody className="data-table-card-body">
						{customCardBodyComponent}
						<Table
							data={data.length > limit ? data.slice(0, limit) : data}
							headers={headers}
							rowStyle={customRowStyle}
							rowClassName={customRowClassName}
						/>

						{isLoading && contentLoader && <CellContentLoader cols={headers.length} rows={limit ?? 5} /> }

						{count === 0 && !isLoading && (
							noItemsComponent ? <NoItemsLayout>{noItemsComponent}</NoItemsLayout> :
							<NoItemsLayout>{t(translationRoute ? `${translationRoute}|No items` : "No items")}</NoItemsLayout>
						)}

					</CardBody>

					<CardFooter className="data-table-card-footer">
						{/* <Row> */}
					<div className="data-table-card-footer-left">
					{/* <div style={{display: 'flex', alignItems: 'center'}}> */}
						{setLimit &&
						<div className="data-table-limit">
							{/* {t(translationRoute ? `${translationRoute}|Limit` : "Limit")}: */}
							{/* TODO: Add translation */}
							Items per page: 
							<Dropdown
									isOpen={isLimitOpen}
									toggle={() => setLimitDropdown(prev => !prev)}
									className="data-table-limit-dropdown"
								>
									<DropdownToggle caret size="sm">
										{limit}
									</DropdownToggle>
									<DropdownMenu>
									{
										limitValues.map((value, idx) => <DropdownItem onClick={() => { setPage(1); setLimit(value); }} key={idx}>{value}</DropdownItem>)
									}
									</DropdownMenu>
								</Dropdown>
						</div>
						}

						{count ? (
								<div className="data-table-count">
								{/* TODO: add translations */}
										{countDigit + (currentPage - 1) * limit} - {data.length + (currentPage -1 ) * limit} of {count} item(s)
								</div>
							) : null
						}
					</div>

						{count > limit && setPage &&
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