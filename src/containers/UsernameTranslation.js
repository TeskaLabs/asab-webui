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
	const [usernames, setUsernames] = useState();
	const USERNAMES_CACHE = "usernames";
	const twoWeeks = 1000 * 60 * 60 * 24 * 14;

	const retrieveUserNames = async () => {
		try {
			let response = await API.put(`usernames`, id);
			if (response.data.result !== "OK") {
				throw new Error(t("TenantDetailContainer|Something went wrong, failed to fetch assigned credentials"));
			} 
			console.log('id: ', id, 'response.data.data: ', response.data.data);
			setUsernamesToCache(id, response.data.data);
			setUsernames(response.data.data);
		} catch (e) {
			console.error(e);
			props.app.addAlert("warning", t("TenantDetailContainer|Something went wrong, failed to fetch assigned credentials"));
		}
	}

	const getUsernamesCache = () => {
		let usernamesCache = {
				usernames: {},
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
		console.log('line 56', usernamesCache)
		return usernamesCache
	}

	const setUsernamesToCache = (userId, value) => {
		const usernamesCache = getUsernamesCache();
		console.log('line 63', usernamesCache)

		const usernames = usernamesCache.usernames;
		const item = {
			id: userId,
			expiry: new Date().getTime() + twoWeeks,
			usernames: value
		};
		// usernames[userId] = item;
		try{
			localStorage.setItem(USERNAMES_CACHE, JSON.stringify(usernamesCache));
			console.log('localstorage usernames line 74: ', JSON.parse(localStorage.getItem(USERNAMES_CACHE)))
		}
		catch(e){
			// cleanUpStorage(data);
			console.error(e)
		}
	}

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
	// 		  oldestKey=key
	// 		}
	// 	}
	// 	//remove the oldest cache if there is no more space in local storage (5 MB)
	// 	if (!isDeleted && oldestKey) {
	// 		delete data[oldestKey]
	// 	}
	
	// 	localStorage.setItem( USERNAMES_CACHE, { data: data, nextCleanup: currentTime() + twoWeeks } )
	// }

	const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
		  ref.current = value;
		//   console.log('line 113: ', ref, ref.current)
        });
        return ref.current;
	}
	
	const currentTime = () => {
		return Date.now()
	}

	const prevUser = usePrevious(id);
	// console.log('line 119 prevuser: ', prevUser)

	useEffect(() => {
		retrieveUserNames();
	}, [])

	useEffect(() => {
		usernames && console.log('line 120: ', usernames);
		console.log('localstorage usernames line 121: ', JSON.parse(localStorage.getItem(USERNAMES_CACHE)))

	}, [usernames])

	// useEffect(() => {
    //     if (prevUser !== id) {
    //         setUsernames(undefined);
    //     }
    //     const cache = getUsernamesCache("USERNAMES_CACHE")
    //     if(id in cache.data){
	// 		setUsernames(cache.data[id].usernames)
	// 		console.log('we here on line 132')
    //     }
    //     console.log('line 134 usernames: ', usernames)
	// }, [id, usernames])

    return (
			<>
				{usernames && usernames.length != 0 ?
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
