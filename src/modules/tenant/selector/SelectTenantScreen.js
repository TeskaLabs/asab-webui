import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
	Card, CardHeader, CardFooter, CardBody, CardTitle, CardSubtitle,
	Button, Input
} from 'reactstrap';

import "./select.css";

function TenantSelectionScreen(props) {
	const { t } = useTranslation();
	const SeaCatAuthAPI = props.app.axiosCreate('seacat_auth');
	let resources = props.userinfo?.resources;
	let superuser = resources ? resources.indexOf('authz:superuser') !== -1 : false;

	const selectTenant = (tn) => {
		if (tn.value !== "99999") {
			window.location.replace(`?tenant=${tn.value}#/`);
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
			props.app.addAlert("danger", t("SelectTenantScreen|Silly as it sounds, the logout failed"));
		}
		window.location.reload();
	}

	return (
		props.app.Services.TenantService &&
		props.app.Modules.filter(obj => obj.Name === "AuthModule").length > 0 &&
		props.tenants && props.invalid && superuser === false ?
			<Card className="tenant-selection-card">
				<CardHeader>
					<CardTitle>
						{t("SelectTenantScreen|Select valid tenant to enter the application")}
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
						<option key="def" value="99999">{t("SelectTenantScreen|Select tenant")}</option>
						{props.tenants.length > 0 ? props.tenants.map((tenant, idx) => {return(
							<option key={idx}>{tenant}</option>
						)}) : null}
					</Input>
				</CardBody>
				<CardFooter>
					<Button color="primary" onClick={() => {logout()}}>
						{t("SelectTenantScreen|Logout")}
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
		current: state.tenant?.current,
		invalid: state.tenant?.invalid
	}
}

export default connect(mapStateToProps)(TenantSelectionScreen);
