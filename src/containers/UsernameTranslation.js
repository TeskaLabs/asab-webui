import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

/*
At the moment works ONLY with apiPath='seacat_auth'
- userId (required, array) - user ids to be translated
- apiPath - default (and only working so far) 'seacat_auth'
- cleanupTime - default set to 24 hours

Usage:

import { UsernameTranslation } from 'asab-webui';
...
<UsernameTranslation app={props.app} id={['user1-id', 'user2-id', 'user3-id']} apiPath='seacat_auth' cleanupTime={1000 * 60 * 60 * 24 * 14}/>

*/

export function UsernameTranslation(props) {

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
				throw new Error(t("ASABUsernameTranslation|Something went wrong, failed to fetch assigned credentials"));
			}
			if (Object.keys(response.data.data).length === 0) {
				throw new Error('..no data');
			}
			const usernamesToLS = setUsernamesToLS(response.data.data, userIdsArray, cleanupTime);
			setUsernames(usernamesToLS);
		} catch (e) {
			props.app.addAlert("warning", t("ASABUsernameTranslation|Something went wrong, failed to fetch assigned credentials"));
		}
	}

	const currentTime = () => {
		return Date.now();
	};

	// compares array of IDs with data in localstorage
	const matchUserIds = (usernameIDs) => {
		let currTime = currentTime();
		const usernamesInLS = getUsernamesFromLS('UsernameTranslations', cleanupTime);
		let usernamesToRender = [];

		if (usernamesInLS.usernames == undefined || usernamesInLS.usernames.length === 0 || usernamesInLS.expiration <= currTime) {
			retrieveUserNames();
			return;
		}

		usernameIDs.map((ID) => {
			const indexFromLS = usernamesInLS.usernames.findIndex((itemInLS) => itemInLS.id === ID);
			if (indexFromLS === -1) {
				retrieveUserNames();
				return;
			}
			usernamesToRender.push({ username: usernamesInLS.usernames[indexFromLS].username, id: usernamesInLS.usernames[indexFromLS].id });
		})
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
				userIdsArray.map((userId) => {
					return (
						<div>
							<i className="cil-user pr-1"></i>
							<Link to={{ pathname: `/auth/credentials/${userId}` }}>
								{userId}
							</Link>
						</div>
					)
				})
			}
		</>
	)
}

// Get usernames from localstorage
function getUsernamesFromLS(username, cleanupTime) {
	let ls;
	if (global.localStorage) {
		try {
			ls = JSON.parse(global.localStorage.getItem(username.toString()));
		} catch (e) {
			/*Ignore*/
		}
	}
	return ls ? ls : { usernames: [], expiration: new Date().getTime() + cleanupTime };
}

function setUsernamesToLS(data, userIdsArray, cleanupTime) {
	if (global.localStorage) {
		let dataInLS = getUsernamesFromLS('UsernameTranslations', cleanupTime);
		let dataToLS = [];
		userIdsArray.map((id) => {
			let item = {};
			if (data[id]) {
				item = {
					id: id,
					username: data[id],
				};
			}
			if (!data[id]) {
				item = {
					id: id,
					username: 'N/A'
				}
			}
			const indexFromLS = dataInLS.usernames.findIndex((itemInLS) => itemInLS.id === item.id);
			if (indexFromLS === -1) {
				dataInLS.usernames.push(item);
			}
			dataToLS.push(item);
		})
		try {
			global.localStorage.setItem('UsernameTranslations', JSON.stringify(dataInLS));
		}
		catch (e) {
			console.error(e);
		}
		return dataToLS;
	}
}