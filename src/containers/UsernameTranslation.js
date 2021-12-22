import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

/*
At the moment works ONLY with apiPath='seacat_auth'
- userId (required, array) - user ids to be translated
- apiPath - default (and only working so far) 'seacat_auth'
- cleanupTime - default set to 24 hours

Usage:

import { Credentials } from 'asab-webui';
...
<Credentials app={props.app} id={['user1-id', 'user2-id', 'user3-id']} apiPath='seacat_auth' cleanupTime={1000 * 60 * 60 * 24 * 14}/>

*/

export function Credentials(props) {

	const { t } = useTranslation();

	const apiPath = props.apiPath ?? 'seacat_auth';
	let API = props.app.axiosCreate(apiPath);

	const userIdsArray = Array.isArray(props.userId) ? props.userId : [props.userId] ;

	const cleanupTime = props.cleanupTime ?? 1000 * 60 * 60 * 24; // 24 hrs

	const [usernames, setUsernames] = useState([]);

	// asks the server for usernames, saves them to local storage and sets usernames to render
	const retrieveUserNames = async () => {
		try {
			let response = await API.put(`usernames`, userIdsArray);
			if (response.data.result !== "OK") {
				throw new Error(t("ASABCredentials|Something went wrong, failed to fetch assigned credentials"));
			}
			const usernamesToLS = setUsernamesToLS(response.data.data, userIdsArray, cleanupTime);
			setUsernames(usernamesToLS);
		} catch (e) {
			props.app.addAlert("warning", t("ASABCredentials|Something went wrong, failed to fetch assigned credentials"));
		}
	}

	// compares array of IDs with data in localstorage
	const matchUserIds = (credentials_id) => {
		let currentTime = Date.now();
		const usernamesInLS = getUsernamesFromLS('Credentials', cleanupTime);
		let usernamesToRender = [];

		if (usernamesInLS.credentials == undefined || usernamesInLS.credentials.length === 0 || usernamesInLS.expiration <= currentTime) {
			retrieveUserNames();
			return;
		}

		for (let i = 0; i < credentials_id.length; i++) {
			const indexFromLS = usernamesInLS.credentials.findIndex((itemInLS) => itemInLS.id === credentials_id[i]);
			if (indexFromLS === -1) {
				retrieveUserNames();
				return;
			}
			usernamesToRender.push({ username: usernamesInLS.credentials[indexFromLS].username, id: usernamesInLS.credentials[indexFromLS].id });
		}
		setUsernames(usernamesToRender);
	}

	useEffect(() => {
		matchUserIds(userIdsArray);
	}, [])

	return (
		<>
			{ usernames && usernames.length !== 0 ?
				usernames.map((userObj) => {
					return (
						<div title={userObj.id}>
							<i className="cil-user pr-1"></i>
							<Link to={{ pathname: `/auth/credentials/${userObj.id}` }}>
								{userObj.username}
							</Link>
						</div>
					)
				})
				:
				userIdsArray.map((credentials_id) => {
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
	if (global.localStorage) {
		try {
			ls = JSON.parse(global.localStorage.getItem(name.toString()));
		} catch (e) {
			/*Ignore*/
		}
	}
	return ls ? ls : { credentials: [], expiration: new Date().getTime() + cleanupTime };
}

function setUsernamesToLS(data, userIdsArray, cleanupTime) {
	if (global.localStorage) {
		let dataInLS = getUsernamesFromLS('Credentials', cleanupTime);
		let dataToLS = [];
		userIdsArray.map((credential_id) => {
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
		try {
			global.localStorage.setItem('Credentials', JSON.stringify(dataInLS));
		}
		catch (e) {
			console.error(e);
		}
		return dataToLS;
	}
}