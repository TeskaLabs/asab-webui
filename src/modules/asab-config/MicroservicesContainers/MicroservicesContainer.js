import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Container, Button } from 'reactstrap';

import { DataTable } from 'asab-webui';

import "./microservices.scss";

export default (props) => {
	const [list, setList] = useState([]);
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	const [limit, setLimit] = useState(20);
	const [runDocker, setRunDocker] = useState(true);

	const { t } = useTranslation();

	const ASABConfigAPI = props.app.axiosCreate('asab_config');
	const remoteControlAPI = props.app.axiosCreate('remote_control');

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
		{ name: t('MicroservicesContainer|Host'), key: 'hostname' },
		{
			name: 'Actions',
			className: "float",
			customComponent: {
				generate: (action) => (
					<div className="d-flex justify-content-end">
						<Button
							title={t("SessionListContainer|Restart")}q
							size="sm"
							color="warning"
							onClick={() => docker(action.servername, action.hostname, 'docker restart')}
						>
							<i className="cil-sync"></i>
						</Button>
						<Button
							title={t("SessionListContainer|Stop")}
							size="sm"
							color="danger"
							className="ml-2"
							onClick={() => docker(action.servername, action.hostname, 'docker stop')}
						>
							<i className="cil-x"></i>
						</Button>
					</div>
				)
			}
		}		
	];

	useEffect(() => {
		getMicroservicesList();
	}, [page, limit, runDocker]);

	// useEffect(() => {
	// }, [])

	const getMicroservicesList = async () => {
		try {
			const response = await ASABConfigAPI.get('/microservices', { params: { p: page, l: limit }});

			if (response.data.result !== "OK") throw new Error(response);

			setList(response.data.data);
			setCount(response.data.count);
		} catch (e) {
			console.error(e);
			props.app.addAlert("warning", t('Failed fetch'));
		}
	}
	
	const listAll = async () => {
		try {
			const response = await remoteControlAPI.get('/list')
			console.log('response: ', response.data)
		} catch (e) {
			console.error(e);
			props.app.addAlert("warning", t('Failed fetch'));
		 }	
	}

	// const dockerPs = async () => {
	// 	try {
	// 		const response = await remoteControlAPI.post('/control', { servername: 'remote-control-eliska', command: 'docker ps'})
	// 		console.log('response: ', response)
	// 	} catch (e) {
	// 		console.error(e);
	// 		props.app.addAlert("warning", t('Failed fetch'));
	// 	 }	
	// }

	const docker = async (servername, container, action) => {
		try {
			const response = await remoteControlAPI.post('/control', { servername: servername, container: container, command: action})
			console.log('response: ', response)
			if (response.data.result == 'OK') {
				setTimeout(() => {
					getMicroservicesList();
				}, 500);
			}
		} catch (e) {
			console.error(e);
			props.app.addAlert("warning", t('Failed fetch'));
		 }	
	}

	const doSmthButton = {
		text: "start this bad boy",
		icon: "cil-check",
		props: {
			outline: true,
			color: "success",
			size: "md",
			onClick: () => {
				docker('remote-control-eliska', 'lm01_mock-app2_1', 'docker start');
				// listAll()
			}
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
		<Container className="svcs-container">
			<DataTable 
				headers={headers}
				data={list}
				currentPage={page}
				setPage={setPage}
				count={count}
				limit={limit}
				customButton={doSmthButton}
				setLimit={setLimit}
				limitValues={[20, 50, 100]}
				title={{
					text: "Microservices"
				}}
				customRowStyle={customRowStyle}
			/>
		</Container>
	)
}
