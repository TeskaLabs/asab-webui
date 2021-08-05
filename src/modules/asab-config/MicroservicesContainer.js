import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from 'reactstrap';

import { DataTable } from 'asab-webui';

import "./microservices.css";

export default (props) => {
	const [list, setList] = useState([]);
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);

	const { t } = useTranslation();

	const ASABConfigAPI = props.app.axiosCreate('asab_config');

	const headers = [ 
		{ name: t('MicroservicesContainer|ID'), key: 'id', link: { key: "id", pathname: "/config/svcs/" } },
		{ name: t('MicroservicesContainer|Launch time'), key: 'launchtime', datetime: true },
		{ name: t('MicroservicesContainer|Host'), key: 'hostname' }
	];

	useEffect(() => {
		ASABConfigAPI.get('/microservices', { params: { p: page }})
			.then(res => {
				console.log(res.data.data)
				setList(res.data.data);
				setCount(res.data.count);
			})
			.catch(e => {
				console.error(e);
				props.app.addAlert("warning", t('Failed fetch'));
			})
	}, [page]);

	return (
		<Container>
			<DataTable 
				headers={headers}
				data={list}
				currentPage={page}
				setPage={setPage}
				count={count}
				title={{
					text: "Microservices"
				}}
			/>
		</Container>
	)
}
