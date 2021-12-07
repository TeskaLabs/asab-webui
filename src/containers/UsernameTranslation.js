import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { Row } from 'reactstrap';

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

	const retrieveUserNames = async () => {
		try {
			let response = await API.put(`usernames`, id);
			if (response.data.result !== "OK") {
				throw new Error(t("TenantDetailContainer|Something went wrong, failed to fetch assigned credentials"));
			} 
			setUsernames(response.data.data);
		} catch (e) {
			console.error(e);
			props.app.addAlert("warning", t("TenantDetailContainer|Something went wrong, failed to fetch assigned credentials"));
		}
	}

	useEffect(() => {
		retrieveUserNames();
	}, [])

    return (
			<>
				{usernames && usernames.length != 0 ?
					Object.keys(usernames).map((key) => {
						return (
							<Row>
								<Link className='ml-3' to={{ pathname: `/auth/credentials/${key}`}}>
									{usernames[key]}
								</Link>
							</Row>
						)
					}) :
						id.map((elem) => {
							return (
								<Row>
									<Link className='ml-3' to={{ pathname: `/auth/credentials/${elem}`}}>
										{elem}
									</Link>
								</Row>
							)
						})
            	}
			</>
    )
}
