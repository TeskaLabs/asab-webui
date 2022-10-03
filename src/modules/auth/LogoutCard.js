import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

function LogoutCard(props) {
	const { t } = useTranslation();
	let superuser = props.resources ? props.resources.indexOf('authz:superuser') !== -1 : false;

	const logout = () => {
		let AuthModule = props.app.Modules.filter(obj => obj.Name === "AuthModule");
		if ((AuthModule != undefined) && (AuthModule.length > 0)) {
			AuthModule[0].logout();
		} else {
			props.app.addAlert("danger", t("LogoutCard|Silly as it sounds, redirection back to login failed"));
		}
	}

	return (
		(props.app.Modules.filter(obj => obj.Name === "AuthModule").length > 0) &&
		(superuser === false) ?
			<div className="logout-wrapper">
				{console.log(superuser, "superuser")}
				{console.log(props.tenants, "props.tenants")}
				<div className="card logout-card">
					<div className="logout-card-header">
						<div className="logout-card-header-title">
							{t("LogoutCard|User not authorized")}
						</div>
					</div>
					<div className="logout-card-footer">
						<button className="logout-btn logout-btn-primary" color="primary" onClick={() => {logout()}}>
							{t("LogoutCard|Back to login")}
						</button>
					</div>
				</div>
			</div>
			: null
	);
}

function mapStateToProps(state) {
	return {
		resources: state.auth?.resources,
		tenants: state.tenant?.tenants,
		current: state.tenant?.current
	}
}

export default connect(mapStateToProps)(LogoutCard);
