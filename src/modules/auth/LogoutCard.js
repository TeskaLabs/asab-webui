import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function LogoutCard(props) {
	const { t } = useTranslation();
	const tenants = useSelector(state => state.tenant?.tenants);
	const resources = useSelector(state => state.auth?.resources);
	let superuser = resources ? resources.indexOf('authz:superuser') !== -1 : false;

	let AuthModule = props.app.Modules.filter(obj => obj.Name === "AuthModule");

	const logout = () => {
		if ((AuthModule != undefined) && (AuthModule.length > 0)) {
			AuthModule[0].logout();
		} else {
			props.app.addAlert("danger", t("LogoutCard|Silly as it sounds, redirection back to login failed"));
		}
	}

	return (
		props.app.Services.TenantService && ((AuthModule != undefined) && (AuthModule.length > 0)) && (tenants === undefined) &&
		(superuser === false) ?
			<div className="logout-wrapper">
				<div className="card logout-card">
					<div className="logout-card-header">
						<div className="logout-card-header-title">
							{t("LogoutCard|User not authorized")}
						</div>
					</div>
					<div className="logout-card-footer">
						<button className="logout-btn logout-btn-primary btn-block" color="primary" onClick={() => {logout()}}>
							{t("LogoutCard|Back to login")}
						</button>
					</div>
				</div>
			</div>
			: null
	);
}

export default LogoutCard;
