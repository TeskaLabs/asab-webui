import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
	Card, CardHeader, CardFooter, CardBody, CardTitle, CardSubtitle,
	Button, Input
} from 'reactstrap';

import "./select.css";

function TenantSelectionCard(props) {
	const { t } = useTranslation();
	const SeaCatAuthAPI = props.app.axiosCreate('seacat_auth');
	let resources = props.userinfo?.resources;
	let superuser = resources ? resources.indexOf('authz:superuser') !== -1 : false;

	const selectTenant = (tn) => {
		if (tn.value !== "99999") {
			window.location.replace(`${window.location.pathname}?tenant=${tn.value}${window.location.hash}`);
			return;
		}
	}

	const logout = async () => {
		let response;
		try {
			response = await SeaCatAuthAPI.put('/public/logout');
		}
		catch (err) {
			console.error("Failed to fetch userinfo", err);
			props.app.addAlert("danger", t("TenantSelectionCard|Silly as it sounds, the logout failed"));
		}
		window.location.reload();
	}

	return (
		props.app.Services.TenantService &&
		props.app.Modules.filter(obj => obj.Name === "AuthModule").length > 0 &&
		props.tenants && props.current === undefined && superuser === false ?
			<Card className="tenant-selection-card">
				<CardHeader>
					<CardTitle>
						{t("TenantSelectionCard|Select valid tenant to enter the application")}
					</CardTitle>
				</CardHeader>
				<CardBody>
					<Input
						type="select"
						name="selectTenant"
						id="selectTenant"
						onClick={(e) => {selectTenant(e.target)}}
						defaultValue={props.current}
					>
						<option key="def" value="99999">{t("TenantSelectionCard|Select tenant")}</option>
						{props.tenants.length > 0 ? props.tenants.map((tenant, idx) => {return(
							<option key={idx}>{tenant}</option>
						)}) : null}
					</Input>
				</CardBody>
				<CardFooter>
					<Button color="primary" onClick={() => {logout()}}>
						{t("TenantSelectionCard|Logout")}
					</Button>
				</CardFooter>
			</Card>
		: null
	);
}

function mapStateToProps(state) {
	return {
		userinfo: state.auth?.userinfo,
		tenants: state.tenant?.tenants,
		current: state.tenant?.current
	}
}

export default connect(mapStateToProps)(TenantSelectionCard);
