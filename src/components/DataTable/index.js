import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';

import { 
	Card, Row, Col,
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
	limitValues = [10, 15, 25, 50],
	contentLoader = true, category
	}) {
	const [filterValue, setFilterValue] = useState('');

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
						{sort && 
							<div className="float-right ml-3 data-table-sort">
								<Sort 
									sort={sort} 
								/>
							</div>
						}
						{search && 
							<div className="float-right ml-3 data-table-search">
								<Search 
									search={search}
									filterValue={filterValue}
									setFilterValue={setFilterValue}
								/>
							</div>
						}
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

						{setPage &&
							<Col>
								<Pagination 
									currentPage={currentPage}
									setPage={setPage}
									lastPage={Math.ceil(count/limit)}
									style={{marginBottom: "0"}}
								/>
							</Col>
						}

						{setLimit &&
							<Col>
								<LimitDropdown 
									translationRoute={translationRoute}
									limit={limit}
									setLimit={setLimit}
									setPage={setPage}
									limitValues={limitValues}
								/>
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