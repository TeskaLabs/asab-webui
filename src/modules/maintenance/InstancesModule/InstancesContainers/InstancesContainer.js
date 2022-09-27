import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ReactJson from 'react-json-view';
import { useSelector } from 'react-redux';

import { Container, Card, CardBody, CardHeader, Row } from 'reactstrap';

import { DataTable, Spinner } from 'asab-webui';

export default function InstancesContainer(props) {
	// const [list, setList] = useState([]);
	// const [page, setPage] = useState(1);
	// const [count, setCount] = useState(0);
	// const [filter, setFilter] = useState("");
	// const [limit, setLimit] = useState(20);

	const [fullFrameData, setFullFrameData] = useState({});
	const [fFData, setFFData] = useState(false);
	const [deltaFrameData, setDeltaFrameData] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const emptyContentImg = props.app.Config.get('brand_image').full;
	const emptyContentAlt = props.app.Config.get('title');

	const theme = useSelector(state => state.theme);

	const { t } = useTranslation();


	let wsSubPath = '/ws';
	// const LMIORemoteControlAPI = props.app.axiosCreate('lmio_remote_control');
	const serviceName = 'lmio_remote_control';
	let WSUrl = props.app.getWebSocketURL(serviceName, wsSubPath);
	let WSClient = null;

	const isMounted = useRef(null);


	useEffect(() => {
		isMounted.current = true;

		if (WSUrl != undefined) {
			reconnect();
		}

		return () => {
			if (WSClient != null) {
				try {
					WSClient.close();
				} catch (e) {
					console.log("Ignored exception: ", e)
				}
			}

			isMounted.current = false;
		}
	}, []);

	// Use memo for data rendering (due to expensive caluclations)
	const data = useMemo(() => {
		if (fFData == true) {
			// Render full frame data
			setFFData(false);
			return fullFrameData;
		} else {
			// Render delta frame data
			if(deltaFrameData && Object.keys(deltaFrameData)) {
				// If key in full frame, update data, otherwise append deltaframe to fullframe object without mutating the original object
				if (fullFrameData[Object.keys(deltaFrameData)[0]]) {
					// New additions / updates to values of object
					const additions = Object.values(deltaFrameData) ? Object.values(deltaFrameData)[0] : {};
					// Append new values / updates to values of object
					let updateValues = {...fullFrameData[Object.keys(deltaFrameData)[0]], ...additions}
					// Create a new key-value pair from deltaFrame key and new/updated values
					let newObj = {};
					newObj[Object.keys(deltaFrameData)[0]] = updateValues;
					// Append new object to fullFrame data object without mutation of original one
					let renderAll = {...fullFrameData, ...newObj};
					// Return object
					return renderAll;
				} else {
					// Append deltaFrame object to fullFrame object and return it
					let renderAll = {...fullFrameData, ...deltaFrameData};
					return renderAll;
				}
			}
			// Fallback if deltaFrameData will not meet the condition requirements
			return fullFrameData;
		}
	}, [fullFrameData, deltaFrameData])

	const reconnect = () => {
		if (WSClient != null) {
			try {
				WSClient.close();
			} catch (e) {
				console.log("Ignored exception: ", e)
			}
		}

		if (isMounted.current === false) return;

		WSClient = props.app.createWebSocket(serviceName, wsSubPath);

		// TODO: remove onopen
		WSClient.onopen = () => {
			console.log('ws connection open');
		}

		WSClient.onmessage = (message) => {
			setLoading(false);
			if (IsJsonString(message.data) == true) {
				let retrievedData = JSON.parse(message.data);
				if (retrievedData && Object.keys(retrievedData)) {
					if (Object.keys(retrievedData).length > 1) {
						// Set full frame data
						setFullFrameData(retrievedData);
						setFFData(true);
					} else {
						// Set delta frame data
						setDeltaFrameData(retrievedData);
					}
				}
			} else {
				const err = {};
				err["parsingError"] = true;
				setData(err);
			}
			setError(false);
		};

		WSClient.onerror = (error) => {
			setLoading(false);
			setError(true);
			setTimeout(() => {
				reconnect();
			}, 3000, this);
		};
	}


	// Generate status
	/*
		Cannot use generateStatus func export from utils, cause it causes
		"Rendered more hooks than during the previous render." error
	*/
	const generateStatus = (status) => {

		if (status === undefined) {
			return (<div className="status-circle" title={t("ExportContainer|Not defined")} />);
		}
		if (typeof status === "string") {
			return statusTranslations(status);
		}
		if (typeof status === "object") {
			return statusTranslations(status.name);
		}
		return status;
	}

	// Translate well known statuses
	const statusTranslations = (status) => {

		if (status.toLowerCase() === "running") {
			return (<div className="status-circle status-running" title={t("InstancesContainer|Running")} />);
		};
		if (status.toLowerCase() === "starting") {
			return (<div className="status-circle status-starting" title={t("InstancesContainer|Starting")} />);
		};
		if (status.toLowerCase() === "stopped") {
			return (<div className="status-circle status-stopped" title={t("InstancesContainer|Stopped")} />);
		};
		if (status.toLowerCase() === "unknown") {
			return (<div className="status-circle" title={t("InstancesContainer|Unknown")} />);
		};
		return (<div className="status-circle" title={status} />);
	}

	// const headers = [
	// 	// {
	// 	// 	name: " ",
	// 	// 	customHeaderStyle: { width: '2.5rem' },
	// 	// 	customComponent: {
	// 	// 		generate: (obj) => {
	// 	// 			if (obj["attention_required"] && Object.keys(obj["attention_required"]).length > 0) {
	// 	// 				return (
	// 	// 					<i className="cil-warning"></i>
	// 	// 				)
	// 	// 			}
	// 	// 		}
	// 	// 	}
	// 	// },
	// 	{ name: t('MicroservicesContainer|ID'), key: 'id' },
	// 	{ name: t('MicroservicesContainer|Host'), key: 'hostname' },
	// 	{ name: t('MicroservicesContainer|Launch time'), key: 'launchtime', datetime: true },
	// 	{ name: t('MicroservicesContainer|Created at'), key: 'created_at', datetime: true },
	// 	{ name: t('MicroservicesContainer|Version'), key: 'version'}
	// ];

	// // Filter the value
	// const onSearch = (value) => {
	// 	setFilter(value);
	// };

	// useEffect(() => {
	// 	getMicroservicesList();
	// }, [page, filter ,limit]);

	// const getMicroservicesList = async () => {
	// 	try {
	// 		const response = await LMIORemoteControlAPI.get('/microservices', { params: { p: page, i: limit, f: filter }});

	// 		if (response.data.result !== "OK") throw new Error(response);

	// 		setList(response.data.data);
	// 		setCount(response.data.count);
	// 	} catch (e) {
	// 		console.error(e);
	// 		props.app.addAlert("warning", t('MicroservicesContainer|Failed to fetch data'));
	// 	}
	// }

	// const customRowStyle = {
	// 	style: {
	// 		backgroundColor: "#fff3cd",
	// 		color: "#856404"
	// 	},
	// 	condition: (obj) => {
	// 		if (obj["attention_required"] && Object.keys(obj["attention_required"]).length > 0) return true;
	// 		return false;
	// 	}
	// }
	// console.log(data, "DATA")
	return (
		<Container className="svcs-container" fluid>
			{loading == true ?
				<Card className="h-100">
					<CardHeader className="border-bottom">
						<div className="card-header-title">
							{t("InstancesContainer|Instances")}
						</div>
					</CardHeader>
					<CardBody>
						<div className="spinner"><Spinner /></div>
					</CardBody>
				</Card>
				:
				error == true ?
				<Card className="h-100" style={{backgroundColor: "transparent", border: "none"}}>
					<CardHeader className="border-bottom">
						<div className="card-header-title">
							{t("InstancesContainer|Instances")}
						</div>
					</CardHeader>
					<CardBody style={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
						<div>
						<img
							src={emptyContentImg}
							alt={emptyContentAlt}
							style={{maxWidth: "38%"}}
						/>
						<h3>{t("InstancesContainer|Can't establish websocket connection, data can't be loaded")}</h3>
						</div>
					</CardBody>
				</Card>
				:
				<Card className="h-100">
					<CardHeader className="border-bottom">
						<div className="card-header-title">
							{t("InstancesContainer|Services")}
						</div>
					</CardHeader>
					<CardBody className="h-100 instances-body">
						{(data["parsingError"] == true) ?
							<div>
								<div>{t("InstancesContainer|Can't display data due to parsing error")}</div>
							</div>
						:
							data && Object.keys(data).map((key, idx) => {
								return(<div key={key}>
									<Row className="pl-3 pr-3"><span className="pr-1 pt-1">{generateStatus(data[key]?.state)}</span><h6>{key}</h6></Row>
									<ReactJson
										src={data[key]}
										name={false}
										collapsed={true}
										displayArrayKey={false}
										displayDataTypes={false}
										enableClipboard={false}
										theme={theme === "dark" ? "chalk" : "rjv-default"}
									/>
								</div>)
							})
						}
					</CardBody>
				</Card>
			}
		</Container>
	)
}

// Check if string is valid JSON
function IsJsonString(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}
