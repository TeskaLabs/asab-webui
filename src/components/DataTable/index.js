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
	DropdownMenu, DropdownItem, Container
} from 'reactstrap';

import Table from './Table';
import Pagination from '../Pagination';
// import CustomDropdownButton from './CustomDropdownButton'; DON'T REMOVE YET. IT MAY BE USEFUL ON REFACTORING DATATABLE

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
	contentLoader = true
	}) {
	const [filterValue, setFilterValue] = useState('');
	const [isSortOpen, setSortDropdown] = useState(false);
	const [isLimitOpen, setLimitDropdown] = useState(false);
	const timeoutRef = useRef(null);
	
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

	const downloadHandler = () => {
		const list = onDownload();
		let csv = headers.map(header => header.name).join(',') + "\n" + 
			list.map(item => headers.map(header => {
				if (header.customComponent) {
					if (header.customComponent.onDownload)
						return header.customComponent.onDownload(item, header).replace(',', ';');
					return '-';
				}
				return JSON.stringify(item[header.key])?.replace(',', ';');
			}).join(',')).join('\n');
		let blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
		let name = title?.text || "";
		saveAs(blob, `${name.replace(' ', '_')}_${format(new Date, 'dd-MM-yyyy')}.csv`);
	}

	return (
		<Row>
			<Col>
				<Card className="data-table-card">
					<CardHeader className="data-table-card-header">
						{title.icon && typeof title.icon === 'string' ? 
							<i className={title.icon}></i> : title.icon
						}
						{title.text}
						<div className="float-right ml-3 data-table-create-button">{customComponent}</div>
						{customButton && 
							<div className="float-right ml-3 data-table-create-button">
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
						{buttonWithAuthz && <ButtonWithAuthz {...buttonWithAuthz} className="float-right ml-3 data-table-button-with-authz"/>}
						{createButton &&
							<div className="float-right ml-3 data-table-create-button">
								<Link to={{ pathname: createButton.pathname }}>
									<Button tag="span" size="sm">
										{createButton.icon && 
											<span className="pr-1">
												{typeof createButton.icon === 'string' ? <i className={createButton.icon}></i> : createButton.icon}
											</span>
										}
										{createButton.text}
									</Button>
								</Link>
							</div>
						}
						{onDownload &&
							<div className="float-right ml-3 data-table-download-button">
								<Button tag="span" size="sm" onClick={downloadHandler} >
									<i className="cil-arrow-bottom"></i>
									Download
								</Button>
							</div>
						}
						{sort && 
							<div className="float-right ml-3 data-table-sort">
								<Dropdown
									isOpen={isSortOpen}
									toggle={() => setSortDropdown(prev => !prev)}
								>
									<DropdownToggle size="sm" caret>
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
						{search && 
							<div className="float-right ml-3 data-table-search">
								<InputGroup>
								{search.icon && 
									<InputGroupAddon addonType="prepend">
									<InputGroupText><i className={search.icon}></i></InputGroupText>
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
						<Row>
						{count ? (
							<Col sm="4">
								<div>
									{t(translationRoute ? 
										`${translationRoute}|Showing item(s)` 
										: "Showing item(s)",
										{ length: data.length, count: count }
									)}
								</div>
							</Col>
							) : null
						}

						{count > limit && setPage &&
							<Col>
								<Pagination 
								currentPage={currentPage}
								setPage={setPage}
								lastPage={Math.ceil(count/limit)}
								/>
							</Col>
						}

						{setLimit &&
							<Col>
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
							</Col>
						}
						</Row>
					</CardFooter>
				</Card>
			</Col>
		</Row>
	);
};


const NoItemsLayout = ({ children }) => {
	return typeof children === "string" ? <Container className="text-center mx-auto my-3 font-weight-bold">{children}</Container> : children
}