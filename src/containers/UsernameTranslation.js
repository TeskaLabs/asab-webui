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
<UsernameTranslation app={props.app} id={[user1-id, user2-id, user3-id]} apiPath='seacat_auth' cleanupTime={1000 * 60 * 60 * 24 * 14}/>

*/

export function UsernameTranslation(props) {

	const [usernames, setUsernames] = useState({});
	const { t } = useTranslation();
	// const id = Array.isArray(props.userId) ? props.userId : [props.userId] ;
	const apiPath = props.apiPath ?? 'seacat_auth';
	// const apiPath = props.apiPath ?? 'seacat_auth';
	let API = props.app.axiosCreate(apiPath);
	const cleanupTime = props.cleanupTime ?? 1000 * 60 * 60 * 24; // 24 hrs
	const id = ['mongodb:ext:618be29366f6ee5de4ae5541', 'mongodb:ext:618d105ee6f6e38ab6a9e7a2']
	// const id = ['mongod618b5de4ae55', 'mongodb:ext:617fcd5440cfa90b4aefacb6']
	// const id = ['mongod618b5de4ae55', 'mongodb:ext:617fcd5440cfa90b4aefacb6']
	// const id = ['mongodb:ext:617fcd5440cfa90b4aefacb6']

// asks the server for usernames and saves them to local storage
	const retrieveUserNames = async () => {
		try {
			let response = await API.put(`usernames`, id);
			if (response.data.result !== "OK") {
				throw new Error(t("ASABUsernameTranslation|Something went wrong, failed to fetch assigned credentials"));
			}
			if (Object.keys(response.data.data).length === 0) {
				console.error(e)
			} else {
				setUsernames(response.data.data);
				setUsernamesToLS(id, response.data.data);
			}
		} catch (e) {
			console.error('ln46: ', e);
			props.app.addAlert("warning", t("ASABUsernameTranslation|Something went wrong, failed to fetch assigned credentials"));
		}
	}

	const getUsernamesFromLS = () => {
		let usernamesInLS = {
				data: {}
		};
		try {
			const data = localStorage.getItem('usernames');
			if (data){
				usernamesInLS = JSON.parse(data);
			}
		}
		catch(e){
			console.error(e.message);
		}
		return usernamesInLS
	}

	const setUsernamesToLS = (id, value) => {
		id.map((userID) => {
			const usernamesInLS = getUsernamesFromLS();	
			const data = usernamesInLS.data;
			if(value[userID]){
				const item = {
					id: userID,
					username: value[userID],
					expiry: new Date().getTime() + cleanupTime
				};
				data[userID] = item;
			}
			try{
				localStorage.setItem('usernames', JSON.stringify(usernamesInLS));
			}
			catch(e){
				cleanUpStorage(data);
				console.error(e);
			}
		})
	}

	const currentTime = () => {
		return Date.now();
	};
	
//if expiry date has been passed, remove data from local storage
	const cleanUpStorage = (data) => {
		for (const key in data) {
			const expiry = data[key].expiry;
			if (expiry && expiry <= currentTime()) {
			  delete data[key]
			}
		}
		localStorage.setItem('usernames', JSON.stringify({ data: data }))
	}

	useEffect(() => {
		const usernamesInLS = getUsernamesFromLS().data;
		const curTime = currentTime();

		for (let i=0; i < id.length; i++){
			if(usernamesInLS[id[i]]) {
	 			if (usernamesInLS[id[i]].expiry <= curTime) {
					retrieveUserNames();
					break;
				} else {
				let newUsernames = usernames;
				newUsernames[id[i]] = usernamesInLS[id[i]].username;
				setUsernames(newUsernames);
				}
			} else if (!usernamesInLS[id[i]]) {
				console.log('ln126: usernames missing in LS, retrieval in progress now')
				retrieveUserNames();
				break;
			}
		}
		// id.map((userID) => {
		// 		if(usernamesInLS[userID]) {
		// 			if (usernamesInLS[userID].expiry <= curTime) {
		// 				retrieveUserNames();
		// 			} else {
		// 			let newUsernames = usernames;
		// 			newUsernames[userID] = usernamesInLS[userID].username;
		// 			setUsernames(newUsernames);
		// 			}
		// 		} else if (!usernamesInLS[userID]) {
		// 			console.log('ln121: usernames missing in LS, retrieval in progress now')
		// 			retrieveUserNames();
		// 		}
		// })
	}, [])

	useEffect(() => {
		console.log('ln148 usernames: ', usernames)
	}, [usernames])

    return (
			<>
				{ Object.keys(usernames).length !== 0 ?
					id.map((userId)=>{
						if(usernames[userId]){
							console.log('ln 156 console.log(usernames[userId]: ', usernames, userId)
							return (
									<div title={userId}>
										<i className="cil-user pr-1"></i>
										<Link to={{ pathname: `/auth/credentials/${userId}`}}>
											{usernames[userId]}
										</Link>
									</div>
								)
						} else  {
							console.log('ln 166 usernames[userId]: ', usernames, userId)
							return (
									<div title={userId}>
										<i className="cil-user pr-1"></i>
										<Link to={{ pathname: `/auth/credentials/${userId}`}}>
											{userId}
										</Link>
									</div>
								)
						}

					}) :
					id.map((userId) => {
						console.log('usernames length === 0')
						return (
							<div>
								<i className="cil-user pr-1"></i>
								<Link to={{ pathname: `/auth/credentials/${userId}`}}>
									{userId}
								</Link>
							</div>
						)
					})


				}


				{/* {Object.keys(usernames).length !== 0 && usernames.constructor === Object ?
					Object.keys(usernames).map((key) => {
						console.log('ln133: ', usernames)
						return (
							<div title={key}>
								<i className="cil-user pr-1"></i>
								<Link to={{ pathname: `/auth/credentials/${key}`}}>
									{usernames[key] ?? key}
								</Link>
							</div>
						)
					}) :
						id.map((elem) => {
							return (
								<div>
									<i className="cil-user pr-1"></i>
									<Link to={{ pathname: `/auth/credentials/${elem}`}}>
										{elem}
									</Link>
								</div>
							)
						})
            	} */}
			</>
    )
}
