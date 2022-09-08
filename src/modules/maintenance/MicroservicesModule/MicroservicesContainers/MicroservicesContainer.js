import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from 'reactstrap';

import { DataTable } from 'asab-webui';

import "./microservices.scss";

export default (props) => {
	const [list, setList] = useState([]);
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	const [filter, setFilter] = useState("");
	const [limit, setLimit] = useState(20);

	const { t } = useTranslation();

	const LMIORemoteControlAPI = props.app.axiosCreate('lmio_remote_control');

	const headers = [
		{
			name: " ",
			customHeaderStyle: { width: '2.5rem' },
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
		{ name: t('MicroservicesContainer|ID'), key: 'id', link: { key: "id", pathname: "/microservices/svcs/" } },
		{ name: t('MicroservicesContainer|Host'), key: 'hostname' },
		{ name: t('MicroservicesContainer|Launch time'), key: 'launchtime', datetime: true },
		{ name: t('MicroservicesContainer|Created at'), key: 'created_at', datetime: true },
		{ name: t('MicroservicesContainer|Version'), key: 'version'}
	];

	// Filter the value
	const onSearch = (value) => {
		setFilter(value);
	};

	useEffect(() => {
		getMicroservicesList();
	}, [page, filter ,limit]);

	const getMicroservicesList = async () => {
		try {
			const response = await LMIORemoteControlAPI.get('/microservices', { params: { p: page, i: limit, f: filter }});

			if (response.data.result !== "OK") throw new Error(response);

			setList(response.data.data);
			setCount(response.data.count);
		} catch (e) {
			console.error(e);
			props.app.addAlert("warning", t('MicroservicesContainer|Failed to fetch data'));
		}
	}

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
		<Container className="svcs-container" fluid>
			<DataTable 
				headers={headers}
				data={list}
				currentPage={page}
				setPage={setPage}
				count={count}
				limit={limit}
				setLimit={setLimit}
				limitValues={[20, 50, 100]}
				search={{ icon: 'cil-magnifying-glass', placeholder: t("CredentialsListContainer|Search") }}
				onSearch={onSearch}
				title={{
					text: t('MicroservicesContainer|Microservices'), icon: "cil-list"
				}}
				customRowStyle={customRowStyle}
			/>
		</Container>
	)
}
