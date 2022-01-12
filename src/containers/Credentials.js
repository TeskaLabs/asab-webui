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

	// let db;
	const [db, setDb] = useState(null)

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

	const createIndexedDB = () => {
		const request = window.indexedDB.open('ASAB|Credentials', 1);
		let db
		request.onupgradeneeded = (e) => {
			console.info('Database created');
			db = e.target.result;
			console.log('db', db)
			db.createObjectStore('Credentials', {keyPath: "credential_id"});
		};
		request.onsuccess = (e) => {
			setDb(e.target.result);
			console.log('success!!!!');
		};
		request.onerror = (e) => {
			console.error(`IndexedDB error bráško: ${request.errorCode}`);
		};
		console.log('aadfasdfsdfasdfsfa', db);
		return db
	}

	const saveToIndexDB = () => {
		console.log('inside saveCredentialsToIndexedDB function')
	
		const credz = [{
			credential_id: 'mongodb:ext:617fcfb940cfa90b4aefaf39',
			credential_title: "lobster"
			},{
				credential_id: 'mongodb:ext:69420',
				credential_title: "Blaze"
			}
		]
	
		const tx = db.transaction('Credentials', 'readwrite');
		const credsDB = tx.objectStore('Credentials');
		console.log('credsDB: ', credsDB)
		credz.map((cred)=>{
			credsDB.add(cred)
		})
	}
	
	useEffect(() => {
		matchCredentialIds(credentials_ids);
		// initiateIndexedDB(db)
		setDb(createIndexedDB())
	}, [])

	useEffect(() => {
		// setTimeout(() =>  console.log('db here bro: ', db), 2000)
		db && saveToIndexDB()
		// db && saveCredentialsToIndexedDB(db);
	}, [db])

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

// function initiateIndexedDB(db) {
// 	console.log('inside CreateIndendexdDB function')
// 	const request = window.indexedDB.open('ASAB|Credentials', 1);
	
// 	request.onupgradeneeded = (e) => {
// 		console.info('Database created');
// 		db = e.target.result;
// 		console.log('db', db)
// 		const credTable = db.createObjectStore('Credentials', {keypath: "credential_id"});
		
// 		request.onsuccess = (e) => {
// 			// db = request.result
// 			db = e.target.result;
// 			console.log('success!!!!');
// 			//  console.log(db);
// 		};
		
// 		request.onerror = (e) => {
// 			console.error(`IndexedDB error bráško: ${request.errorCode}`);
// 		};
// 		console.log('aadfasdfsdfasdfsfa', db)
// 		return db	 
// 	}
// 	console.log('db inside createIndexedDB', db)
// }
	
function saveCredentialsToIndexedDB(db) {
	// createIndexedDB(db)
	 console.log('inside saveCredentialsToIndexedDB function')
	
	 const cred = {
	     credential_id: 'mongodb:ext:617fcfb940cfa90b4aefaf39',
	     credential_title: "lobster"
	 }
	
	 const tx = db.transaction('Credentials', 'readwrite');
	 const credsDB = tx.objectStore('Credentials');
	 credsDB.add(cred)
	
	 transaction.oncomplete = function(event) {
	        //...
	    };
	
	    transaction.onerror = function(event) {
	      //...
	    };
	
	 console.log('objectStore ln 179: ', credDB);
	
	 for(credentials_id of credentials_ids){ 
	     const request = CredentialsDB.add(credentials_id) 
	     request.onsuccess = () => { 
	         console.log('New credential added', request.result) 
	     };
	
	     request.onerror = (err) => {
	         console.error(`Error to add new student: ${err}`)
	     };
	}
}