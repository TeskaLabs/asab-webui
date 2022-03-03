import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

// description and examples in `asab-webui/doc/credentials.md`

export function Credentials(props) {

	const { t } = useTranslation();

	const apiPath = props.apiPath ?? 'seacat_auth';
	let API = props.app.axiosCreate(apiPath);

	const credentials_ids = Array.isArray(props.credentials_ids) ? props.credentials_ids : [props.credentials_ids] ;

	const cleanupTime = props.cleanupTime ?? 1000 * 60 * 60 * 24; // 24 hrs

	const [credentials, setCredentials] = useState([]);

	// asks the server for usernames, saves them to local storage and sets usernames to render
	const retrieveUserNames = async () => {
		try {
			let response = await API.put(`usernames`, credentials_ids);
			if (response.data.result !== "OK") {
				throw new Error(t("ASABCredentials|Something went wrong, failed to fetch assigned credentials"));
			}
			const usernamesToLS = saveUsernamesToLS(response.data.data, credentials_ids, cleanupTime);
			setCredentials(usernamesToLS);
		} catch (e) {
			props.app.addAlert("warning", t("ASABCredentials|Something went wrong, failed to fetch assigned credentials"));
		}
	}

	// compares array of IDs with data in localstorage
	const matchCredentialIds = (credentials_ids) => {
		const usernamesInLS = getUsernamesFromLS('Credentials', cleanupTime);
		let usernamesToRender = [];
		if (usernamesInLS.credentials == undefined || usernamesInLS.credentials.length === 0 || usernamesInLS.expiration <= Date.now()) {
			retrieveUserNames();
			return;
		}
		for (let i = 0; i < credentials_ids.length; i++) {
			const indexFromLS = usernamesInLS.credentials.findIndex((itemInLS) => itemInLS.id === credentials_ids[i]);
			if (indexFromLS === -1) {
				retrieveUserNames();
				return;
			}
			usernamesToRender.push({ username: usernamesInLS.credentials[indexFromLS].username, id: usernamesInLS.credentials[indexFromLS].id });
		}
		setCredentials(usernamesToRender);
	}

	useEffect(() => {
		matchCredentialIds(credentials_ids);
	}, [])

	return (
		<>
			{ credentials && credentials.length !== 0 ?
				credentials.map((credentialObj) => {
					return (
						<div title={credentialObj.id}>
							<i className="cil-user pr-1"></i>
							<Link to={{ pathname: `/auth/credentials/${credentialObj.id}` }}>
								{credentialObj.username}
							</Link>
						</div>
					)
				})
				:
				credentials_ids.map((credentials_id) => {
					return (
						<div>
							<i className="cil-user pr-1"></i>
							<Link to={{ pathname: `/auth/credentials/${credentials_id}` }}>
								{credentials_id}
							</Link>
						</div>
					)
				})
			}
		</>
	)
}

// Get usernames from localstorage
function getUsernamesFromLS(name, cleanupTime) {
	let ls;
	if (localStorage) {
		try {
			ls = JSON.parse(localStorage.getItem(name.toString()));
		} catch (e) {
			/*Ignore*/
		}
	}
	return ls ? ls : { credentials: [], expiration: new Date().getTime() + cleanupTime };
}

function saveUsernamesToLS(data, credentials_ids, cleanupTime) {
	if (localStorage) {
		let dataInLS = getUsernamesFromLS('Credentials', cleanupTime);
		let dataToLS = [];
		credentials_ids.map((credential_id) => {
			let item = {};
			if (data[credential_id]) {
				item = {
					id: credential_id,
					username: data[credential_id],
				};
			}
			if (!data[credential_id]) {
				item = {
					id: credential_id,
					username: credential_id
				}
			}
			const indexFromLS = dataInLS.credentials.findIndex((itemInLS) => itemInLS.id === item.id);
			if (indexFromLS === -1) {
				dataInLS.credentials.push(item);
			}
			dataToLS.push(item);
		})
		localStorage.setItem('Credentials', JSON.stringify(dataInLS));
		return dataToLS;
	}
}