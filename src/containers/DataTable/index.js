import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';
import m from 'moment';

import { 
	Card, Row, Col,
	CardFooter, CardHeader, CardBody,
	Button, Input, InputGroup,
	InputGroupAddon, InputGroupText,
	Dropdown, DropdownToggle,
	DropdownMenu, DropdownItem
} from 'reactstrap';

import Table from './Table';
import Pagination from './Pagination';

import { Spinner } from '../Spinner';
import { ButtonWithAuthz } from '../../modules/auth/ButtonWithAuthz';

export function DataTable ({
	data, headers, limit = 10,
	setLimit, count, currentPage = 1,
	setPage, title, createButton,
	search, onSearch, onDownload,
	isLoading, translationRoute = '',
	buttonWithAuthz, sort
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
		saveAs(blob, `${title.text.replace(' ', '_')}_${m().format('D-MM-YYYY')}.csv`);
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
						{buttonWithAuthz && <ButtonWithAuthz {...buttonWithAuthz} className="float-right ml-3 data-table-button-with-authz"/>}
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
									<DropdownToggle size="sm">
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

					<CardBody className="p-0 data-table-card-body">
						{ isLoading ? 
							<div style={{ margin: "2rem auto" }}><Spinner /></div> :
							<Table data={data.length > limit ? data.slice(0, limit) : data} headers={headers}/>
						}
						{count === 0 && !isLoading && t(translationRoute ? `${translationRoute}|No items` : "No items")}
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
								lastPage={Math.floor(count/limit)+1}
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
									<DropdownToggle caret>
										{t(translationRoute ? `${translationRoute}|Limit` : "Limit")}: {limit}
									</DropdownToggle>
									<DropdownMenu>
									{
										[1,2,3,4].map((item, idx) => <DropdownItem onClick={() => { setPage(1); setLimit(item*5); }} key={idx}>{item*5}</DropdownItem>)
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
