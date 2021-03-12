import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';
import m from 'moment';

import { 
	Card, Row, Col,
	CardFooter, CardHeader, CardBody,
	Button, Input, InputGroup,
	InputGroupAddon, InputGroupText,
	ButtonDropdown, DropdownToggle,
	DropdownMenu, DropdownItem
} from 'reactstrap';

import Table from './Table';
import Pagination from './Pagination';

export function DataTable ({
	data, headers, limit = 10,
	setLimit, count, currentPage = 1,
	setPage, title, createButton,
	search, onSearch, onDownload
	}) {
	const [filterValue, setFilterValue] = useState('');
	const [isDropOpen, setDropdown] = useState(false);
	const timeoutRef = useRef(null);

	useEffect(() => {
		if (timeoutRef.current !== null) {
		clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
		timeoutRef.current = null;
		setPage(1);
		onSearch(filterValue);
		}, 500);
	}, [filterValue]);

	const downloadHandler = () => {
		const list = onDownload();
		let csv = headers.map(header => header.name).join(',') + "\n" + 
			list.map(item => headers.map(header => item[header.key]).join(',')).join('\n');
		let blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
		saveAs(blob, `${title.text.replace(' ', '_')}_${m().format('D-MM-YYYY')}.csv`);
	}

	return (
		<Row>
		<Col>
			<Card>
			<CardHeader>
				{title.icon && typeof title.icon === 'string' ? 
				<i className={title.icon}></i> : title.icon
				}
				{title.text}
				{createButton &&
				<div className="float-right">
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
					<div className="float-right pr-3">
						<Button tag="span" size="sm" onClick={downloadHandler} >
							<i className="cil-arrow-bottom"></i>
							Download
						</Button>
					</div>
				}
				{search && 
				<div className={`float-right${createButton ? " pr-3" : ''}`}>
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

			<CardBody>
				<Table data={data.length > limit ? data.slice(0, limit) : data} headers={headers}/>
			</CardBody>

			<CardFooter>
				<Row>
				<Col sm="4">
					<div>
						Showing {data.length < limit ? data.length : limit} of {count} item(s)
					</div>
				</Col>

				<Col>
					<Pagination 
					currentPage={currentPage}
					setPage={setPage}
					lastPage={Math.floor(count/limit)+1}
					/>
				</Col>
				
				{setLimit &&
					<Col>
					<ButtonDropdown
						isOpen={isDropOpen}
						toggle={() => setDropdown(prev => !prev)}
						className="float-right"
					>
						<DropdownToggle caret>
							Limit: {limit}
						</DropdownToggle>
						<DropdownMenu>
						{
							[1,2,3,4].map((item, idx) => <DropdownItem onClick={() => { setPage(1); setLimit(item*5); }} key={idx}>{item*5}</DropdownItem>)
						}
						</DropdownMenu>
					</ButtonDropdown>
					</Col>
				}
				</Row>
			</CardFooter>
			</Card>
		</Col>
		</Row>
	);
};
