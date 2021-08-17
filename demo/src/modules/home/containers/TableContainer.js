import React, { useState, useEffect } from 'react';
import { DataTable } from 'asab-webui';
import { Container, Button } from 'reactstrap';

const initData = {
	data: [
		{
			"_id": "mongodb:ext:5ffdc6ffa5a3c6fe397c4dfd",
			"_type": "mongodb",
			"_provider_id": "ext",
			"_v": 1,
			"_c": "2021-01-12T15:57:51.471000",
			"_m": "2021-01-12T15:57:51.471000",
			"phone": "3240715",
			"username": "Dzmitry",
			"json": {
				"json": "json",
				"jason": "jason"
			}
		},
		{
			"_id": "mongodb:ext:5ffdc6ffa5a3c6fe397c4dfd",
			"_type": "mongodb",
			"_provider_id": "ext",
			"_v": 2,
			"_c": "2021-01-12T15:57:51.471000",
			"_m": "2021-01-12T15:57:51.471000",
			"phone": "3240715",
			"username": "Harry Potter"
		},
		{
			"_id": "mongodb:ext:5ffdc6ffa5a3c6fe397c4dfd",
			"_type": "mongodb",
			"_provider_id": "ext",
			"_v": 3,
			"_c": "2021-01-12T15:57:51.471000",
			"_m": "2021-01-12T15:57:51.471000",
			"phone": "3240715",
			"username": "Shrek"
		},
		{
			"_id": "mongodb:ext:5ffdc6ffa5a3c6fe397c4dfd",
			"_type": "mongodb",
			"_provider_id": "ext",
			"_v": 4,
			"_c": "2021-01-12T15:57:51.471000",
			"_m": "2021-01-12T15:57:51.471000",
			"phone": "3240715",
			"username": "Peter Parker"
		},
		{
			"_id": "mongodb:ext:5ffdc6ffa5a3c6fe397c4dfd",
			"_type": "mongodb",
			"_provider_id": "ext",
			"_v": 5,
			"_c": "2021-01-12T15:57:51.471000",
			"_m": "2021-01-12T15:57:51.471000",
			"phone": "3240715",
			"username": "Naruto"
		},
		{
			"_id": "mongodb:ext:5ffdcf2fa5a3c6fe397c5719",
			"_type": "mongodb",
			"_provider_id": "ext",
			"_v": 6,
			"_c": "2021-01-12T16:32:47.327000",
			"_m": "2021-01-12T16:32:47.327000",
			"email": "ffries@french.com",
			"username": "French Fries"
		},
		{
			"_id": "mongodb:ext:5ffdc73aa5a3c6fe397c4e4a",
			"_type": "mongodb",
			"_provider_id": "ext",
			"_v": 7,
			"_c": "2021-01-12T15:58:50.828000",
			"_m": "2021-01-14T10:29:13.190000",
			"email": "leo@turtle.com",
			"username": "Leo Turtle",
			"suspended": true
		},
		{
			"_id": "mongodb:ext:5ffdc73aa5a3c6fe397c4e4a",
			"_type": "mongodb",
			"_provider_id": "ext",
			"_v": 8,
			"_c": "2021-01-12T15:58:50.828000",
			"_m": "2021-01-14T10:29:13.190000",
			"email": "jojo@dio.com",
			"username": "Giorno Giovanna",
			"suspended": true
		},
		{
			"_id": "mongodb:ext:5ffdc73aa5a3c6fe397c4e4a",
			"_type": "mongodb",
			"_provider_id": "ext",
			"_v": 9,
			"_c": "2021-01-12T15:58:50.828000",
			"_m": "2021-01-14T10:29:13.190000",
			"email": "metal@gear.com",
			"username": "Solid Snake",
			"suspended": true
		},
		{
			"_id": "mongodb:ext:5ffdc73aa5a3c6fe397c4e4a",
			"_type": "mongodb",
			"_provider_id": "ext",
			"_v": 10,
			"_c": "2021-01-12T15:58:50.828000",
			"_m": "2021-01-14T10:29:13.190000",
			"email": "star.wars@lucas.com",
			"username": "Mandolorian",
			"suspended": true
		},
		{
			"_id": "mongodb:ext:5ffdc73aa5a3c6fe397c4e4a",
			"_type": "mongodb",
			"_provider_id": "ext",
			"_v": 11,
			"_c": "2021-01-12T15:58:50.828000",
			"_m": "2021-01-14T10:29:13.190000",
			"email": "breaking.good@gmail.com",
			"username": "Jesse Pinkman",
			"suspended": true
		}
	],
	fetch (limit=10, page, str = '', sort) {
		let filteredData = this.data.filter(item => item.username.includes(str));
		if (sort)  {
			switch (sort) {
				case "username":
					filteredData = filteredData.sort((a, b) => a.username.localeCompare(b.username));
					break;
				case "creation":
					filteredData = filteredData.sort((a, b) => a.username.localeCompare(b.username));
					break;
				default:
					break;
			}
			
		}
		return { data: filteredData.slice((page-1)*limit, limit*page), count: filteredData.length };
	},
	headers: [ 
		{ 
			name: 'Link',
			key: 'username',
			link: {
				pathname: '/pathname/',
				key: 'username'
			}
		},
		{
			name: 'DateTime',
			key: '_c',
			datetime: { format: 'lll' }
		},
		{ 
			name: 'Text', 
			key: '_provider_id' 
		},
		{
			name: 'Custom',
			customComponent: {
				generate: (obj) => (
					<div style={{ color: "red"}}>
						<p style={{ margin: 0}}>{obj.username}</p>
						<p style={{ margin: 0}}>{obj._type}</p>
					</div>
				),
				onDownload: (obj) => `${obj.username}/${obj._type}`
			}
		},
		{
			name: 'JSON',
			key: 'json',
			json: true
		},
		{
			name: ' ',
			actionButton: {
				title: "Actions",
				actions: [
					{
						name: "Show name",
						onClick(row, header) {
							alert(`Showing name: ${row.username}`)
						}
					}
				]
			}
		}
	],
	getHeaders () { return this.headers }
};

export default function (props) {
	const headers = initData.getHeaders();

	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [count, setCount] = useState(initData.data.length);
	const [str, setStr] = useState('');
	const [isLoading, setLoading] = useState(false);
	const [sort, setSort] = useState('initial');

	useEffect(() => {
		const { data, count } = initData.fetch(limit, page, str, sort);
		setCount(count);
		setData(data);
	}, [limit, page, str, sort]);

	const onSearch = (value) => {
		setStr(value);
	};

	const onDownload = () => initData.data;
	props.app.addHelpButton("https://github.com/TeskaLabs/asab-webui/blob/master/demo/src/modules/home/containers/TableContainer.js");

	const onSort = (value) => setSort(value);

	const buttonWithAuthz = {
		title:"Button with authz",
		color:"danger",
		size:"sm",
		onClick() {alert("You've clicked button with authz")},
		resource: "res:res",
		resources: ["res:res"],
		children: (<><i className="cil-trash mr-2"></i>ButtonWithAuthz</>)
	}

	const noItemsComponent = (
		<Container>
			<div className="mx-auto my-3 text-center font-weight-bold text-primary">
				There are no items
			</div>
		</Container>
	);

	const customButton = {
		text: "Custom button",
		icon: "cil-warning",
		props: {
			color: "warning",
			onClick: () => {
				alert("This is warning after button is clicked");
			}
		}
	}

	const nextPage = () => {
		if (page*limit < count) {
			setPage(prev => prev+1)
		}
		else {
			alert("You're on the last page");
		}
	}

	const customComponent = (
		<Button
			size="sm"
			color="success"
			onClick={nextPage}
		>
			Next Page
		</Button>
	);

	return (
		<Container>
			<Button onClick={() => setLoading(prev => !prev)} className="mb-2">Set Loading</Button>
			<DataTable
				title={{text: "Table Demo", icon: 'cil-user'}}
				data={data}
				headers={headers}
				count={count}
				limit={limit}
				setLimit={setLimit}
				currentPage={page}
				setPage={setPage}
				search={{ icon: 'cil-magnifying-glass', placeholder: "Search" }}
				createButton={{ text: "Create", icon: 'cil-plus', pathname: '#' }}
				onSearch={onSearch}
				onDownload={onDownload}
				sort={{
					icon: 'cil-sort-descending',
					title: "Sort by",
					onClick: onSort,
					items: [
						{
							name: "Initial",
							value: "initial"
						},
						{
							name: "By username",
							icon: "cil-sort-alpha-down",
							value: "username"
						},
						{
							name: "By creation date",
							icon: "cil-sort-numeric-down",
							value: "creation"
						}
					]
				}}
				isLoading={isLoading}
				buttonWithAuthz={buttonWithAuthz}
				noItemsComponent={noItemsComponent}
				customButton={customButton}
				customComponent={customComponent}
			/>
		</Container>
	)
};
