import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

/*
At the moment works ONLY with apiPath='seacat_auth'
- userId (required, array) - user ids to be translated
- apiPath - default (and only working so far) 'seacat_auth'

Usage:

import { UsernameTranslation } from 'asab-webui';
...
<UsernameTranslation app={props.app} id={[user1-id, user2-id, user3-id]} apiPath='seacat_auth' />

*/

export function UsernameTranslation(props) {

	const id = Array.isArray(props.userId) ? props.userId : [props.userId] ;
	const apiPath = props.apiPath ?? 'seacat_auth';
	const { t } = useTranslation();
	let API = props.app.axiosCreate(apiPath);
	const [usernames, setUsernames] = useState({});
	const USERNAMES_CACHE = "usernames";
	const twoWeeks = 1000 * 60 * 60 * 24 * 14;
	// test ids
	// const kryton = 'mongodb:ext:618ced0fe6f6e38ab6a9c8b8';
	// const rimmer = 'mongodb:ext:618be17866f6ee5de4ae5328';
	// const id = [kryton,  rimmer];

	const retrieveUserNames = async () => {
		try {
			let response = await API.put(`usernames`, id);
			if (response.data.result !== "OK") {
				throw new Error(t("TenantDetailContainer|Something went wrong, failed to fetch assigned credentials"));
			} 
			console.log('id: ', id, 'response.data.data: ', response.data.data);
			setUsernames(response.data.data);
			setUsernamesToCache(id, response.data.data);
			
		} catch (e) {
			console.error(e);
			props.app.addAlert("warning", t("TenantDetailContainer|Something went wrong, failed to fetch assigned credentials"));
		}
	}

	const getUsernamesCache = () => {
		let usernamesCache = {
				data: {},
				nextCleanup: new Date().getTime() + twoWeeks
		};
		try {
			const data = localStorage.getItem(USERNAMES_CACHE);
			if (data){
				usernamesCache = JSON.parse(data);
			}
		}
		catch(e){
			console.error(e.message);
		}
		return usernamesCache
	}

	const setUsernamesToCache = (userId, value) => {
		userId.map((element) => {
			const usernamesCache = getUsernamesCache();	
			const data = usernamesCache.data;
			const item = {
				id: element,
				username: value[element],
				expiry: new Date().getTime() + twoWeeks
			};
			data[element] = item;
			try{
				localStorage.setItem(USERNAMES_CACHE, JSON.stringify(usernamesCache));
			}
			catch(e){
				// cleanUpStorage(data);
				console.error(e)
			}
		})
	}

	// const currentTime = () => {
	// 	return Date.now()
	// }
	
	// const cleanUpStorage = (data) => {
	// 	let isDeleted
	// 	let oldest
	// 	let oldestKey
	
	// 	//if 14 days have been passed, it removes the cache
	// 	for (const key in data) {
	// 		const expiry = data[key].expiry
	// 		if (expiry && expiry <= currentTime()) {
	// 		  delete data[key]
	// 		  isDeleted = true
	// 		}
	
	// 		//finding the oldest cache in case none of them are expired
	// 		if (!oldest || oldest > expiry) {
	// 		  oldest = expiry
	// 		  oldestKey = key
	// 		}
	// 	}
	// 	//remove the oldest cache if there is no more space in local storage (5 MB)
	// 	if (!isDeleted && oldestKey) {
	// 		delete data[oldestKey]
	// 	}
	
	// 	localStorage.setItem( USERNAMES_CACHE, JSON.stringify({ data: data, nextCleanup: currentTime() + twoWeeks }) )
	// }

	useEffect(() => {
		console.log('usernames: ', usernames)
		const cachedUsernames = getUsernamesCache().data;
		id.map((element) => {
			try{
				if (cachedUsernames[element]) {
					const curTime = currentTime()
					if (cachedUsernames[element].expiry <= curTime) {
						retrieveUserNames()
					} else {
					let newUsernames = usernames //object
					newUsernames[element] = cachedUsernames[element].username
					setUsernames(newUsernames)
					}
				} else if (!cachedUsernames[element]) {
					retrieveUserNames();
				}
			}
			catch(e){
				console.error(e)
			}
		})
	}, [])

    return (
			<>
				{usernames != {} ?
					Object.keys(usernames).map((key) => {
						return (
							<div title={key}>
								<i className="cil-user pr-1"></i>
								<Link to={{ pathname: `/auth/credentials/${key}`}}>
									{usernames[key]}
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
            	}
			</>
    )
}
