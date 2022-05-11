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
	const [WSdata, setWSdata] = useState([]);
	// const ws ;

	const { t } = useTranslation();

	const ASABConfigAPI = props.app.axiosCreate('asab_config');
	const remoteControlAPI = props.app.axiosCreate('lmio_remote_control');

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
		// listAll();
	}, [page, limit]);

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
	
	useEffect(() => {
		const ws = new WebSocket('ws://10.17.175.184:8083/list_containers_ws')
		
		// const ws = props.app.createWebSocket('lmio_remote_control', '/list_containers_ws')
		
		ws.onopen = (event) => {
			// 	ws.send('/list_containers_ws');
			console.log('this is on line 96', event)
		};
		// 
		ws.onmessage = (message) => {
			let data = [];
			let mes = JSON.parse(message.data)
			console.log('message from websocket: ', mes['remote-control-eliska']['containers_list'])
			mes['remote-control-eliska']['containers_list'].map((el) => {
					// setWSdata([ ...WSdata, {name: el.Name, status: el.State.Status}])
					// console.log(el.Name)
					data.push([el.Name, el.State.Status])
				})
			setWSdata([...data])
			};
			
			ws.onerror = () => {
				console.log('ln 103 connection lost')
			}
			
		}, [])
	const listAll = async () => {
		try {
			const response = await remoteControlAPI.get('/list')
			console.log('response: ', response.data)
			// setList(response.data.data.connections)
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
			console.log('response from docker function: ', response)
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
	<>
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
{/*  */}
		<Container>
			{WSdata.map((el) => {
				return (
					<p>name:  <b>{el[0]}</b>, status: <b>{el[1]}</b>.</p>
				)
			})}
		</Container>
	</>
	)
}
