import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from 'reactstrap';

import { DataTable } from 'asab-webui';

import "./microservices.scss";

export default (props) => {
	const [list, setList] = useState([]);
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	const [limit, setLimit] = useState(10);

	const { t } = useTranslation();

	const ASABConfigAPI = props.app.axiosCreate('asab_config');

	const headers = [
		{ 
			name: " ",
			customComponent: {
				generate: (obj) => {
					if (obj["attention_required"] && Object.keys(obj["attention_required"]).length > 0) {
						return (
							<i className="cil-warning"></i>
						)
					}
				}
			}
		},
		{ name: t('MicroservicesContainer|ID'), key: 'id', link: { key: "id", pathname: "/config/svcs/" } },
		{ name: t('MicroservicesContainer|Launch time'), key: 'launchtime', datetime: true },
		{ name: t('MicroservicesContainer|Host'), key: 'hostname' }
	];

	useEffect(() => {
		ASABConfigAPI.get('/microservices', { params: { p: page, limit: limit }})
			.then(res => {
				if (!res.data) throw new Error("response.data is undefined or null");
				if (!res.data.data) throw new Error("response.data.data is undefined or null");
				setList(res.data.data);
				setCount(res.data.count);
			})
			.catch(e => {
				console.error(e);
				props.app.addAlert("warning", t('Failed fetch'));
			})
	}, [page, limit]);

	const customRowStyle = {
		style: {
			backgroundColor: "#fff3cd",
			color: "#856404"
		},
		condition: (obj) => {
			if (obj["attention_required"] && Object.keys(obj["attention_required"]).length > 0) return true;
			return false;
		}
	}

	return (
		<Container className="svcs-container">
			<DataTable 
				headers={headers}
				data={list}
				currentPage={page}
				setPage={setPage}
				count={count}
				limit={limit}
				setLimit={setLimit}
				title={{
					text: "Microservices"
				}}
				customRowStyle={customRowStyle}
			/>
		</Container>
	)
}
