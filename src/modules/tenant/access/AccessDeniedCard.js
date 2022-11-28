import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { locationReplace } from 'asab-webui';
import { connect } from 'react-redux';

import {
	Card, CardHeader, CardBody, CardTitle,
	Button, Input, Label
} from 'reactstrap';

import "./access.scss";

function AccessDeniedCard(props) {
	const { t } = useTranslation();
	const [ accessDenied, setAccessDenied ] = useState(false);
	const [ deniedTenant, setDeniedTenant ] = useState("");

	useEffect(() => {
		var qs = new URLSearchParams(window.location.search);
		const errorType = qs.get('error');
		if ((errorType != undefined) && errorType.includes("access_denied")) {
			const tenantParameter = qs.get('tenant');
			setAccessDenied(true);
			setDeniedTenant(tenantParameter);
		}
	}, [])

	/*
		We can't use logout/redirection to login via /openidconnect/logout,
		since we dont have a oauth token here (access denied)
	*/
	const continueToLogin = async () => {
		const SeaCatAuthAPI = props.app.axiosCreate('seacat_auth');
		let response;
		try {
			// Use public logout
			response = await SeaCatAuthAPI.put('/public/logout');
		} catch (err) {
			console.error(err);
			props.app.addAlert("danger", t("AccessDeniedCard|Silly as it sounds, the logout failed"));
		}
		await locationReplace(`${window.location.pathname}`);
	}

	return (
		props.app.Services.TenantService &&
		props.app.Modules.filter(obj => obj.Name === "AuthModule").length > 0 &&
		(accessDenied == true) ?
			<div className="access-denied-wrapper">
				<Card className="access-denied-card">
					<CardHeader className="border-bottom">
						<div className="card-header-title">
							<CardTitle className="text-primary mb-0" tag="h2">
								{t("AccessDeniedCard|Access denied")}
							</CardTitle>
						</div>
					</CardHeader>
					<CardBody>
						<p>
							{t("AccessDeniedCard|In case of difficulties, please contact application administrator for assigning appropriate access rights.")}
						</p>
						<p className="text-center tenant-text">
							<span>Tenant: </span>{deniedTenant}
						</p>
						<Button
							className="justify-content-center"
							block
							color="primary"
							onClick={() => {continueToLogin()}}
						>
							{t("AccessDeniedCard|Leave")}
						</Button>
					</CardBody>
				</Card>
			</div>
		: null
	);
}

export default AccessDeniedCard;
