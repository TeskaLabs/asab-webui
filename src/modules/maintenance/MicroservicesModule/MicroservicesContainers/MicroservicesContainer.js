import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ReactJson from 'react-json-view';

import { Container } from 'reactstrap';

import { DataTable, Spinner } from 'asab-webui';

import "./microservices.scss";

export default (props) => {
	// const [list, setList] = useState([]);
	// const [page, setPage] = useState(1);
	// const [count, setCount] = useState(0);
	// const [filter, setFilter] = useState("");
	// const [limit, setLimit] = useState(20);

	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);

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

	const reconnect = () => {
		console.log(WSClient, 'WS CLIENT V RECONNECT')
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
			// setLoading(false);
			console.log('ws connection open');
		}

		WSClient.onmessage = (message) => {
			setLoading(false);
			if (IsJsonString(message.data) == true) {
				setData(JSON.parse(message.data));
			} else {
				const err = {};
				err["parsingError"] = true;
				setData(err);
			}
			// DO something
			console.log(JSON.parse(message.data), "MESSAGE")
		};

		WSClient.onerror = (error) => {
			// DO something
			setLoading(false);
			console.warn(error, "ERROR Z WEBSOCKETU")
			setTimeout(() => {
				reconnect();
			}, 3000, this);
		};
	}

	// const headers = [
	// 	{
	// 		name: " ",
	// 		customHeaderStyle: { width: '2.5rem' },
	// 		customComponent: {
	// 			generate: (obj) => {
	// 				if (obj["attention_required"] && Object.keys(obj["attention_required"]).length > 0) {
	// 					return (
	// 						<i className="cil-warning"></i>
	// 					)
	// 				}
	// 			}
	// 		}
	// 	},
	// 	{ name: t('MicroservicesContainer|ID'), key: 'id', link: { key: "id", pathname: "/microservices/svcs/" } },
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

	return (
		<Container className="svcs-container" fluid>
			{loading == true ? <div className="spinner"><Spinner /></div> :
				<ReactJson
					src={data}
					name={false}
					collapsed={false}
					// theme={theme === 'dark' ? "chalk" : "rjv-default"}
				/>
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
