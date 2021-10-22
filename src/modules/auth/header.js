import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';

/*

	Language localizations for auth HeaderComponent can be added to the translation.json files of
	public/locales/en & public/locales/cs of the product where HeaderComponent is used.

	Example:

	{
		"AuthHeaderDropdown": {
			"My account": "My account",
			"Access control": "Access control",
			"Manage": "Manage",
			"Change a password": "Change a password",
			"Logout": "Logout"
		}
	}

*/

function HeaderComponent(props) {

	const App = props.app;
	const { t, i18n } = useTranslation();

	// Get URL of SeaCat Auth WebUI
	// SeaCat Auth WebUI is usually build on /auth subpath
	let user_auth_url = `${window.location.protocol}//${window.location.host}/auth`;
	// If SeaCat Auth WebUI URL is defined in SERVICES, use it
	if (App.Config.get('SERVICES')?.seacat_auth_webui) {
		user_auth_url = App.getServiceURL('seacat_auth_webui');
	}

	const logout = () => {
		props.AuthModule.logout()
	}

	return (
		<UncontrolledDropdown direction="down" className="pr-3">
			<DropdownToggle nav title={props.sub} caret>
				{(props.picture)
					? <img src={props.picture} className="img-avatar" alt={props.username}/>
					: <i alt={props.username} className="cil-user"></i>
				}
				<span className="pl-2" title={props.sub}>{props.username}</span>
			</DropdownToggle>
			<DropdownMenu>
				<DropdownItem header>{t('AuthHeaderDropdown|My account')}</DropdownItem>
				<DropdownItem tag={Link} to="/auth/access-control">
					{t('AuthHeaderDropdown|Access control')}
				</DropdownItem>
				{user_auth_url != null &&
					<React.Fragment>
						<DropdownItem tag="a" href={user_auth_url}>
							{t('AuthHeaderDropdown|Manage')}
						</DropdownItem>
						<DropdownItem tag="a" href={user_auth_url + '/#/change-password'}>
							{t('AuthHeaderDropdown|Change a password')}
						</DropdownItem>
					</React.Fragment>
				}
				<DropdownItem onClick={() => {logout()}}>
					<span className="text-danger">
						{t('AuthHeaderDropdown|Logout')}
					</span>
				</DropdownItem>
			</DropdownMenu>
		</UncontrolledDropdown>
	)
}

const mapStateToProps = state => {
	var username = "-";
	var sub = "-";
	var picture = null;

	const userinfo = state.auth.userinfo;
	if (userinfo != null) {

		if (userinfo.sub) {
			sub = userinfo.sub;
		} else {
			sub = userinfo.id;	
		}

		if (userinfo.name) {
			username = userinfo.name;
		}
		else if (userinfo.preferred_username) {
			username = userinfo.preferred_username;	
		}
		else {
			username = userinfo.id;	
		}

		if (userinfo.picture) {
			picture = userinfo.picture;
		}

	}
	return {
		sub: sub,
		username: username,
		picture: picture
	};
};

export default connect(
	mapStateToProps,
	null
)(HeaderComponent);
