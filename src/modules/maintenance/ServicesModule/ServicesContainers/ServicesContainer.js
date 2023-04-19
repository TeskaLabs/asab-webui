import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ReactJson from 'react-json-view';
import { useSelector } from 'react-redux';

import { Container, Card, CardBody, CardHeader, Table,
	InputGroup, InputGroupText, Input, InputGroupAddon,
	ButtonGroup, Button
} from 'reactstrap';

import { CellContentLoader } from 'asab-webui';

import ActionButton from "./components/ActionButton";

export default function ServicesContainer(props) {

	const [fullFrameData, setFullFrameData] = useState({});
	const [wsData, setWSData] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const [filter, setFilter] = useState("");

	const theme = useSelector(state => state.theme);

	const { t } = useTranslation();

	// Set up websocket connection
	let wsSubPath = '/ws';
	const serviceName = 'lmio_remote_control';
	let WSUrl = props.app.getWebSocketURL(serviceName, wsSubPath);
	let WSClient = null;

	const isMounted = useRef(null);

	// Connect to ws on page initialization, close ws connection on page leave
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
		let webSocketData = wsData.data;
		// Render ws data
		if(webSocketData && Object.keys(webSocketData)) {
			// Check for delta frame
			if (wsData?.frame_type === "df") {
				// If key in full frame, update data, otherwise append wsData to fullframe object without mutating the original object
				let renderAll = {...fullFrameData, ...{}};
				Object.keys(webSocketData).map((dfd, idx) => {
					if (fullFrameData[dfd]) {
						// New additions / updates to values of object
						const additions = webSocketData[dfd] ? webSocketData[dfd] : {};
						// Append new values / updates to values of object
						let updateValues = {...renderAll[dfd], ...additions}
						// Create a new key-value pair from deltaFrame key and new/updated values
						let newObj = {};
						newObj[dfd] = updateValues;
						// Append new object to fullFrame data object without mutation of original one
						renderAll = {...renderAll, ...newObj};
					} else {
						let newObj = {};
						newObj[dfd] = webSocketData[dfd];
						// Append wsData object to fullFrame object and return it
						renderAll = {...renderAll, ...newObj};
					}
				})
				// Set fullFrame with update data from delta frame
				setFullFrameData(renderAll);
				return renderAll;
			} else {
				// Set full frame with full frame data
				setFullFrameData(webSocketData);
				return webSocketData;
			}
		}
		// Fallback if wsData will not meet the condition requirements
		return fullFrameData;
	}, [wsData]) // If websocket data change, then trigger computation of data rendering


	// Filter state among data
	const filteredData = useMemo (() => {
		if ((filter != undefined) && (filter.length > 0)) {
			const fltr = filter.toLowerCase();
			let filteredObj = {};
			Object.keys(fullFrameData).map((key, idx) => {
				if (fullFrameData[key].state) {
					if (fullFrameData[key].state.indexOf(fltr) != -1) {
						filteredObj[key] = fullFrameData[key];
					}
				}
			})
			return filteredObj;
		}
		return undefined;
	}, [filter, fullFrameData])

	// Reconnect ws method
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
					// Set websocket data
					setWSData(retrievedData);
				}
				setError(false);
			} else {
				setErrorMsg(t("ServicesContainer|Can't display data due to parsing error"));
				setError(true);
			}
		};

		WSClient.onerror = (error) => {
			setLoading(false);
			setErrorMsg(t("ServicesContainer|Can't establish websocket connection, data can't be loaded"));
			setError(true);
			setTimeout(() => {
				reconnect();
			}, 3000, this);
		};
	}


	return (
		<Container className="svcs-container" fluid>
			<Card className="h-100">
				<CardHeader className="border-bottom">
					<div className="card-header-title">
						{t("ServicesContainer|Services")}
					</div>
					<Search
						search={{ icon: 'at-magnifying-glass', placeholder: t("ServicesContainer|Filter state") }}
						filterValue={filter}
						setFilterValue={setFilter}
					/>
				</CardHeader>
				<CardBody className="h-100 services-body">
					{(loading == true) ?
						<CellContentLoader cols={6} rows={6} title={t('ServicesContainer|Loading')}/>
					:
						<Table responsive borderless>
							<colgroup>
								<col span="1" style={{width: "0.5em"}}/>
								<col span="1" />
								<col span="1" />
								<col span="1" />
								<col span="1" />
								<col span="1" />
							</colgroup>
							<thead>
								<tr>
									<th>
									</th>
									<th>
										{t("ServicesContainer|Service")}
									</th>
									<th>
										{t("ServicesContainer|Node ID")}
									</th>
									<th>
										{t("ServicesContainer|Name")}
									</th>
									<th>
										{t("ServicesContainer|Version")}
									</th>
									<th>
									</th>
								</tr>
							</thead>
							<tbody>
							{(error == true) ?
								<tr>
									<td className="td-style" colSpan="7">{errorMsg}</td>
								</tr>
								:
								<DataRow data={filteredData != undefined ? filteredData : data} props={props} />
							}
							</tbody>
						</Table>
					}
				</CardBody>
			</Card>
		</Container>
	)
}

// Method to render table row with data
const DataRow = ({data, props}) => {
	const { t } = useTranslation();

	// Generate status
	/*
		Cannot use generateStatus func from separate container, cause it causes
		"Rendered more hooks than during the previous render." error
	*/
	const generateStatus = (status) => {
		if (status == undefined) {
			return (<div className="service-status-circle" title={t("ServicesContainer|Not defined")} />);
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
			return (<div className="service-status-circle service-status-running" title={t("ServicesContainer|Running")} />);
		};
		if (status.toLowerCase() === "starting") {
			return (<div className="service-status-circle service-status-starting" title={t("ServicesContainer|Starting")} />);
		};
		if (status.toLowerCase() === "stopped") {
			return (<div className="service-status-circle service-status-stopped" title={t("ServicesContainer|Stopped")} />);
		};
		if (status.toLowerCase() === "unknown") {
			return (<div className="service-status-circle" title={t("ServicesContainer|Unknown")} />);
		};
		return (<div className="service-status-circle" title={status} />);
	}

	return(
		data && Object.keys(data).map((objKey) => (
			<RowContent
				key={objKey}
				objKey={objKey}
				data={data}
				generateStatus={generateStatus}
				props={props}
			/>
		))
	)
}

// Content of the row in table
const RowContent = ({props, objKey, data, generateStatus}) => {
	const { t } = useTranslation();
	const theme = useSelector(state => state.theme);
	const [collapseData, setCollapseData] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (data[objKey]?.state && ((data[objKey]?.state == "stopped") || (data[objKey]?.state == "starting"))) {
			setCollapseData(false);
		} else {
			setCollapseData(true);
		}
	},[data[objKey]?.state])

	// Action to start, stop, restart and up the container
	const setAction = async(action, id) => {
		let body = {};
		body["command"] = action;
		const LMIORemoteControlAPI = props.app.axiosCreate('lmio_remote_control');
		try {
			let response = await LMIORemoteControlAPI.post(`/instance/${id}`, body);
			if (response.data.result != "Accepted") {
				throw new Error(`Something went wrong, failed to ${action} container`);
			}
			props.app.addAlert("success", t("ServicesContainer|Service action accepted successfully"));
		} catch(e) {
			console.error(e);
			props.app.addAlert("warning", `${t("ServicesContainer|Service action has been rejected")}. ${e?.response?.data?.message}`, 30);
		}
		setIsSubmitting(false);
	}

	return(
		<>
			<tr key={objKey}>
				<td>
					<div className="caret-status-div">
					{collapseData ?
						<span title={t("ServicesContainer|Un-collapse")} className="caret-icon at-arrow-right-circle" onClick={() => {setCollapseData(false)}}></span>
						:
						<span title={t("ServicesContainer|Collapse")} className="caret-icon at-arrow-down-circle" onClick={() => {setCollapseData(true)}}></span>
					}
					{generateStatus(data[objKey]?.state ? data[objKey].state : undefined)}
					</div>
				</td>
				<td>
					{data[objKey]?.service}
				</td>
				<td>
					<code className="collapsed-code-value">{data[objKey]?.node_id?.toString()}</code>
				</td>
				<td>
					<code className="collapsed-code-value">{data[objKey]?.name?.toString()}</code>
				</td>
				<td>
					{data[objKey]?.advertised_data?.version ? data[objKey]?.advertised_data?.version : data[objKey]?.version ? data[objKey]?.version : "N/A"}
				</td>
				<td>
					<div className="d-flex justify-content-end">
						<ButtonGroup>
							<ActionButton
								label={t("ServicesContainer|Start")}
								id={`start-${objKey.replace(/[^\w\s]/gi, '-')}`}
								className="action-button"
								color="secondary"
								outline
								icon="at-play"
								onClick={() => {setAction("start", data[objKey]?.instance_id), setIsSubmitting(true)}}
								disabled={isSubmitting == true}
							/>
							<ActionButton
								label={t("ServicesContainer|Stop")}
								id={`stop-${objKey.replace(/[^\w\s]/gi, '-')}`}
								className="action-button"
								color="secondary"
								outline
								onClick={() => {setAction("stop", data[objKey]?.instance_id), setIsSubmitting(true)}}
								icon="cil-media-stop"
								disabled={isSubmitting == true}
							/>
							<ActionButton
								label={t("ServicesContainer|Restart")}
								id={`restart-${objKey.replace(/[^\w\s]/gi, '-')}`}
								className="action-button"
								color="secondary"
								outline
								onClick={() => {setAction("restart", data[objKey]?.instance_id), setIsSubmitting(true)}}
								icon="cil-reload"
								disabled={isSubmitting == true}
							/>
							<ActionButton
								label={t("ServicesContainer|Up")}
								id={`up-${objKey.replace(/[^\w\s]/gi, '-')}`}
								color="secondary"
								outline
								onClick={() => {setAction("up", data[objKey]?.instance_id), setIsSubmitting(true)}}
								icon="cil-media-eject"
								disabled={isSubmitting == true}
							/>
						</ButtonGroup>
					</div>
				</td>
			</tr>
			{!collapseData &&
				<tr key={`open-${objKey}`} className="collapsed-data">
					<td colSpan={7}>
						{data[objKey]?.type ?
							<div className="collapsed-heading">
								{t("ServicesContainer|Type")}: <code className="collapsed-code-value">{data[objKey]?.type?.toString()}</code>
							</div>
						:
							null
						}
						{data[objKey]?.returncode?.toString() ?
							<div className="collapsed-heading">
								{t("ServicesContainer|Return code")}: <code className="collapsed-code-value">{data[objKey]?.returncode?.toString()}</code>
							</div>
						:
							null
						}
						{data[objKey]?.error ?
							<div className="collapsed-heading">
								{t("ServicesContainer|Error")}: <code className="collapsed-code-value">{data[objKey]?.error?.toString()}</code>
							</div>
						:
							null
						}
						{data[objKey]?.exception ?
							<div className="collapsed-console">
								<span className="collapsed-heading collapsed-span">
									{t("ServicesContainer|Exception")}:
								</span>
								<ReactJson
									src={data[objKey]?.exception}
									name={false}
									collapsed={true}
									displayArrayKey={false}
									displayDataTypes={false}
									enableClipboard={false}
									theme={theme === "dark" ? "chalk" : "rjv-default"}
								/>
							</div>
						:
							null
						}
						{data[objKey]?.console ?
							<div className="collapsed-console">
								<span className="collapsed-heading collapsed-span">
									{t("ServicesContainer|Console")}:
								</span>
								<ReactJson
									src={data[objKey]?.console}
									name={false}
									collapsed={true}
									displayArrayKey={false}
									displayDataTypes={false}
									enableClipboard={false}
									theme={theme === "dark" ? "chalk" : "rjv-default"}
								/>
							</div>
						:
							null
						}
						{data[objKey]?.detail ?
							<CollapsedTable
								obj={data[objKey]?.detail}
								title={t("ServicesContainer|Detail")}
							/>
						:
							null
						}
						{data[objKey]?.advertised_data ?
							<CollapsedTable
								obj={data[objKey]?.advertised_data}
								title={t("ServicesContainer|Advertised data")}
							/>
						:
							null
						}
					</td>
				</tr>
			}
		</>
	)
}

// Method to display collapsed table
const CollapsedTable = ({obj, title}) => {
	const theme = useSelector(state => state.theme);

	return(
		<Table responsive borderless>
			<thead>
				<tr className="collapsed-table-row">
					<th>{title}</th>
				</tr>
			</thead>
			<tbody>
				{Object.keys(obj).length != 0 && Object.entries(obj).map((itms, idx) => {
					return(
						<tr
							className="collapsed-table-row"
							key={idx}
						>
							<td
								style={{whiteSpace: "nowrap"}}
							>
								<code
									style={{fontSize: "100%"}}
									className={itms[0] && itms[0].toString().includes(".") == false ? "code-main-field" : "code-sub-field"}
								>
									{itms[0] && itms[0].toString()}
								</code>
							</td>
							<td>
								{itms[1] ?
									(typeof itms[1] == "object") && (Object.keys(itms[1]).length > 0) ?
										<ReactJson
											src={itms[1]}
											name={false}
											collapsed={true}
											displayDataTypes={false}
											displayArrayKey={false}
											enableClipboard={false}
											theme={theme === 'dark' ? "chalk" : "rjv-default"}
										/>
									:
										<code className="collapsed-code-value">{itms[1] && itms[1].toString()}</code>
								: "-"}
							</td>
						</tr>
					)
				})}
			</tbody>
		</Table>
	)
}


// Search method
const Search = ({ search, filterValue, setFilterValue }) => {

	return (
		<div className="float-right ml-3 data-table-search">
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
	);
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
