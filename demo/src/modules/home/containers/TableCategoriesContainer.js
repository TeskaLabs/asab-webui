import React, { useState, useEffect } from 'react';
import { DataTable } from 'asab-webui';
import { Container, Button } from 'reactstrap';

const initData = {
	data: [
		{
			"_id": "mongodb:ext:5ffdc6ffa5a3c6fe397c4dfd",
			"category": "Harry Potter",
			"children": {
				"data": [
					{
						"_id": "mongodb:ext:5ffdc6ffa5a3c6fe397c4dfd",
						"_type": "mongodb",
						"_provider_id": "ext",
						"_v": 12,
						"_c": "2021-01-12T15:57:51.471000",
						"_m": "2021-01-12T15:57:51.471000",
						"phone": "3240715",
						"username": "Ron Weasley",
					},
					{
						"_id": "mongodb:ext:5ffdc6ffa5a3c6fe397c4dfd",
						"_type": "mongodb",
						"_provider_id": "ext",
						"_v": 13,
						"_c": "2021-01-12T15:57:51.471000",
						"_m": "2021-01-12T15:57:51.471000",
						"phone": "3240715",
						"username": "Hermione Granger",
					}
				],
				"count": 2
			}
		},
		{
			"_id": "mongodb:ext:5ffdc6ffa5a3c6fe397c4dfd",
			"category": "Spider-Man",
			"children": {
				"data": [
					{
						"_id": "mongodb:ext:5ffdc6ffa5a3c6fe397c4dfd",
						"_type": "mongodb",
						"_provider_id": "ext",
						"_c": "2021-01-12T15:57:51.471000",
						"_m": "2021-01-12T15:57:51.471000",
						"phone": "3240715",
						"username": "Peter Parker"
					},
					{
						"_id": "mongodb:ext:5ffdc6ffa5a3c6fe397c4dfd",
						"_type": "mongodb",
						"_provider_id": "ext",
						"_c": "2021-01-12T15:57:51.471000",
						"_m": "2021-01-12T15:57:51.471000",
						"phone": "3240715",
						"username": "MJ"
					},
					{
						"_id": "mongodb:ext:5ffdc6ffa5a3c6fe397c4dfd",
						"_type": "mongodb",
						"_provider_id": "ext",
						"_c": "2021-01-12T15:57:51.471000",
						"_m": "2021-01-12T15:57:51.471000",
						"phone": "3240715",
						"username": "Harry Osborn"
					}
				],
				"count": 3
			}
		}
	],
	fetch (limit=10, page) {
		return { 
			data: this.data.slice((page-1)*limit, limit*page), 
			count: this.data.length 
		};
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
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		const { data, count } = initData.fetch(limit, page);
		setCount(count);
		setData(data);
	}, [limit, page]);

	const noItemsComponent = (
		<Container>
			<div className="mx-auto my-3 text-center font-weight-bold text-primary">
				There are no items
			</div>
		</Container>
	);

	return (
		<Container>
			<Button onClick={() => setLoading(prev => !prev)} className="mb-2">Set Loading</Button>
			<DataTable
				category={{
					key: "category",
					link: (obj) => `category/${obj}`,
					sublistKey: "children"
				}}
				title={{text: "Table Demo", icon: 'cil-user'}}
				data={data}
				headers={headers}
				count={count}
				limit={limit}
				setLimit={setLimit}
				currentPage={page}
				setPage={setPage}
				isLoading={isLoading}
				noItemsComponent={noItemsComponent}
			/>
		</Container>
	)
};
